function VM124(arg0) {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = arguments;                   //BYTECODE_POS: 2 depth
 v2 = executionStack[2];           //BYTECODE_POS: 5 depth
 v3 = executionStack[0];           //BYTECODE_POS: 8 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 11 // context 0 could be custom vm or native func
 v0 = executionStack[2];           //BYTECODE_POS: 14 depth
 executionStack[3] = v0;           //BYTECODE_POS: 17 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 20 depth
 v0 = v0.type;                     //BYTECODE_POS: 23 
 v1 = "touchmove"                  //BYTECODE_POS: 25 
 v0 = v0 == v1;                    //BYTECODE_POS: 27 
 // if (!v0) skip to 43            //BYTECODE_POS: 28 
 v0 = true                         //BYTECODE_POS: 30 
 executionStack[3] = v0;           //BYTECODE_POS: 31 // depth = 1
 v0 = executionStack[2];           //BYTECODE_POS: 34 depth
 v0 = v0.changedTouches;           //BYTECODE_POS: 37 
 v0 = v0[0];                       //BYTECODE_POS: 39 
 executionStack[3] = v0;           //BYTECODE_POS: 41 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 44 
 v1 = executionStack[15];          //BYTECODE_POS: 45 depth
 v2 = executionStack[5];           //BYTECODE_POS: 48 depth
 v3 = {};                          //BYTECODE_POS: 51 
 v4 = Date                         //BYTECODE_POS: 52 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v4                           //BYTECODE_POS: 54 
 v5 = v5.now;                      //BYTECODE_POS: 55 
 v4 = v5();                        //BYTECODE_POS: 57 // context 4 could be custom vm or native func
 v3.d = v4;                        //BYTECODE_POS: 59 
 v4 = Math                         //BYTECODE_POS: 61 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v4                           //BYTECODE_POS: 63 
 v5 = v5.floor;                    //BYTECODE_POS: 64 
 v6 = executionStack[3];           //BYTECODE_POS: 66 depth
 v6 = v6.clientX;                  //BYTECODE_POS: 69 
 v4 = v5(v6);                      //BYTECODE_POS: 71 // context 4 could be custom vm or native func
 v3.x = v4;                        //BYTECODE_POS: 73 
 v4 = Math                         //BYTECODE_POS: 75 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v4                           //BYTECODE_POS: 77 
 v5 = v5.floor;                    //BYTECODE_POS: 78 
 v6 = executionStack[3];           //BYTECODE_POS: 80 depth
 v6 = v6.clientY;                  //BYTECODE_POS: 83 
 v4 = v5(v6);                      //BYTECODE_POS: 85 // context 4 could be custom vm or native func
 v3.y = v4;                        //BYTECODE_POS: 87 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 89 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 92 
 //return v0;                      //BYTECODE_POS: 93 
}