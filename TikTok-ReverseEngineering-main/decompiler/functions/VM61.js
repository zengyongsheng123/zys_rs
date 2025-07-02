function VM61(arg0, arg1, arg2) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = 0;                           //BYTECODE_POS: 1 
 executionStack[5] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 6 
 executionStack[6] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = executionStack[6];           //BYTECODE_POS: 11 depth
 v1 = executionStack[3];           //BYTECODE_POS: 14 depth
 v1 = v1.length;                   //BYTECODE_POS: 17 
 v0 = v0 < v1;                     //BYTECODE_POS: 19 
 // if (!v0) skip to 96            //BYTECODE_POS: 20 
 v0 = undefined                    //BYTECODE_POS: 22 
 v1 = executionStack[0];           //BYTECODE_POS: 23 depth
 v2 = executionStack[2];           //BYTECODE_POS: 26 depth
 v3 = executionStack[3];           //BYTECODE_POS: 29 depth
 v4 = executionStack[6];           //BYTECODE_POS: 32 depth
 v3 = v3[v4]                       //BYTECODE_POS: 35 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 36 // context 0 could be custom vm or native func
 executionStack[7] = v0;           //BYTECODE_POS: 38 // depth = 0
 v0 = executionStack[7];           //BYTECODE_POS: 41 depth
 // if (!v0) skip to 89            //BYTECODE_POS: 44 
 v0 = executionStack[5];           //BYTECODE_POS: 46 depth
 v1 = executionStack[7];           //BYTECODE_POS: 49 depth
 v2 = executionStack[4];           //BYTECODE_POS: 52 depth
 v3 = executionStack[6];           //BYTECODE_POS: 55 depth
 v2 += v3                          //BYTECODE_POS: 58 
 v1 <<= v2                         //BYTECODE_POS: 59 
 v0 |= v1;                         //BYTECODE_POS: 60 
 //get depth of 0 from executionStack//BYTECODE_POS: 61 
 v1 = executionStack;              //BYTECODE_POS: 61 
 v2 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 64 
 v0 = executionStack[4];           //BYTECODE_POS: 66 depth
 v1 = executionStack[6];           //BYTECODE_POS: 69 depth
 v0 += v1                          //BYTECODE_POS: 72 
 v1 = 32;                          //BYTECODE_POS: 73 
 v0 = v0 >= v1                     //BYTECODE_POS: 75 
 // if (!v0) skip to 89            //BYTECODE_POS: 76 
 v0 = console                      //BYTECODE_POS: 78 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 80 
 v1 = v1.error;                    //BYTECODE_POS: 81 
 v2 = "abort 32"                   //BYTECODE_POS: 83 
 v0 = v1(v2);                      //BYTECODE_POS: 85 // context 0 could be custom vm or native func
 // go foward to 96                //BYTECODE_POS: 88 
 //get depth of 0 from executionStack//BYTECODE_POS: 90 
 v0 = executionStack;              //BYTECODE_POS: 90 
 v1 = 6                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 93 // replace the executionStack var with an index incremented
 // go back to 10                  //BYTECODE_POS: 95 
 v0 = executionStack[5];           //BYTECODE_POS: 97 depth
 //return v0;                      //BYTECODE_POS: 100 
}