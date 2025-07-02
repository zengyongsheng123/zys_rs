function VM180() {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = window                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.byted_acrawler;           //BYTECODE_POS: 3 
 // if (!v0) skip 6 to 12          //BYTECODE_POS: 5 
 v1 = window                       //BYTECODE_POS: 7 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.byted_acrawler;           //BYTECODE_POS: 9 
 v1 = v1.init;                     //BYTECODE_POS: 11 
 // if (!v1) skip to 60            //BYTECODE_POS: 13 
 v1 = window                       //BYTECODE_POS: 15 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.byted_acrawler;           //BYTECODE_POS: 17 
 v1 = v1.init;                     //BYTECODE_POS: 19 
 v2 = v1                           //BYTECODE_POS: 21 
 v2 = v2.toString;                 //BYTECODE_POS: 22 
 v1 = v2();                        //BYTECODE_POS: 24 // context 1 could be custom vm or native func
 v2 = v1                           //BYTECODE_POS: 26 
 v2 = v2.search;                   //BYTECODE_POS: 27 
 v3 = RegExp                       //BYTECODE_POS: 29 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = "\n"                         //BYTECODE_POS: 31 
 v5 = "m"                          //BYTECODE_POS: 33 
 v3 = new v3()                     //BYTECODE_POS: 35 
 v1 = v2(v3);                      //BYTECODE_POS: 37 // context 1 could be custom vm or native func
 v2 = 1;                           //BYTECODE_POS: 39 
 v2 = -v2                          //BYTECODE_POS: 41 
 v1 = v1 !== v2;                   //BYTECODE_POS: 42 
 // if (!v1) skip to 52            //BYTECODE_POS: 43 
 v1 = {};                          //BYTECODE_POS: 45 
 v2 = 1;                           //BYTECODE_POS: 46 
 v1.data = v2;                     //BYTECODE_POS: 48 
 //return v1;                      //BYTECODE_POS: 50 
 // go foward to 58                //BYTECODE_POS: 51 
 v1 = {};                          //BYTECODE_POS: 53 
 v2 = 2;                           //BYTECODE_POS: 54 
 v1.data = v2;                     //BYTECODE_POS: 56 
 //return v1;                      //BYTECODE_POS: 58 
 // go foward to 66                //BYTECODE_POS: 59 
 v1 = {};                          //BYTECODE_POS: 61 
 v2 = 3;                           //BYTECODE_POS: 62 
 v1.data = v2;                     //BYTECODE_POS: 64 
 //return v1;                      //BYTECODE_POS: 66 
 v1 = undefined                    //BYTECODE_POS: 67 
 //return v1;                      //BYTECODE_POS: 68 
}