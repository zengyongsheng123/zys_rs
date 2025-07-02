function VM258() {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[0];           //BYTECODE_POS: 2 depth
 v0 = v1();                        //BYTECODE_POS: 5 // context 0 could be custom vm or native func
 v0 = !v0                          //BYTECODE_POS: 7 
 // if (!v0) skip to 168           //BYTECODE_POS: 8 
 v0 = document                     //BYTECODE_POS: 10 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 12 
 v1 = v1.createElement;            //BYTECODE_POS: 13 
 v2 = "canvas"                     //BYTECODE_POS: 15 
 v0 = v1(v2);                      //BYTECODE_POS: 17 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 19 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 22 depth
 v1 = "toDataURL"                  //BYTECODE_POS: 25 
 v0 = [v0,v1]                      //BYTECODE_POS: 27 
 v1 = navigator                    //BYTECODE_POS: 29 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = "toString"                   //BYTECODE_POS: 31 
 v1 = [v1,v2]                      //BYTECODE_POS: 33 
 v2 = document                     //BYTECODE_POS: 35 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = "createElement"              //BYTECODE_POS: 37 
 v2 = [v2,v3]                      //BYTECODE_POS: 39 
 v3 = document                     //BYTECODE_POS: 41 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = "getElementById"             //BYTECODE_POS: 43 
 v3 = [v3,v4]                      //BYTECODE_POS: 45 
 v4 = JSON                         //BYTECODE_POS: 47 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = "stringify"                  //BYTECODE_POS: 49 
 v4 = [v4,v5]                      //BYTECODE_POS: 51 
 v5 = JSON                         //BYTECODE_POS: 53 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v6 = "parse"                      //BYTECODE_POS: 55 
 v5 = [v5,v6]                      //BYTECODE_POS: 57 
 v6 = window                       //BYTECODE_POS: 59 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v7 = "setInterval"                //BYTECODE_POS: 61 
 v6 = [v6,v7]                      //BYTECODE_POS: 63 
 v7 = window                       //BYTECODE_POS: 65 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v8 = "eval"                       //BYTECODE_POS: 67 
 v7 = [v7,v8]                      //BYTECODE_POS: 69 
 v8 = window                       //BYTECODE_POS: 71 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v9 = "matchMedia"                 //BYTECODE_POS: 73 
 v8 = [v8,v9]                      //BYTECODE_POS: 75 
 v0 = [v0,v1,v2,v3,v4,v5,v6,v7,v8] //BYTECODE_POS: 77 
 executionStack[3] = v0;           //BYTECODE_POS: 79 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 82 
 executionStack[4] = v0;           //BYTECODE_POS: 84 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 87 depth
 v1 = executionStack[3];           //BYTECODE_POS: 90 depth
 v1 = v1.length;                   //BYTECODE_POS: 93 
 v0 = v0 < v1;                     //BYTECODE_POS: 95 
 // if (!v0) skip to 168           //BYTECODE_POS: 96 
 v0 = executionStack[3];           //BYTECODE_POS: 98 depth
 v1 = executionStack[4];           //BYTECODE_POS: 101 depth
 v0 = v0[v1]                       //BYTECODE_POS: 104 
 v0 = v0[0];                       //BYTECODE_POS: 105 
 v1 = executionStack[3];           //BYTECODE_POS: 107 depth
 v2 = executionStack[4];           //BYTECODE_POS: 110 depth
 v1 = v1[v2]                       //BYTECODE_POS: 113 
 v1 = v1[1];                       //BYTECODE_POS: 114 
 v0 = v0[v1]                       //BYTECODE_POS: 116 
 v1 = v0                           //BYTECODE_POS: 117 
 v1 = v1.toString;                 //BYTECODE_POS: 118 
 v0 = v1();                        //BYTECODE_POS: 120 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 122 
 v1 = v1.replace;                  //BYTECODE_POS: 123 
 v2 = RegExp                       //BYTECODE_POS: 125 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = "\s*"                        //BYTECODE_POS: 127 
 v4 = "g"                          //BYTECODE_POS: 129 
 v2 = new v2()                     //BYTECODE_POS: 131 
 v3 = ""                           //BYTECODE_POS: 133 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 135 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 137 
 v1 = v1.indexOf;                  //BYTECODE_POS: 138 
 v2 = "nativecode"                 //BYTECODE_POS: 140 
 v0 = v1(v2);                      //BYTECODE_POS: 142 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 144 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 147 depth
 v1 = 0;                           //BYTECODE_POS: 150 
 v0 = v0 < v1;                     //BYTECODE_POS: 152 
 // if (!v0) skip to 156           //BYTECODE_POS: 153 
 v0 = true                         //BYTECODE_POS: 155 
 //return v0;                      //BYTECODE_POS: 156 
 // go foward to 161               //BYTECODE_POS: 157 
 executionStack[6] = v-1;          //BYTECODE_POS: 159 // depth = 0
 //get depth of 0 from executionStack//BYTECODE_POS: 162 
 v-1 = executionStack;             //BYTECODE_POS: 162 
 v0 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v-1 = v-1[v0]++                   //BYTECODE_POS: 165 // replace the executionStack var with an index incremented
 // go back to 86                  //BYTECODE_POS: 167 
 v-1 = navigator                   //BYTECODE_POS: 169 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v-1 = v-1.plugins;                //BYTECODE_POS: 171 
 v0 = v-1                          //BYTECODE_POS: 173 
 v0 = v0.toString;                 //BYTECODE_POS: 174 
 v-1 = v0();                       //BYTECODE_POS: 176 // context -1 could be custom vm or native func
 v0 = "[object PluginArray]"       //BYTECODE_POS: 178 
 v-1 = v-1 !== v0;                 //BYTECODE_POS: 180 
 //return v-1;                     //BYTECODE_POS: 181 
}