const info = require('./decryptBytecode.js')
const { strings, instructionSets } = info();
const VMs = new Map();
function initVM(instructionSetPosition, t) {
    var instructionSet = instructionSets[instructionSetPosition];
    var vm = function () {
      return executeVM(instructionSet, this, arguments, t);
    };
    VMs.set(vm, [instructionSet, t]);
    return vm;
  }

function executeVM(instructionSet, context, args, additionalData, instructionSetPosition) {
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
        var defineProperty = function (index) {
          if (index < maxArgs) {
              Object.defineProperty(localScope, index, {
                  get: function () {
					            // additionalData, localScope, args...
                      return executionStack[index + 2];
                  },
                  set: function (t) {
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
    function createObject(varName, isStrict) {
      var obj = Object.create(null)
      Object.defineProperty(obj, varName, {
        get: function () {
          if (varName in globalThis) return globalThis[varName];
          throw new ReferenceError(varName + " is not defined");
        },
        set: function (r) {
          if (isStrict && !(varName in globalThis)) throw new ReferenceError(varName + " is not defined");
          globalThis[varName] = r;
        }
      })
      return obj;
    }
    function handleReturn() {
      var programCounter = index
      var handlerList = exceptionHandlers;
      // function returned nothing
      if (executionState === 1) {
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
      // function returned value
      if (executionState === 2) { // frame finished
        for (let i = handlerList.length - 1; i >= 0; --i) {
          const handler = handlerList[i];
          if (handler[0] < programCounter && programCounter <= handler[2] && handler[2] !== handler[3]) {
              index = handler[2]
              return true;
          }
        }
        const previousFrame = callStack.pop();
        if (!previousFrame) return false; // no more frames, function finished

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
      // exception occured
      if (executionState === 3) { 
        for (let i = handlerList.length - 1; i >= 0; --i) {
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
          return handleReturn();
        }
        throw returnValue;
      }
      return true;
    }
    var callStack, stack, pointer, returnValue, executionState, index, thisContextRef, executionStack, exceptionHandlers, strictMode, instructions;
    pointer = -1 
    stack = [] 
    callStack = [] 
    setupContext(instructionSet, context, args, additionalData);
    do {
      try {
        processBytecode();
      } catch (e) {
        executionState = 3
        returnValue = e;
      }
    } while (handleReturn());
    return returnValue;
    function processBytecode() {
      for (;;) {
        var opCode = instructions[index++];
        switch (opCode) {
          case 0:
              if (0 !== executionState) return;
              break;
          case 1:
              var n = instructions[index++]
              var o = stack[pointer--];
              Object.defineProperty(stack[pointer], strings[n], {
                  value: o,
                  writable: true,
                  configurable: true,
                  enumerable: true
              });
              break;
          case 2:
              var a = instructions[index++];
              stack[pointer] ? --pointer : index += a;
              break;
          case 3:
              n = instructions[index++];
              var b = strings[n];
              o = createObject(b, strictMode)
              stack[++pointer] = o
              stack[++pointer] = b;
              break;
          case 4:
              var S = stack[pointer--];
              stack[pointer] = stack[pointer] <= S;
              break;
          case 5:
              var D = stack[pointer--];
              o = (k = stack[pointer--])[D]--
              stack[++pointer] = o;
              break;
          case 6:
              stack[++pointer] = instructions[index++];
              break;
          case 7:
              n = instructions[index++]
              o = stack[pointer--],
              (k = stack[pointer--])[strings[n]] = o;
              break;
          case 8:
              var R = instructions[index++];
              stack[pointer = pointer - R + 1] = stack.slice(pointer, pointer + R);
              break;
          case 9:
              S = stack[pointer--]
              stack[pointer] = stack[pointer] & S
              break;
          case 10:
              n = instructions[index++]
              stack[pointer] = stack[pointer][strings[n]];
              break;
          case 11:
              n = instructions[index++];
              var E = stack[pointer--];
              Object.defineProperty(stack[pointer], strings[n], {
                  get: E,
                  enumerable: true,
                  configurable: true
              });
              break;
          case 12:
              stack[pointer] = +stack[pointer]
              break;
          case 13:
              a = instructions[index++]
              stack[pointer--] || (index += a);
              break;
          case 14:
              n = instructions[index++];
              var k = stack[pointer--],
                  A = [];
              for (var x in k) A.push(x);
              executionStack[n] = [A, k];
              break;
          case 15:
              k = stack[pointer--]
              stack[pointer] = stack[pointer] instanceof k;
              break;
          case 16:
              S = stack[pointer--]
              stack[pointer] = stack[pointer] != S
              break;
          case 17:
              stack[++pointer] = false;
              break;
          case 18:
              stack[++pointer] = {};
              break;
          case 19:
              stack[++pointer] = Infinity;
              break;
          case 20:
              n = instructions[index++];
              var P = strings[n];
              P in globalThis || (globalThis[P] = undefined);
              break;
          case 21:
              stack[pointer] = undefined;
              break;
          case 22:
              stack[pointer] = ~stack[pointer]
              break;
          case 23:
              a = instructions[index++]
              executionState = 1;
              returnValue = index + a
              return undefined;
          case 24:
              S = stack[pointer--]
              stack[pointer] = stack[pointer] !== S;
              break;
          case 25:
              S = stack[pointer--]
              stack[pointer] = stack[pointer] ^ S;
              break;
          case 26:
              executionState = 2;
              returnValue = stack[pointer--]
              return undefined;
          case 27:
              stack[pointer] = typeof stack[pointer]
              break;
          case 28:
              a = instructions[index++]
              index += a
              break;
          case 29:
              var w = stack[pointer--];
              o = --(k = stack[pointer--])[w]
              stack[++pointer] = o;
              break;
          case 30:
              stack[++pointer] = thisContextRef;
              break;
          case 31:
              S = stack[pointer--]
              stack[pointer] = stack[pointer] | S
              break;
          case 32:
              var I = stack[pointer--];
              o = delete(k = stack[pointer--])[I]
              stack[++pointer] = o;
              break;
          case 33:
              S = stack[pointer--]
              stack[pointer] = stack[pointer] >>> S
              break;
          case 34:
              var T = stack[pointer--];
              (k = stack[pointer--])[T] = stack[pointer];
              break;
          case 35:
              var O = stack[pointer--];
              o = ++(k = stack[pointer--])[O]
              stack[++pointer] = o;
              break;
          case 36:
              executionState = 3;
              returnValue = stack[pointer--];
              return undefined;
          case 37:
              k = stack[pointer--]
              stack[pointer] = stack[pointer] in k;
              break;
          case 38:
              o = stack[pointer--];
              var H = stack[pointer--];
              (k = stack[pointer--])[H] = o;
              break;
          case 39:
              o = stack[pointer];
              stack[++pointer] = o;
              break;
          case 40:
              var L = instructions[index++];
              var n = instructions[index++];
              var a = executionStack;
                    while (L > 0) {
              a = a[0] 
              --L;
              }
              stack[++pointer] = a;
              stack[++pointer] = n;
              break;
          case 41:
              var argsLen = instructions[index++];
              pointer -= argsLen;
              var args = stack.slice(pointer + 1, pointer + argsLen + 1)
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
                  setupContext(VM[0], context, args, VM[1])
              } else {
                  // call normal function
                  var N = func.apply(context, args);
                  stack[++pointer] = N;
              }
              break;
          case 42:
              stack[++pointer] = true;
              break;

          case 43:
              stack[pointer] = -stack[pointer];
              break;

          case 44:
              a = instructions[index++];
              if (stack[pointer--]) index += a;
              break;

          case 45:
              stack[++pointer] = undefined;
              break;

          case 46:
              a = instructions[index++];
              o = stack[pointer--];
              if (stack[pointer] === o) {
                  --pointer;
                  index += a;
              }
              break;

          case 47:
              n = instructions[index++];
              var W = strings[n];
              o = typeof globalThis[W];
              stack[++pointer] = o;
              break;

          case 48:
              S = stack[pointer--];
              stack[pointer] = stack[pointer] << S;
              break;

          case 49:
              --pointer;
              break;

          case 50:
              S = stack[pointer--];
              stack[pointer] = stack[pointer] < S;
              break;

          case 51:
              o = stack[pointer--];
              stack[pointer] *= o;
              break;

          case 52:
              n = instructions[index++];
              var K = stack[pointer--];
              Object.defineProperty(stack[pointer], strings[n], {
                  set: K,
                  enumerable: true,
                  configurable: true
              });
              break;

          case 53:
              o = stack[pointer--];
              stack[pointer] /= o;
              break;

          case 54:
              var n = instructions[index++];
              var z = stack[pointer--]
              var X = stack[pointer--];
              var A = executionStack[n];
              var x = undefined;
              do {
                  x = A[0].shift();
              } while (x !== undefined && !(x in A[1]));
              stack[++pointer] = x !== undefined ? (X[z] = x, true) : false;
              break;

          case 55:
              var V = stack[pointer--];
              stack[pointer] = stack[pointer][V];
              break;
          

          // call function with new
          case 56:
              argsLen = instructions[index++];
              var argsArr = [undefined];
              while (argsLen > 0) argsArr[argsLen--] = stack[pointer--];
              var Y = stack[pointer--];
              N = new(Function.bind.apply(Y, argsArr))();
              stack[++pointer] = N;
              break;
          case 57:
              stack[++pointer] = null;
              break;

          case 58:
              o = stack[pointer--];
              stack[pointer] %= o;
              break;

          case 59:
              L = instructions[index++] 
              n = instructions[index++] 
              a = executionStack
              while (L > 0) {
                  a = a[0] 
                  --L;
              }
              a[n] = stack[pointer--];
              break;

          case 60:
              S = stack[pointer--];
              stack[pointer] = stack[pointer] >= S;
              break;

          case 61:
              S = stack[pointer--];
              stack[pointer] = stack[pointer] === S;
              break;

          case 62:
              stack[++pointer] = NaN;
              break;

          case 63:
              a = instructions[index++];
              if (stack[pointer]) index += a;
              else --pointer;
              break;

          case 64:
              stack[pointer] = !stack[pointer];
              break;

          case 65:
              var G = stack[pointer--];
              o = (k = stack[pointer--])[G]++;
              stack[++pointer] = o;
              break;

              // load arg[n] onto stack
          case 66:
              var depth = instructions[index++];
              var argIndex = instructions[index++]
              var a = executionStack;
              while (depth > 0) {
                a = a[0],
                --depth;
              }
              var arg = a[argIndex];
              stack[++pointer] = arg;
              break;
          case 67:
              n = instructions[index++];
              var Z = strings[n];
              if (!(Z in globalThis)) {
                  executionState = 3;
                  returnValue = new ReferenceError(Z + " is not defined");
                  break;
              }
              o = globalThis[Z];
              stack[++pointer] = o;
              break;

          case 68:
              o = stack[pointer--];
              stack[pointer] -= o;
              break;

          case 69:
              o = initVM(instructions[index++], executionStack);
              stack[++pointer] = o;
              break;

          case 70:
              S = stack[pointer--];
              stack[pointer] = stack[pointer] > S;
              break;

          case 71:
              o = stack[pointer--];
              stack[pointer] += o;
              break;
          case 72:
              n = instructions[index++];
              stack[++pointer] = +strings[n];
              break;

          case 73:
              S = stack[pointer--];
              stack[pointer] = stack[pointer] >> S;
              break;

          case 74:
              n = instructions[index++];
              o = stack[pointer--];
              var J = strings[n];
              if (strictMode && !(J in globalThis)) {
                  executionState = 3;
                  returnValue = new ReferenceError(J + " is not defined");
                  break;
              }
              globalThis[J] = o;
              break;

          case 75:
              n = instructions[index++];
              stack[++pointer] = strings[n];
              break;

          case 76:
              S = stack[pointer--];
              stack[pointer] = stack[pointer] == S;
              break;
      }
      }
    }
}