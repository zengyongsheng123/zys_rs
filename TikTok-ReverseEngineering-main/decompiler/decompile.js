const info = require('../decryptBytecode.js')
const fs = require('fs')
const {
    strings,
    instructionSets
} = info();
const VMs = new Map();


function initVM(instructionSetPosition, additionalData) {
    var instructionSet = instructionSets[instructionSetPosition];
    var vm = function() {
        return executeVM(instructionSet, this, arguments, additionalData);
    };
    VMs.set(vm, [instructionSet, additionalData]);
    return vm;
}
function executeVM(instructionSet, context, args, additionalData, VMindex) {
    function setupContext(instructionSet, thisContext, args, additionalData) {
        var maxArgs = Math.min(args.length, instructionSet[1])
        var localScope = {}

        Object.defineProperty(localScope, "length", {
            value: args.length,
            writable: true,
            enumerable: false,
            configurable: true
        })

        instructions = instructionSet[0]
        strictMode = instructionSet[2]
        exceptionHandlers = instructionSet[3]
        executionStack = [additionalData, localScope];

        for (var i = 0; i < maxArgs; ++i)
            executionStack.push(args[i]);

        if (strictMode) {
            for (thisContextRef = thisContext, i = 0; i < args.length; ++i)
                localScope[i] = args[i];
        } else {
            thisContextRef = null == thisContext ? globalThis : Object(thisContext);
            var defineProperty = function(index) {
                if (index < maxArgs) {
                    Object.defineProperty(localScope, index, {
                        get: function() {
                            // additionalData, localScope, args...
                            return executionStack[index + 2];
                        },
                        set: function(t) {
                            executionStack[index + 2] = t;
                        },
                        enumerable: true,
                        configurable: true
                    })
                } else {
                    localScope[index] = args[index];
                }
            };
            for (let i = 0; i < args.length; ++i) defineProperty(i);
        }
        index = 0
        executionState = 0
        returnValue = undefined;
    }

    function createGlobalObject(varName, isStrict) {
        var obj = Object.create(null)
        Object.defineProperty(obj, varName, {
            get: function() {
                if (varName in globalThis) return globalThis[varName];
                throw new ReferenceError(varName + " is not defined");
            },
            set: function(r) {
                if (isStrict && !(varName in globalThis)) throw new ReferenceError(varName + " is not defined");
                globalThis[varName] = r;
            }
        })
        return obj;
    }

    // executionState = 0 = running
    function handleControlFlow() {
        var programCounter = index
        var handlerList = exceptionHandlers;
        if (executionState === 1) { // function returned with no value
            for (var i = handlerList.length - 1; i >= 0; --i) {
                let handler = handlerList[i]
                if (handler[0] < programCounter && programCounter <= handler[3]) {
                    if (programCounter <= handler[2] && handler[2] !== handler[3]) {
                        index = handler[2]
                    } else {
                        index = returnValue
                        executionState = 0
                        returnValue = undefined
                    }
                    return true;
                }
            }
            throw new SyntaxError("Illegal statement");
        }
        if (executionState === 2) { // function returned with value
            for (let i = handlerList.length - 1; i >= 0; --i) {
                const handler = handlerList[i];
                if (handler[0] < programCounter && programCounter <= handler[2] && handler[2] !== handler[3]) {
                    index = handler[2]
                    return true;
                }
            }
            const previousFrame = callStack.pop();
            if (!previousFrame) return false; // no more frames, function finished
            // get the previous frame back
            stack[++pointer] = returnValue;
            [
                instructions,
                strictMode,
                exceptionHandlers,
                executionStack,
                thisContextRef,
                index,
                executionState,
                returnValue
            ] = previousFrame;

            return true;
        }
        if (executionState === 3) { // exception occured
            for (i = handlerList.length - 1; i >= 0; --i) {
                const handler = handlerList[i];
                if (handler[0] < programCounter) {
                    if (programCounter <= handler[1] && handler[1] !== handler[2]) return index = handler[1], stack[++pointer] = returnValue, executionState = 0, returnValue = undefined, true;
                    if (programCounter <= handler[2] && handler[2] !== handler[3]) return index = handler[2], true;
                }
            }
            const previousFrame = callStack.pop();
            if (previousFrame) {
                [
                    instructions,
                    strictMode,
                    exceptionHandlers,
                    executionStack,
                    thisContextRef,
                    index
                ] = previousFrame
                return handleControlFlow();
            }
            throw returnValue;
        }
        return true;
    }
    var callStack, stack, pointer, returnValue, executionState, index, thisContextRef, executionStack, exceptionHandlers, strictMode, instructions;
    pointer = -1
    stack = []
    callStack = []

    let code = [`function VM${VMindex}(${Array(instructionSet[1]).fill(0).map((v, i) => `arg${i}`).join(', ')}) {`]
    let biggestPointer = 0;
    function addCode(c, byteCodePos = "NO BYTECODE POS ADDED", comment) {
        code.push(` ${c}`.padEnd(35) + `//BYTECODE_POS: ${byteCodePos} ${comment ? comment : ''}`)
    }
    addCode(`var executionStack = [];`, "GENEREATED")
    const instru = new Set();
    setupContext(instructionSet, context, args, additionalData);

	processBytecode()
  code.splice(1, 0, ` var ${Array(biggestPointer).fill(1).map((_,i) => `v${i}`)}; // BYTECODE_POS: GENERATED`)
	/*
    do {
        try {
            processBytecode();
        } catch (e) {
            console.log(code)
            executionState = 3
            returnValue = e;
        }
    } while (handleControlFlow());
	*/
    code.push("}")
    //console.log(code.join('\n'))
    fs.writeFileSync(`functions/VM${VMindex}.js`, code.join('\n'))

    return returnValue;

    function processBytecode() {
        for (;;) {
            var opCode = instructions[index++];
            instru.add(opCode);
            //console.log(opCode)
            biggestPointer = Math.max(biggestPointer, pointer);
            var byteCodePos = index;
            switch (opCode) {
                case 0:
                    if (0 !== executionState) return;
                    break;
                case 1:
                    var n = instructions[index++]
                    /*
              var o = stack[pointer--];
              Object.defineProperty(stack[pointer], strings[n], {
                  value: o,
                  writable: true,
                  configurable: true,
                  enumerable: true
              });
			  */
                    pointer--
                    addCode(`v${pointer}.${strings[n]} = v${[pointer + 1]};`, byteCodePos)
                    break;
                case 2:
                    var a = instructions[index++];
                    //stack[pointer] ? --pointer : index += a;

                    addCode(`// if (!v${pointer}) skip ${a} to ${index + a}`, byteCodePos)
                    break;
                case 3:
                    instructions[index++];
                    var b = strings[n];
                    /*
              o = createGlobalObject(b, strictMode)
              stack[++pointer] = o
              stack[++pointer] = b;
			  */
                    pointer++
					pointer++
                    addCode(`v${pointer - 1} = globalThis;`, byteCodePos);
                    addCode(`v${pointer} = ${b}`, byteCodePos)
                    break;
                case 4:
                    //var S = stack[pointer--];
                    //stack[pointer] = stack[pointer] <= S;
                    pointer--;
                    addCode(`v${pointer} = v${pointer} <= v${pointer - 1};`, byteCodePos)
                    break;
                case 5:
                    //var D = stack[pointer--];
                    //o = (k = stack[pointer--])[D]--
                    //stack[++pointer] = o;
                    pointer--
                    pointer--
                    pointer++
                    addCode(`v${pointer}[v${pointer + 1}]--`, byteCodePos)
                    break;
                case 6:
                    //stack[++pointer] = instructions[index++];
                    index++
                    pointer++
                    addCode(`v${pointer} = ${instructions[index - 1]};`, byteCodePos)
                    break;
                case 7:
                    n = instructions[index++]
                    //o = stack[pointer--],
                    //(k = stack[pointer--])[strings[n]] = o;
                    pointer--
                    pointer--
                    addCode(`v${pointer + 1}.${strings[n]} = v${pointer + 1};`, byteCodePos);
                    break;
                case 8:
                    var R = instructions[index++];
                    // stack[pointer = pointer - R + 1] = stack.slice(pointer, pointer + R);
                    pointer = pointer - R + 1
                    addCode(`v${pointer} = [${Array(R).fill(pointer).map((v,i) => "v" + (v + i))}]`, byteCodePos)
                    break;
                case 9:
                    //S = stack[pointer--]
                    //stack[pointer] = stack[pointer] & S
                    pointer--
                    addCode(`v${pointer} &= v${pointer + 1};`, byteCodePos)
                    break;
                case 10:
                    n = instructions[index++]
                    var c = isNaN(parseInt(strings[n])) ? '.' + strings[n] : '[' + strings[n] + ']';
                    //stack[pointer] = stack[pointer][strings[n]];
                    addCode(`v${pointer} = v${pointer}${c};`, byteCodePos)
                    break;
                case 11:
                    n = instructions[index++];
                    /*
              var E = stack[pointer--];
              Object.defineProperty(stack[pointer], strings[n], {
                  get: E,
                  enumerable: true,
                  configurable: true
              });
			  */
                    pointer--
                    addCode(`v${pointer}.${strings[n]} = v${pointer + 1}`, byteCodePos)
                    break;
                case 12:
                    //stack[pointer] = +stack[pointer]
                    addCode(`v${pointer} = +v${pointer}`, byteCodePos)
                    break;
                case 13:
                    a = instructions[index++]
                    // if stack[pointer--] false try right hand
                    // if true move on
                    //stack[pointer--] || (index += a);
                    pointer--
                    addCode(`// if (!v${pointer + 1}) skip to ${index + a}`, byteCodePos)
                    break;
                case 14:
                    n = instructions[index++];
                    /*
                    var k = stack[pointer--],
                    A = [];
                    for (var x in k) A.push(x);
                    executionStack[n] = [A, k];
			              */
                    addCode(`// opcode 14`, byteCodePos)
                    pointer--
                    break;
                case 15:
                    //k = stack[pointer--]
                    //stack[pointer] = stack[pointer] instanceof k;
                    pointer--
                    addCode(`v${pointer} = v${pointer} instanceof v${pointer + 1};`, byteCodePos)
                    break;
                case 16:
                    //S = stack[pointer--]
                    //stack[pointer] = stack[pointer] != S
                    pointer--
                    addCode(`v${pointer} = v${pointer} != v${pointer + 1};`, byteCodePos)
                    break;
                case 17:
                    //stack[++pointer] = false;
                    pointer++;
                    addCode(`v${pointer} = false;`, byteCodePos)
                    break;
                case 18:
                    //stack[++pointer] = {};
                    pointer++
                    addCode(`v${pointer} = {};`, byteCodePos)
                    break;
                case 19:
                    //stack[++pointer] = Infinity;
                    pointer++
                    addCode(`v${pointer} = Infinity;`, byteCodePos)
                    break;
                case 20:
                    n = instructions[index++];
                    var P = strings[n];
                    //P in globalThis || (globalThis[P] = undefined);
                    addCode(`if (${P} in globalThis) globalThis[${P}] = undefined;`, byteCodePos);
                    break;
                case 21:
                    //stack[pointer] = undefined;
                    addCode(`v${pointer} = undefined;`, byteCodePos)
                    break;
                case 22:
                    //stack[pointer] = ~stack[pointer]
                    addCode(`v${pointer} = ~v${pointer};`, byteCodePos)
                    break;
                case 23:
                    a = instructions[index++]
                    //executionState = 1;
                    //returnValue = index + a
                    addCode(`//return ${index + a};`, byteCodePos)
                    //return undefined;
                    break;
                case 24:
                    //S = stack[pointer--]
                    //stack[pointer] = stack[pointer] !== S;
                    pointer--;
                    addCode(`v${pointer} = v${pointer} !== v${pointer + 1};`, byteCodePos)
                    break;
                case 25:
                    //S = stack[pointer--]
                    //stack[pointer] = stack[pointer] ^ S;
                    pointer--
                    addCode(`v${pointer} ^= v${pointer + 1};`, byteCodePos)
                    break;
                case 26:
                    //executionState = 2;
                    //returnValue = stack[pointer--]
                    pointer--
                    addCode(`//return v${pointer + 1};`, byteCodePos)
                    
                    //return undefined;
                    if (index === instructions.length) return undefined;
                    else break;
                case 27:
                    //stack[pointer] = typeof stack[pointer]
                    addCode(`v${pointer} = typeof v${pointer};`, byteCodePos)
                    break;
                case 28:
                    a = instructions[index++]
                    if (a > 0)
                        addCode(`// go foward to ${index + a}`, byteCodePos)
                    else if (a < 0)
                        addCode(`// go back to ${index + a}`, byteCodePos)
                    else 
                        addCode(`// dont't move??`, byteCodePos)
                    
                    //index += a
                    break;
                case 29:
                    //var w = stack[pointer--];
                    //o = --(k = stack[pointer--])[w]
                    //stack[++pointer] = o;
                    pointer--
                    pointer--
                    pointer++
                    addCode(`--(v${pointer}[v${pointer - 1}]);`, byteCodePos)
                    break;
                case 30:
                    //stack[++pointer] = thisContextRef;
                    pointer++
                    addCode(`v${pointer} = thisContextRef;`, byteCodePos)
                    break;
                case 31:
                    //S = stack[pointer--]
                    //stack[pointer] = stack[pointer] | S
                    pointer--
                    addCode(`v${pointer} |= v${pointer + 1};`, byteCodePos)
                    break;
                case 32:
                    //var I = stack[pointer--];
                    //o = delete(k = stack[pointer--])[I]
                   // stack[++pointer] = o;
				          pointer--
				          pointer--
				          pointer++
                    addCode(`delete (v${pointer}[v${pointer - 1}]);`, byteCodePos)
                    break;
                case 33:
                    //S = stack[pointer--]
                   // stack[pointer] = stack[pointer] >>> S
				            pointer--;
                    addCode(`v${pointer} >>>= v${pointer + 1};`, byteCodePos)
                    break;
                case 34:
                    //var T = stack[pointer--];
                    //(k = stack[pointer--])[T] = stack[pointer];
					          pointer--
					          pointer--
                    addCode(`v${pointer  + 1}[v${pointer + 2}] = v${pointer}`, byteCodePos);
                    break;
                case 35:
                    //var O = stack[pointer--];
                    //o = ++(k = stack[pointer--])[O]
                    //stack[++pointer] = o;
					          pointer--
					          pointer--
					          pointer++
                    addCode(`++(v${pointer}[v${pointer - 1}]);`, byteCodePos)
                    break;
                case 36:
                    //executionState = 3;
                    //returnValue = stack[pointer--];
					          pointer--;
                    addCode(`//return v${pointer + 1}`, byteCodePos)
                    //return undefined;
                    break;
                case 37:
                    //k = stack[pointer--]
                    //stack[pointer] = stack[pointer] in k;
					          pointer--;
                    addCode(`v${pointer} = v${pointer} in v${pointer + 1}`, byteCodePos)
                    break;
                case 38:
                   // o = stack[pointer--];
                   // var H = stack[pointer--];
                    //(k = stack[pointer--])[H] = o;
					        pointer--;
					        pointer--;
					        pointer--;
                    addCode(`v${pointer + 1}[v${pointer + 2}] = v${pointer + 3};`, byteCodePos)
                    break;
                case 39:
                    //o = stack[pointer];
                    //stack[++pointer] = o;
					          pointer++;
                    addCode(`v${pointer} = v${pointer - 1}`, byteCodePos)
                    break;
                case 40:
                    var L = instructions[index++];
                    var n = instructions[index++];
					/*
                    var a = executionStack;
                    while (L > 0) {
                        a = a[0]
                            --L;
                    }
                    stack[++pointer] = a;
                    stack[++pointer] = n;
					*/
					pointer++
					pointer++
					addCode(`//get depth of ${L} from executionStack`, byteCodePos);
                    addCode(`v${pointer - 1} = executionStack;`, byteCodePos);
                    addCode(`v${pointer} = ${n}`);
                    break;
                case 41: {
                    var argsLen = instructions[index++];
                    pointer -= argsLen;
                    

                    let argStringParameter =
                        Array(argsLen)
                          .fill(0)
                          .map((v, i) => `v${(pointer + 1) + i}`)
                          .join(',')

                    pointer--;
                    pointer--;
					          pointer++;
                    
					        addCode(`v${pointer} = v${pointer + 1}(${argStringParameter});`, byteCodePos, `// context ${pointer} could be custom vm or native func`);
                    /*
                                  //let args = stack.slice(pointer + 1, pointer + argsLen + 1)
              var func = stack[pointer--]
              var context = stack[pointer--];
              if ("function" != typeof func) {
                  executionState = 3
                  returnValue = new TypeError(typeof func + " is not a function")
                  return undefined;
              }
              var VM = VMs.get(func);
              if (VM) {
                  // call new instruction set
                  // save existing instruction set to continue later
                  callStack.push([instructions, strictMode, exceptionHandlers, executionStack, thisContextRef, index, executionState, returnValue])
                  // start new instruction set
                  addCode(`// new instruction set called inSetPos: ${VM[2]}`,byteCodePos);
                  setupContext(VM[0], context, args, VM[1])
              } else {
                  // call normal function
                  var N = func.apply(context, args);
                  stack[++pointer] = N;
                  addCode(`v${pointer} = v${pointer + 1}(${argStringParameter})`, byteCodePos)
              }
				  */
                    break;
                }
                case 42:
                    //stack[++pointer] = true;
                    pointer++
                    addCode(`v${pointer} = true`, byteCodePos)
                    break;

                case 43:
                    //stack[pointer] = -stack[pointer];
                    addCode(`v${pointer} = -v${pointer}`, byteCodePos)
                    break;

                case 44:
                    //a = instructions[index++];
                    // if (stack[pointer--]) index += a;
                    index++
                    pointer--
                    addCode(`// if (v${pointer + 1}) skip to ${index + a}`, byteCodePos)
                    break;

                case 45:
                    //stack[++pointer] = undefined;
                    pointer++
                    addCode(`v${pointer} = undefined`, byteCodePos)
                    break;

                case 46:
                    /*
              a = instructions[index++];
              o = stack[pointer--];
			  
              if (stack[pointer] === o) {
                  --pointer;
                  index += a;
              }
			 */
                    index++
                    pointer--
                    
                    addCode(`if (v${pointer} === v${pointer + 1}) index += ${a}`, byteCodePos)
                    break;

                case 47:
                    n = instructions[index++];
                    /*
              var W = strings[n];
              o = typeof globalThis[W];
              stack[++pointer] = o;
			  */
                    pointer++
                    addCode(`v${pointer} = typeof globalThis.${strings[n]}`, byteCodePos)
                    break;

                case 48:
                    //S = stack[pointer--];
                    //stack[pointer] = stack[pointer] << S;
                    pointer--
                    addCode(`v${pointer} <<= v${pointer + 1}`, byteCodePos)
                    break;

                case 49:
                    --pointer;
                    break;

                case 50:
                    //S = stack[pointer--];
                    //stack[pointer] = stack[pointer] < S;
                    pointer--
                    addCode(`v${pointer} = v${pointer} < v${pointer + 1};`, byteCodePos)
                    break;

                case 51:
                    //o = stack[pointer--];
                    //stack[pointer] *= o;
                    pointer--
                    addCode(`v${pointer} *= v${pointer + 1}`, byteCodePos)
                    break;

                case 52:
                    n = instructions[index++];
                    /*
              var K = stack[pointer--];
              Object.defineProperty(stack[pointer], strings[n], {
                  set: K,
                  enumerable: true,
                  configurable: true
              });
			  */
                    pointer--;
                    addCode(`v${pointer}.${strings[n]} = v${pointer + 1}`, byteCodePos)
                    break;

                case 53:
                    //o = stack[pointer--];
                    //stack[pointer] /= o;
                    pointer--;
                    addCode(`v${pointer} /= v${pointer + 1}`, byteCodePos)
                    break;

                case 54:
                    var n = instructions[index++];
                    //var z = stack[pointer--]
                    //var X = stack[pointer--];
                    /*
              var A = executionStack[n];
              var x = undefined;
              do {
                  x = A[0].shift();
              } while (x !== undefined && !(x in A[1]));
              stack[++pointer] = x !== undefined ? (X[z] = x, true) : false;
			  */
			 pointer--;
			 pointer--;
                    pointer++
                    addCode(`//case 54`, byteCodePos)
                    break;

                case 55:
                    //var V = stack[pointer--];
                    //stack[pointer] = stack[pointer][V];
                    pointer--
                    addCode(`v${pointer} = v${pointer}[v${pointer + 1}]`, byteCodePos)
                    break;

                    // cal func with 'new'
                case 56:
                    argsLen = instructions[index++];

                    /*
              var argsArr = [undefined];
              while (argsLen > 0) argsArr[argsLen--] = stack[pointer--];

              var Y = stack[pointer--];
              N = new(Function.bind.apply(Y, argsArr))();
              stack[++pointer] = N;
			  */
                    while (argsLen > 0) {
                        argsLen--;
                        pointer--;
                    }

                    let argStringParameter =
                        Array(argsLen).fill(pointer + 1).map((v, i) => `v${v + i}`).join(',')

                    pointer--
                    pointer++
                    addCode(`v${pointer} = new v${pointer}(${argStringParameter})`, byteCodePos)
                    break;
                case 57:
                    //stack[++pointer] = null;
                    pointer++
                    addCode(`v${pointer} = null`, byteCodePos)
                    break;

                case 58:
                    //o = stack[pointer--];
                    //stack[pointer] %= o;
                    pointer--
                    addCode(`v${pointer} %= v${pointer + 1}`, byteCodePos)
                    break;

                case 59:
                    L = instructions[index++]
                    n = instructions[index++]
                    /*
              a = executionStack
              while (L > 0) {
                  a = a[0] 
                  --L;
              }
              a[n] = stack[pointer--];
			  */
                    pointer--
                    addCode(`executionStack[${n}] = v${pointer + 1};`, byteCodePos, `// depth = ${L}`)
                    break;

                case 60:
                    //S = stack[pointer--];
                    //stack[pointer] = stack[pointer] >= S;
                    pointer--
                    addCode(`v${pointer} = v${pointer} >= v${pointer + 1}`, byteCodePos)
                    break;

                case 61:
                    //S = stack[pointer--];
                    //stack[pointer] = stack[pointer] === S;
                    pointer--;
                    addCode(`v${pointer} = v${pointer} === v${pointer + 1}`, byteCodePos)
                    break;

                case 62:
                    //stack[++pointer] = NaN
                    pointer++
                    addCode(`v${pointer} = NaN`, byteCodePos)
                    break;

                case 63:
                    a = instructions[index++];
                    //if (stack[pointer]) index += a;
                    //else --pointer;

                    addCode(`// if (v${pointer}) skip ${a}`, byteCodePos)
                    break;

                case 64:
                    //stack[pointer] = !stack[pointer];
					          addCode(`v${pointer} = !v${pointer}`, byteCodePos)
                    break;

                case 65:
                    //var G = stack[pointer--];
                    //o = (k = stack[pointer--])[G]++;
                    //stack[++pointer] = o;
                    pointer--
                    pointer--
                    pointer++
                    addCode(`v${pointer} = v${pointer}[v${pointer + 1}]++`, byteCodePos, `// replace the executionStack var with an index incremented`)
                    break;

                    // load executionStack[n] onto stack
                    // if n is 1 index then its the whole arg object
                    // if n is 2 index to args.length - 1 then its a specific arg
                case 66:
                    
              var depth = instructions[index++];
              var n = instructions[index++]
			  /*
              var a = executionStack;

              while (depth > 0) {
                a = a[0],
                --depth;
              }
              var value = a[n];
              stack[++pointer] = value;
			  */
			  pointer++;

              if (n === 1)
                addCode(`v${pointer} = arguments;`, byteCodePos, 'depth')
              else if (n >= 2 && n < args.length + 2)
                addCode(`v${pointer} = arg${n - 2};`, byteCodePos, 'depth')
              else
                addCode(`v${pointer} = executionStack[${n}];`, byteCodePos,	'depth')
			  
				break;
                case 67:
                    n = instructions[index++];
                    /*
              var Z = strings[n];
              if (!(Z in globalThis)) {
                  executionState = 3;
                  returnValue = new ReferenceError(Z + " is not defined");
                  break;
              }
              o = globalThis[Z];
              stack[++pointer] = o;
			  */
                    pointer++;
                    addCode(`v${pointer} = ${strings[n]}`, byteCodePos, `// return 'new ReferenceError(Z + " is not defined")' if not in globalThis`)
                    break;

                case 68:
                    //o = stack[pointer--];
                    //stack[pointer] -= o;
					pointer--
                    addCode(`v${pointer} -= v${pointer + 1};`, byteCodePos)
                    break;

                case 69:
                    index++
                    //o = initVM(instructions[index++], executionStack);
                    //stack[++pointer] = o;
                    pointer++
                    addCode(`v${pointer} = functionVM${instructions[index - 1]};`, byteCodePos)
                    break;

                case 70:
                    //S = stack[pointer--];
                    //stack[pointer] = stack[pointer] > S;
                    pointer--;
                    addCode(`v${pointer} = v${pointer} > v${pointer + 1}`, byteCodePos)
                    break;

                case 71:
                    //o = stack[pointer--];
                    //stack[pointer] += o;
                    pointer--
                    addCode(`v${pointer} += v${pointer + 1}`, byteCodePos)
                    break;
                case 72:
                    n = instructions[index++];
                    //stack[++pointer] = +strings[n];
                    pointer++
                    addCode(`v${pointer} = +${strings[n]}`, byteCodePos)
                    break;

                case 73:
                    //S = stack[pointer--];
                    //stack[pointer] = stack[pointer] >> S;
                    pointer--
                    addCode(`v${pointer} >>= v${pointer + 1}`, byteCodePos)
                    break;

                case 74:
                    n = instructions[index++];
                    //o = stack[pointer--];
					pointer--
					var J = strings[n];
					/*
                    if (strictMode && !(J in globalThis)) {
                        executionState = 3;
                        returnValue = new ReferenceError(J + " is not defined");
                        break;
                    }
                    globalThis[J] = o;
					*/
					var code = `
					if (typeof globalThis.${J} !== "undefined") {
						globalThis.${J} = v${pointer + 1};
					} else {
						throw new ReferenceError("${J} is not defined");
					}`
					addCode(code, byteCodePos);
                    break;

                case 75:
                    n = instructions[index++];
                    //stack[++pointer] = strings[n];
                    pointer++
                    addCode(`v${pointer} = "${strings[n]}"`, byteCodePos)
                    break;

                case 76:
                    //S = stack[pointer--];
                    //stack[pointer] = stack[pointer] == S;
                    pointer--
                    addCode(`v${pointer} = v${pointer} == v${pointer + 1};`, byteCodePos)
                    break;
            }
        }
    }
} 
/*
send request 86

*/
//executeVM(instructionSets[0], undefined, [], {}, 0)

executeVM(instructionSets[47], undefined, [], {}, 47)

for (let i = 0; i < instructionSets.length; i++) {
  executeVM(instructionSets[i], undefined, [], {}, i)
}
/*

console.log(executeVM([
        [75, 834, 59, 0, 3, 75, 16, 59, 0, 4, 6, 0, 59, 0, 5, 66, 0, 5, 66, 0, 2, 50, 13, 58, 67, 21, 39, 10, 393, 41, 0, 67, 176, 56, 0, 12, 71, 59, 0, 6, 66, 0, 4, 66, 0, 3, 67, 21, 39, 10, 22, 66, 0, 6, 66, 0, 3, 10, 46, 51, 41, 1, 66, 0, 3, 10, 46, 58, 55, 71, 40, 0, 4, 34, 49, 40, 0, 5, 65, 49, 28, -67, 66, 0, 4, 26],
        1,
        true,
        []
    ],
    undefined,
    [1], {}))
    */