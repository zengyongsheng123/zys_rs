function VM164() {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = window                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.eval;                     //BYTECODE_POS: 3 
 v0 = v0.name;                     //BYTECODE_POS: 5 
 v1 = "eval"                       //BYTECODE_POS: 7 
 v0 = v0 !== v1;                   //BYTECODE_POS: 9 
 // if (v0) skip 27                //BYTECODE_POS: 10 
 v1 = Object                       //BYTECODE_POS: 12 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.prototype;                //BYTECODE_POS: 14 
 v1 = v1.toString;                 //BYTECODE_POS: 16 
 v2 = v1                           //BYTECODE_POS: 18 
 v2 = v2.call;                     //BYTECODE_POS: 19 
 v3 = window                       //BYTECODE_POS: 21 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3.eval;                     //BYTECODE_POS: 23 
 v3 = v3.prototype;                //BYTECODE_POS: 25 
 v1 = v2(v3);                      //BYTECODE_POS: 27 // context 1 could be custom vm or native func
 v2 = v1                           //BYTECODE_POS: 29 
 v2 = v2.indexOf;                  //BYTECODE_POS: 30 
 v3 = "Undefined"                  //BYTECODE_POS: 32 
 v1 = v2(v3);                      //BYTECODE_POS: 34 // context 1 could be custom vm or native func
 v2 = 0;                           //BYTECODE_POS: 36 
 v1 = v1 < v2;                     //BYTECODE_POS: 38 
 // if (!v1) skip to 46            //BYTECODE_POS: 39 
 v1 = {};                          //BYTECODE_POS: 41 
 v2 = 1;                           //BYTECODE_POS: 42 
 v1.data = v2;                     //BYTECODE_POS: 44 
 //return v1;                      //BYTECODE_POS: 46 
 v1 = {};                          //BYTECODE_POS: 47 
 v2 = 2;                           //BYTECODE_POS: 48 
 v1.data = v2;                     //BYTECODE_POS: 50 
 //return v1;                      //BYTECODE_POS: 52 
}