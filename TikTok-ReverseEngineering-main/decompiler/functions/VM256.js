function VM256() {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = navigator                    //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.userAgent;                //BYTECODE_POS: 3 
 v1 = v0                           //BYTECODE_POS: 5 
 v1 = v1.toLowerCase;              //BYTECODE_POS: 6 
 v0 = v1();                        //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 10 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 13 depth
 v1 = v0                           //BYTECODE_POS: 16 
 v1 = v1.indexOf;                  //BYTECODE_POS: 17 
 v2 = "electron"                   //BYTECODE_POS: 19 
 v0 = v1(v2);                      //BYTECODE_POS: 21 // context 0 could be custom vm or native func
 v1 = 0;                           //BYTECODE_POS: 23 
 v0 = v0 >= v1                     //BYTECODE_POS: 25 
 // if (!v0) skip to 29            //BYTECODE_POS: 26 
 v0 = false;                       //BYTECODE_POS: 28 
 //return v0;                      //BYTECODE_POS: 29 
 v0 = typeof globalThis.global     //BYTECODE_POS: 30 
 v1 = "undefined"                  //BYTECODE_POS: 32 
 v0 = v0 !== v1;                   //BYTECODE_POS: 34 
 // if (!v0) skip 18 to 54         //BYTECODE_POS: 35 
 v1 = Object                       //BYTECODE_POS: 37 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.prototype;                //BYTECODE_POS: 39 
 v1 = v1.toString;                 //BYTECODE_POS: 41 
 v2 = v1                           //BYTECODE_POS: 43 
 v2 = v2.call;                     //BYTECODE_POS: 44 
 v3 = global                       //BYTECODE_POS: 46 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3.process;                  //BYTECODE_POS: 48 
 v1 = v2(v3);                      //BYTECODE_POS: 50 // context 1 could be custom vm or native func
 v2 = "[object process]"           //BYTECODE_POS: 52 
 v1 = v1 === v2                    //BYTECODE_POS: 54 
 // if (v1) skip 31                //BYTECODE_POS: 55 
 v2 = typeof globalThis.process    //BYTECODE_POS: 57 
 v3 = "undefined"                  //BYTECODE_POS: 59 
 v2 = v2 === v3                    //BYTECODE_POS: 61 
 // if (!v2) skip to 67            //BYTECODE_POS: 62 
 v2 = "undefined"                  //BYTECODE_POS: 64 
 // go foward to 75                //BYTECODE_POS: 66 
 v3 = undefined                    //BYTECODE_POS: 68 
 v4 = executionStack[0];           //BYTECODE_POS: 69 depth
 v5 = process                      //BYTECODE_POS: 72 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v4(v5);                      //BYTECODE_POS: 74 // context 3 could be custom vm or native func
 v4 = "object"                     //BYTECODE_POS: 76 
 v3 = v3 === v4                    //BYTECODE_POS: 78 
 // if (!v3) skip 7 to 87          //BYTECODE_POS: 79 
 v4 = process                      //BYTECODE_POS: 81 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v4.title;                    //BYTECODE_POS: 83 
 v5 = "node"                       //BYTECODE_POS: 85 
 v4 = v4 === v5                    //BYTECODE_POS: 87 
 //return v4;                      //BYTECODE_POS: 88 
}