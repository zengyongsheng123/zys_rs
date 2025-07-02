function VM19() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = PluginArray                  //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.prototype;                //BYTECODE_POS: 3 
 v1 = navigator                    //BYTECODE_POS: 5 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.plugins;                  //BYTECODE_POS: 7 
 v1 = v1.__proto__;                //BYTECODE_POS: 9 
 v0 = v0 === v1                    //BYTECODE_POS: 11 
 executionStack[2] = v0;           //BYTECODE_POS: 12 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 15 
 v1 = executionStack[0];           //BYTECODE_POS: 16 depth
 v2 = navigator                    //BYTECODE_POS: 19 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.plugins;                  //BYTECODE_POS: 21 
 v0 = v1(v2);                      //BYTECODE_POS: 23 // context 0 could be custom vm or native func
 v1 = "object"                     //BYTECODE_POS: 25 
 v0 = v0 === v1                    //BYTECODE_POS: 27 
 // if (!v0) skip 9 to 38          //BYTECODE_POS: 28 
 v1 = navigator                    //BYTECODE_POS: 30 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.plugins;                  //BYTECODE_POS: 32 
 v1 = v1.length;                   //BYTECODE_POS: 34 
 v2 = 0;                           //BYTECODE_POS: 36 
 v1 = v1 > v2                      //BYTECODE_POS: 38 
 // if (!v1) skip to 93            //BYTECODE_POS: 39 
 v1 = 0;                           //BYTECODE_POS: 41 
 executionStack[3] = v1;           //BYTECODE_POS: 43 // depth = 0
 v1 = executionStack[3];           //BYTECODE_POS: 46 depth
 v2 = navigator                    //BYTECODE_POS: 49 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.plugins;                  //BYTECODE_POS: 51 
 v2 = v2.length;                   //BYTECODE_POS: 53 
 v1 = v1 < v2;                     //BYTECODE_POS: 55 
 // if (!v1) skip to 93            //BYTECODE_POS: 56 
 v1 = Plugin                       //BYTECODE_POS: 58 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.prototype;                //BYTECODE_POS: 60 
 v2 = navigator                    //BYTECODE_POS: 62 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.plugins;                  //BYTECODE_POS: 64 
 v3 = executionStack[3];           //BYTECODE_POS: 66 depth
 v2 = v2[v3]                       //BYTECODE_POS: 69 
 v2 = v2.__proto__;                //BYTECODE_POS: 70 
 v1 = v1 !== v2;                   //BYTECODE_POS: 72 
 // if (!v1) skip to 86            //BYTECODE_POS: 73 
 v1 = executionStack[2];           //BYTECODE_POS: 75 depth
 v2 = false;                       //BYTECODE_POS: 78 
 v1 &= v2;                         //BYTECODE_POS: 79 
 //get depth of 0 from executionStack//BYTECODE_POS: 80 
 v2 = executionStack;              //BYTECODE_POS: 80 
 v3 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v2[v3] = v1                       //BYTECODE_POS: 83 
 // go foward to 93                //BYTECODE_POS: 85 
 //get depth of 0 from executionStack//BYTECODE_POS: 87 
 v1 = executionStack;              //BYTECODE_POS: 87 
 v2 = 3                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1 = v1[v2]++                     //BYTECODE_POS: 90 // replace the executionStack var with an index incremented
 // go back to 45                  //BYTECODE_POS: 92 
 v1 = {};                          //BYTECODE_POS: 94 
 v2 = undefined                    //BYTECODE_POS: 95 
 v3 = executionStack[3];           //BYTECODE_POS: 96 depth
 v4 = executionStack[11];          //BYTECODE_POS: 99 depth
 v2 = v3(v4);                      //BYTECODE_POS: 102 // context 2 could be custom vm or native func
 v1.plugin = v2;                   //BYTECODE_POS: 104 
 v2 = undefined                    //BYTECODE_POS: 106 
 v3 = executionStack[17];          //BYTECODE_POS: 107 depth
 v2 = v3();                        //BYTECODE_POS: 110 // context 2 could be custom vm or native func
 v1.pv = v2;                       //BYTECODE_POS: 112 
 v2 = executionStack[2];           //BYTECODE_POS: 114 depth
 // if (!v2) skip to 122           //BYTECODE_POS: 117 
 v2 = 1;                           //BYTECODE_POS: 119 
 // go foward to 124               //BYTECODE_POS: 121 
 v3 = 2;                           //BYTECODE_POS: 123 
 v2.proto = v3;                    //BYTECODE_POS: 125 
 //return v2;                      //BYTECODE_POS: 127 
 // go foward to 153               //BYTECODE_POS: 128 
 executionStack[4] = v1;           //BYTECODE_POS: 130 // depth = 0
 v1 = executionStack[11];          //BYTECODE_POS: 133 depth
 v2 = v1                           //BYTECODE_POS: 136 
 v2 = v2.push;                     //BYTECODE_POS: 137 
 v3 = {};                          //BYTECODE_POS: 139 
 v4 = executionStack[4];           //BYTECODE_POS: 140 depth
 v3.err = v4;                      //BYTECODE_POS: 143 
 v4 = "d_p"                        //BYTECODE_POS: 145 
 v3.type = v4;                     //BYTECODE_POS: 147 
 v1 = v2(v3);                      //BYTECODE_POS: 149 // context 1 could be custom vm or native func
 v1 = {};                          //BYTECODE_POS: 152 
 //return v1;                      //BYTECODE_POS: 153 
 v1 = undefined                    //BYTECODE_POS: 154 
 //return v1;                      //BYTECODE_POS: 155 
}