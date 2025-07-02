function VM121(arg0, arg1) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v0 = v0.length;                   //BYTECODE_POS: 4 
 v1 = 200;                         //BYTECODE_POS: 6 
 v0 = v0 > v1                      //BYTECODE_POS: 8 
 // if (!v0) skip to 23            //BYTECODE_POS: 9 
 v0 = executionStack[2];           //BYTECODE_POS: 11 depth
 v1 = v0                           //BYTECODE_POS: 14 
 v1 = v1.splice;                   //BYTECODE_POS: 15 
 v2 = 0;                           //BYTECODE_POS: 17 
 v3 = 100;                         //BYTECODE_POS: 19 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 21 // context 0 could be custom vm or native func
 v0 = executionStack[2];           //BYTECODE_POS: 24 depth
 v0 = v0.length;                   //BYTECODE_POS: 27 
 v1 = 0;                           //BYTECODE_POS: 29 
 v0 = v0 > v1                      //BYTECODE_POS: 31 
 // if (!v0) skip to 73            //BYTECODE_POS: 32 
 v0 = executionStack[2];           //BYTECODE_POS: 34 depth
 v1 = executionStack[2];           //BYTECODE_POS: 37 depth
 v1 = v1.length;                   //BYTECODE_POS: 40 
 v2 = 1;                           //BYTECODE_POS: 42 
 v1 -= v2;                         //BYTECODE_POS: 44 
 v0 = v0[v1]                       //BYTECODE_POS: 45 
 executionStack[4] = v0;           //BYTECODE_POS: 46 // depth = 0
 v0 = JSON                         //BYTECODE_POS: 49 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 51 
 v1 = v1.stringify;                //BYTECODE_POS: 52 
 v2 = executionStack[4];           //BYTECODE_POS: 54 depth
 v0 = v1(v2);                      //BYTECODE_POS: 57 // context 0 could be custom vm or native func
 v1 = JSON                         //BYTECODE_POS: 59 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 61 
 v2 = v2.stringify;                //BYTECODE_POS: 62 
 v3 = executionStack[3];           //BYTECODE_POS: 64 depth
 v1 = v2(v3);                      //BYTECODE_POS: 67 // context 1 could be custom vm or native func
 v0 = v0 === v1                    //BYTECODE_POS: 69 
 // if (!v0) skip to 73            //BYTECODE_POS: 70 
 v0 = undefined                    //BYTECODE_POS: 72 
 //return v0;                      //BYTECODE_POS: 73 
 v0 = executionStack[2];           //BYTECODE_POS: 74 depth
 v1 = v0                           //BYTECODE_POS: 77 
 v1 = v1.push;                     //BYTECODE_POS: 78 
 v2 = executionStack[3];           //BYTECODE_POS: 80 depth
 v0 = v1(v2);                      //BYTECODE_POS: 83 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 86 
 //return v0;                      //BYTECODE_POS: 87 
}