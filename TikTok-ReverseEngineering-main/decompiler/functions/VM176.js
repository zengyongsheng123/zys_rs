function VM176() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = self                         //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.frameElement;             //BYTECODE_POS: 3 
 // if (!v0) skip 9 to 15          //BYTECODE_POS: 5 
 v1 = self                         //BYTECODE_POS: 7 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.frameElement;             //BYTECODE_POS: 9 
 v1 = v1.tagName;                  //BYTECODE_POS: 11 
 v2 = "IFRAME"                     //BYTECODE_POS: 13 
 v1 = v1 === v2                    //BYTECODE_POS: 15 
 // if (!v1) skip to 23            //BYTECODE_POS: 16 
 v1 = {};                          //BYTECODE_POS: 18 
 v2 = 3;                           //BYTECODE_POS: 19 
 v1.data = v2;                     //BYTECODE_POS: 21 
 //return v1;                      //BYTECODE_POS: 23 
 v1 = window                       //BYTECODE_POS: 24 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.location;                 //BYTECODE_POS: 26 
 v2 = window                       //BYTECODE_POS: 28 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.parent;                   //BYTECODE_POS: 30 
 v2 = v2.location;                 //BYTECODE_POS: 32 
 v1 = v1 !== v2;                   //BYTECODE_POS: 34 
 // if (!v1) skip to 42            //BYTECODE_POS: 35 
 v1 = {};                          //BYTECODE_POS: 37 
 v2 = 4;                           //BYTECODE_POS: 38 
 v1.data = v2;                     //BYTECODE_POS: 40 
 //return v1;                      //BYTECODE_POS: 42 
 v1 = window                       //BYTECODE_POS: 43 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.frames;                   //BYTECODE_POS: 45 
 v1 = v1.length;                   //BYTECODE_POS: 47 
 v2 = parent                       //BYTECODE_POS: 49 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.frames;                   //BYTECODE_POS: 51 
 v2 = v2.length;                   //BYTECODE_POS: 53 
 v1 = v1 !== v2;                   //BYTECODE_POS: 55 
 // if (!v1) skip to 63            //BYTECODE_POS: 56 
 v1 = {};                          //BYTECODE_POS: 58 
 v2 = 5;                           //BYTECODE_POS: 59 
 v1.data = v2;                     //BYTECODE_POS: 61 
 //return v1;                      //BYTECODE_POS: 63 
 v1 = window                       //BYTECODE_POS: 64 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.self;                     //BYTECODE_POS: 66 
 v2 = window                       //BYTECODE_POS: 68 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.top;                      //BYTECODE_POS: 70 
 v1 = v1 !== v2;                   //BYTECODE_POS: 72 
 // if (!v1) skip to 80            //BYTECODE_POS: 73 
 v1 = {};                          //BYTECODE_POS: 75 
 v2 = 6;                           //BYTECODE_POS: 76 
 v1.data = v2;                     //BYTECODE_POS: 78 
 //return v1;                      //BYTECODE_POS: 80 
 v1 = window                       //BYTECODE_POS: 81 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 executionStack[2] = v1;           //BYTECODE_POS: 83 // depth = 0
 v1 = 0;                           //BYTECODE_POS: 86 
 executionStack[3] = v1;           //BYTECODE_POS: 88 // depth = 0
 v1 = executionStack[3];           //BYTECODE_POS: 91 depth
 v2 = 15;                          //BYTECODE_POS: 94 
 v1 = v1 < v2;                     //BYTECODE_POS: 96 
 // if (!v1) skip to 129           //BYTECODE_POS: 97 
 v1 = executionStack[2];           //BYTECODE_POS: 99 depth
 v1 = v1.top;                      //BYTECODE_POS: 102 
 executionStack[2] = v1;           //BYTECODE_POS: 104 // depth = 0
 v1 = window                       //BYTECODE_POS: 107 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.self;                     //BYTECODE_POS: 109 
 v2 = executionStack[2];           //BYTECODE_POS: 111 depth
 v1 = v1 !== v2;                   //BYTECODE_POS: 114 
 // if (!v1) skip to 122           //BYTECODE_POS: 115 
 v1 = {};                          //BYTECODE_POS: 117 
 v2 = 7;                           //BYTECODE_POS: 118 
 v1.data = v2;                     //BYTECODE_POS: 120 
 //return v1;                      //BYTECODE_POS: 122 
 //get depth of 0 from executionStack//BYTECODE_POS: 123 
 v1 = executionStack;              //BYTECODE_POS: 123 
 v2 = 3                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1 = v1[v2]++                     //BYTECODE_POS: 126 // replace the executionStack var with an index incremented
 // go back to 90                  //BYTECODE_POS: 128 
 // go foward to 152               //BYTECODE_POS: 130 
 executionStack[4] = v0;           //BYTECODE_POS: 132 // depth = 0
 v0 = {};                          //BYTECODE_POS: 135 
 v1 = 8;                           //BYTECODE_POS: 136 
 v0.data = v1;                     //BYTECODE_POS: 138 
 v1 = {};                          //BYTECODE_POS: 140 
 v2 = executionStack[4];           //BYTECODE_POS: 141 depth
 v1.err = v2;                      //BYTECODE_POS: 144 
 v2 = "d_w_i"                      //BYTECODE_POS: 146 
 v1.type = v2;                     //BYTECODE_POS: 148 
 v0.error = v1;                    //BYTECODE_POS: 150 
 //return v0;                      //BYTECODE_POS: 152 
 v0 = {};                          //BYTECODE_POS: 153 
 v1 = 2;                           //BYTECODE_POS: 154 
 v0.data = v1;                     //BYTECODE_POS: 156 
 //return v0;                      //BYTECODE_POS: 158 
}