function VM55() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = 0;                           //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 6 depth
 v1 = executionStack[4];           //BYTECODE_POS: 9 depth
 v0 = v0 < v1;                     //BYTECODE_POS: 12 
 // if (!v0) skip to 61            //BYTECODE_POS: 13 
 v0 = Math                         //BYTECODE_POS: 15 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 17 
 v1 = v1.random;                   //BYTECODE_POS: 18 
 v0 = v1();                        //BYTECODE_POS: 20 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 22 // depth = 0
 v0 = executionStack[6];           //BYTECODE_POS: 25 depth
 v1 = v0                           //BYTECODE_POS: 28 
 v1 = v1.includes;                 //BYTECODE_POS: 29 
 v2 = executionStack[3];           //BYTECODE_POS: 31 depth
 v0 = v1(v2);                      //BYTECODE_POS: 34 // context 0 could be custom vm or native func
 // if (!v0) skip to 42            //BYTECODE_POS: 36 
 v0 = 2;                           //BYTECODE_POS: 38 
 executionStack[7] = v0;           //BYTECODE_POS: 40 // depth = 1
 v0 = executionStack[6];           //BYTECODE_POS: 43 depth
 v1 = v0                           //BYTECODE_POS: 46 
 v1 = v1.push;                     //BYTECODE_POS: 47 
 v2 = executionStack[3];           //BYTECODE_POS: 49 depth
 v0 = v1(v2);                      //BYTECODE_POS: 52 // context 0 could be custom vm or native func
 //get depth of 0 from executionStack//BYTECODE_POS: 55 
 v0 = executionStack;              //BYTECODE_POS: 55 
 v1 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 58 // replace the executionStack var with an index incremented
 // go back to 5                   //BYTECODE_POS: 60 
 v0 = undefined                    //BYTECODE_POS: 62 
 //return v0;                      //BYTECODE_POS: 63 
}