function VM32() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = functionVM34;                //BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = navigator                    //BYTECODE_POS: 6 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.battery;                  //BYTECODE_POS: 8 
 // if (v0) skip 4                 //BYTECODE_POS: 10 
 v1 = navigator                    //BYTECODE_POS: 12 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.mozBattery;               //BYTECODE_POS: 14 
 executionStack[2] = v1;           //BYTECODE_POS: 16 // depth = 0
 v1 = executionStack[2];           //BYTECODE_POS: 19 depth
 // if (!v1) skip to 39            //BYTECODE_POS: 22 
 v1 = executionStack[2];           //BYTECODE_POS: 24 depth
 v2 = undefined                    //BYTECODE_POS: 27 
 v3 = executionStack[3];           //BYTECODE_POS: 28 depth
 v4 = executionStack[2];           //BYTECODE_POS: 31 depth
 v2 = v3(v4);                      //BYTECODE_POS: 34 // context 2 could be custom vm or native func
 v1.battery = v1;                  //BYTECODE_POS: 36 
 // go foward to 76                //BYTECODE_POS: 38 
 v1 = typeof globalThis.navigator  //BYTECODE_POS: 40 
 v2 = "undefined"                  //BYTECODE_POS: 42 
 v1 = v1 != v2;                    //BYTECODE_POS: 44 
 // if (!v1) skip 8 to 54          //BYTECODE_POS: 45 
 v2 = navigator                    //BYTECODE_POS: 47 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.getBattery;               //BYTECODE_POS: 49 
 v2 = typeof v2;                   //BYTECODE_POS: 51 
 v3 = "function"                   //BYTECODE_POS: 52 
 v2 = v2 === v3                    //BYTECODE_POS: 54 
 // if (!v2) skip to 76            //BYTECODE_POS: 55 
 v2 = navigator                    //BYTECODE_POS: 57 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 59 
 v3 = v3.getBattery;               //BYTECODE_POS: 60 
 v2 = v3();                        //BYTECODE_POS: 62 // context 2 could be custom vm or native func
 v3 = v2                           //BYTECODE_POS: 64 
 v3 = v3.then;                     //BYTECODE_POS: 65 
 v4 = functionVM33;                //BYTECODE_POS: 67 
 v2 = v3(v4);                      //BYTECODE_POS: 69 // context 2 could be custom vm or native func
 // go foward to 76                //BYTECODE_POS: 72 
 executionStack[4] = v1;           //BYTECODE_POS: 74 // depth = 0
 v1 = undefined                    //BYTECODE_POS: 77 
 //return v1;                      //BYTECODE_POS: 78 
}