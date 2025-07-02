function processBytecode() {
    for (;;) {
      var opCode = instructions[index++];
      switch (opCode) {
        case 0:
            if (executionState !== 0) return;
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
            for (n = instructions[index++], a = executionStack; L > 0;) a = a[0], --L;
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
            n = instructions[index++];
            var z = stack[pointer--],
                X = stack[pointer--];
            A = executionStack[n];
            x = undefined;
            do {
                x = A[0].shift();
            } while (x !== undefined && !(x in A[1]));
            stack[++pointer] = x !== undefined ? (X[z] = x, true) : false;
            break;

        case 55:
            var V = stack[pointer--];
            stack[pointer] = stack[pointer][V];
            break;

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

        case 66:
            for (L = instructions[index++], n = instructions[index++], a = executionStack; L > 0;) a = a[0], --L;
            o = a[n];
            stack[++pointer] = o;
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