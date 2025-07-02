function VM223(arg0) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"//BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = ""                           //BYTECODE_POS: 6 
 executionStack[4] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 11 
 executionStack[5] = v0;           //BYTECODE_POS: 13 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 16 depth
 v1 = executionStack[2];           //BYTECODE_POS: 19 depth
 v0 = v0 < v1;                     //BYTECODE_POS: 22 
 // if (!v0) skip to 82            //BYTECODE_POS: 23 
 v0 = Math                         //BYTECODE_POS: 25 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 27 
 v1 = v1.random;                   //BYTECODE_POS: 28 
 v0 = v1();                        //BYTECODE_POS: 30 // context 0 could be custom vm or native func
 v1 = Date                         //BYTECODE_POS: 32 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = new v1()                     //BYTECODE_POS: 34 
 v1 = +v1                          //BYTECODE_POS: 36 
 v0 += v1                          //BYTECODE_POS: 37 
 executionStack[6] = v0;           //BYTECODE_POS: 38 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 41 depth
 v1 = executionStack[3];           //BYTECODE_POS: 44 depth
 v2 = Math                         //BYTECODE_POS: 47 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 49 
 v3 = v3.floor;                    //BYTECODE_POS: 50 
 v4 = executionStack[6];           //BYTECODE_POS: 52 depth
 v5 = executionStack[3];           //BYTECODE_POS: 55 depth
 v5 = v5.length;                   //BYTECODE_POS: 58 
 v4 *= v5                          //BYTECODE_POS: 60 
 v2 = v3(v4);                      //BYTECODE_POS: 61 // context 2 could be custom vm or native func
 v3 = executionStack[3];           //BYTECODE_POS: 63 depth
 v3 = v3.length;                   //BYTECODE_POS: 66 
 v2 %= v3                          //BYTECODE_POS: 68 
 v1 = v1[v2]                       //BYTECODE_POS: 69 
 v0 += v1                          //BYTECODE_POS: 70 
 //get depth of 0 from executionStack//BYTECODE_POS: 71 
 v1 = executionStack;              //BYTECODE_POS: 71 
 v2 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 74 
 //get depth of 0 from executionStack//BYTECODE_POS: 76 
 v0 = executionStack;              //BYTECODE_POS: 76 
 v1 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 79 // replace the executionStack var with an index incremented
 // go back to 15                  //BYTECODE_POS: 81 
 v0 = executionStack[4];           //BYTECODE_POS: 83 depth
 //return v0;                      //BYTECODE_POS: 86 
}