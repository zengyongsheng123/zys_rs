function VM31() {
 var v0; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = functionVM32;                //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = functionVM35;                //BYTECODE_POS: 6 
 executionStack[3] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 11 
 v1 = executionStack[2];           //BYTECODE_POS: 12 depth
 v0 = v1();                        //BYTECODE_POS: 15 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 18 
 v1 = executionStack[19];          //BYTECODE_POS: 19 depth
 v0 = v1();                        //BYTECODE_POS: 22 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 25 
 v1 = executionStack[21];          //BYTECODE_POS: 26 depth
 v0 = v1();                        //BYTECODE_POS: 29 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 32 
 v1 = executionStack[20];          //BYTECODE_POS: 33 depth
 v0 = v1();                        //BYTECODE_POS: 36 // context 0 could be custom vm or native func
 v0 = Promise                      //BYTECODE_POS: 39 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 // if (!v0) skip to 51            //BYTECODE_POS: 41 
 v0 = undefined                    //BYTECODE_POS: 43 
 v1 = executionStack[3];           //BYTECODE_POS: 44 depth
 v0 = v1();                        //BYTECODE_POS: 47 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 49 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 52 
 //return v0;                      //BYTECODE_POS: 53 
}