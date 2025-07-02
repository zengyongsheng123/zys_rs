function VM201() {
 var v0,v1,v2,v3,v4,v5,v6; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = {};                          //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 2 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 5 depth
 v0 = v0.SECINFO;                  //BYTECODE_POS: 8 
 // if (!v0) skip to 21            //BYTECODE_POS: 10 
 v0 = executionStack[2];           //BYTECODE_POS: 12 depth
 v0 = v0.SECINFO;                  //BYTECODE_POS: 15 
 executionStack[2] = v0;           //BYTECODE_POS: 17 // depth = 0
 // go foward to 30                //BYTECODE_POS: 20 
 v0 = undefined                    //BYTECODE_POS: 22 
 v1 = executionStack[9];           //BYTECODE_POS: 23 depth
 v0 = v1();                        //BYTECODE_POS: 26 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 28 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 31 depth
 v1 = Date                         //BYTECODE_POS: 34 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v1                           //BYTECODE_POS: 36 
 v2 = v2.now;                      //BYTECODE_POS: 37 
 v1 = v2();                        //BYTECODE_POS: 39 // context 1 could be custom vm or native func
 v0.timestamp = v0;                //BYTECODE_POS: 41 
 v0 = undefined                    //BYTECODE_POS: 43 
 v1 = executionStack[6];           //BYTECODE_POS: 44 depth
 v2 = 4;                           //BYTECODE_POS: 47 
 v0 = v1(v2);                      //BYTECODE_POS: 49 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 51 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 54 depth
 v1 = undefined                    //BYTECODE_POS: 57 
 v2 = executionStack[5];           //BYTECODE_POS: 58 depth
 v3 = undefined                    //BYTECODE_POS: 61 
 v4 = executionStack[4];           //BYTECODE_POS: 62 depth
 v5 = undefined                    //BYTECODE_POS: 65 
 v6 = executionStack[7];           //BYTECODE_POS: 66 depth
 v7 = executionStack[2];           //BYTECODE_POS: 69 depth
 v5 = v6(v7);                      //BYTECODE_POS: 72 // context 5 could be custom vm or native func
 v6 = executionStack[3];           //BYTECODE_POS: 74 depth
 v3 = v4(v5,v6);                   //BYTECODE_POS: 77 // context 3 could be custom vm or native func
 v4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-."//BYTECODE_POS: 79 
 v1 = v2(v3,v4);                   //BYTECODE_POS: 81 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 83 
 executionStack[4] = v0;           //BYTECODE_POS: 84 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 87 depth
 //return v0;                      //BYTECODE_POS: 90 
}