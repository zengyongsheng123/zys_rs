function VM219() {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = RegExp                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = "constructor"                //BYTECODE_POS: 3 
 v2 = "i"                          //BYTECODE_POS: 5 
 v0 = new v0()                     //BYTECODE_POS: 7 
 v1 = v0                           //BYTECODE_POS: 9 
 v1 = v1.test;                     //BYTECODE_POS: 10 
 v2 = window                       //BYTECODE_POS: 12 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.HTMLElement;              //BYTECODE_POS: 14 
 v0 = v1(v2);                      //BYTECODE_POS: 16 // context 0 could be custom vm or native func
 // if (v0) skip 23                //BYTECODE_POS: 18 
 v1 = undefined                    //BYTECODE_POS: 20 
 v2 = functionVM220;               //BYTECODE_POS: 21 
 v3 = window                       //BYTECODE_POS: 23 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3.safari;                   //BYTECODE_POS: 25 
 v3 = !v3                          //BYTECODE_POS: 27 
 // if (v3) skip 11                //BYTECODE_POS: 28 
 v4 = typeof globalThis.safari     //BYTECODE_POS: 30 
 v5 = "undefined"                  //BYTECODE_POS: 32 
 v4 = v4 !== v5;                   //BYTECODE_POS: 34 
 // if (!v4) skip 4 to 40          //BYTECODE_POS: 35 
 v5 = safari                       //BYTECODE_POS: 37 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v5.pushNotification;         //BYTECODE_POS: 39 
 v3 = v4(v5);                      //BYTECODE_POS: 41 // context 3 could be custom vm or native func
 //return v3;                      //BYTECODE_POS: 43 
 // go foward to 48                //BYTECODE_POS: 44 
 executionStack[2] = v2;           //BYTECODE_POS: 46 // depth = 0
 v2 = undefined                    //BYTECODE_POS: 49 
 //return v2;                      //BYTECODE_POS: 50 
}