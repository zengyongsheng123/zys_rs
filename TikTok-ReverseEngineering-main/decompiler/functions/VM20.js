function VM20() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = functionVM21;                //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = executionStack[6];           //BYTECODE_POS: 6 depth
 // if (!v0) skip to 12            //BYTECODE_POS: 9 
 v0 = undefined                    //BYTECODE_POS: 11 
 //return v0;                      //BYTECODE_POS: 12 
 v0 = true                         //BYTECODE_POS: 13 
 executionStack[6] = v0;           //BYTECODE_POS: 14 // depth = 1
 v0 = Date                         //BYTECODE_POS: 17 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = new v0()                     //BYTECODE_POS: 19 
 v1 = v0                           //BYTECODE_POS: 21 
 v1 = v1.getTime;                  //BYTECODE_POS: 22 
 v0 = v1();                        //BYTECODE_POS: 24 // context 0 could be custom vm or native func
 executionStack[8] = v0;           //BYTECODE_POS: 26 // depth = 1
 v0 = window                       //BYTECODE_POS: 29 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0._mssdk;                   //BYTECODE_POS: 31 
 // if (!v0) skip 7 to 41          //BYTECODE_POS: 33 
 v1 = window                       //BYTECODE_POS: 35 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._mssdk;                   //BYTECODE_POS: 37 
 v1 = v1.pppt;                     //BYTECODE_POS: 39 
 v1 = !v1                          //BYTECODE_POS: 41 
 // if (!v1) skip to 51            //BYTECODE_POS: 42 
 v1 = window                       //BYTECODE_POS: 44 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1._mssdk;                   //BYTECODE_POS: 46 
 v2 = 2;                           //BYTECODE_POS: 48 
 v1.pppt = v1;                     //BYTECODE_POS: 50 
 v1 = document                     //BYTECODE_POS: 52 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.querySelector;            //BYTECODE_POS: 54 
 executionStack[4] = v1;           //BYTECODE_POS: 56 // depth = 1
 v1 = document                     //BYTECODE_POS: 59 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = undefined                    //BYTECODE_POS: 61 
 v3 = executionStack[2];           //BYTECODE_POS: 62 depth
 v4 = executionStack[4];           //BYTECODE_POS: 65 depth
 v2 = v3(v4);                      //BYTECODE_POS: 68 // context 2 could be custom vm or native func
 v1.querySelector = v1;            //BYTECODE_POS: 70 
 v1 = document                     //BYTECODE_POS: 72 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.evaluate;                 //BYTECODE_POS: 74 
 executionStack[5] = v1;           //BYTECODE_POS: 76 // depth = 1
 v1 = document                     //BYTECODE_POS: 79 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = undefined                    //BYTECODE_POS: 81 
 v3 = executionStack[2];           //BYTECODE_POS: 82 depth
 v4 = executionStack[5];           //BYTECODE_POS: 85 depth
 v2 = v3(v4);                      //BYTECODE_POS: 88 // context 2 could be custom vm or native func
 v1.evaluate = v1;                 //BYTECODE_POS: 90 
 v1 = undefined                    //BYTECODE_POS: 92 
 //return v1;                      //BYTECODE_POS: 93 
}