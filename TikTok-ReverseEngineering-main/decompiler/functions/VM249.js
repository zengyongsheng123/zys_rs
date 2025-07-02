function VM249(arg0) {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[3];           //BYTECODE_POS: 2 depth
 v0 = v1();                        //BYTECODE_POS: 5 // context 0 could be custom vm or native func
 // if (!v0) skip to 10            //BYTECODE_POS: 7 
 v0 = undefined                    //BYTECODE_POS: 9 
 //return v0;                      //BYTECODE_POS: 10 
 v0 = 1;                           //BYTECODE_POS: 11 
 v1 = 6;                           //BYTECODE_POS: 13 
 v0 <<= v1                         //BYTECODE_POS: 15 
 executionStack[3] = v0;           //BYTECODE_POS: 16 // depth = 0
 v0 = arguments;                   //BYTECODE_POS: 19 depth
 v0 = v0.envcode;                  //BYTECODE_POS: 22 
 v1 = executionStack[3];           //BYTECODE_POS: 24 depth
 v2 = 0;                           //BYTECODE_POS: 27 
 v1 = v1 > v2                      //BYTECODE_POS: 29 
 v0 &= v1;                         //BYTECODE_POS: 30 
 // if (!v0) skip to 40            //BYTECODE_POS: 31 
 v0 = executionStack[2];           //BYTECODE_POS: 33 depth
 v1 = true                         //BYTECODE_POS: 36 
 v0.debugger = v0;                 //BYTECODE_POS: 37 
 v0 = undefined                    //BYTECODE_POS: 39 
 //return v0;                      //BYTECODE_POS: 40 
 v0 = Image                        //BYTECODE_POS: 41 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = new v0()                     //BYTECODE_POS: 43 
 executionStack[4] = v0;           //BYTECODE_POS: 45 // depth = 0
 v0 = Object                       //BYTECODE_POS: 48 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 50 
 v1 = v1.defineProperty;           //BYTECODE_POS: 51 
 v2 = executionStack[4];           //BYTECODE_POS: 53 depth
 v3 = "id"                         //BYTECODE_POS: 56 
 v4 = {};                          //BYTECODE_POS: 58 
 v5 = functionVM250;               //BYTECODE_POS: 59 
 v6 = v5                           //BYTECODE_POS: 61 
 executionStack[5] = v6;           //BYTECODE_POS: 62 // depth = 0
 v4.get = v5;                      //BYTECODE_POS: 65 
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 67 // context 0 could be custom vm or native func
 v0 = console                      //BYTECODE_POS: 70 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 72 
 v1 = v1.info;                     //BYTECODE_POS: 73 
 v2 = "%c"                         //BYTECODE_POS: 75 
 v3 = executionStack[4];           //BYTECODE_POS: 77 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 80 // context 0 could be custom vm or native func
 v0 = window                       //BYTECODE_POS: 83 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 // if (!v0) skip 4 to 90          //BYTECODE_POS: 85 
 v1 = window                       //BYTECODE_POS: 87 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.console;                  //BYTECODE_POS: 89 
 // if (!v1) skip 6 to 98          //BYTECODE_POS: 91 
 v2 = window                       //BYTECODE_POS: 93 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.console;                  //BYTECODE_POS: 95 
 v2 = v2.firebug;                  //BYTECODE_POS: 97 
 // if (!v2) skip to 127           //BYTECODE_POS: 99 
 v2 = executionStack[2];           //BYTECODE_POS: 101 depth
 v3 = true                         //BYTECODE_POS: 104 
 v2.debugger = v2;                 //BYTECODE_POS: 105 
 v2 = arguments;                   //BYTECODE_POS: 107 depth
 v2 = v2.envcode;                  //BYTECODE_POS: 110 
 v3 = executionStack[2];           //BYTECODE_POS: 112 depth
 v3 = v3.debugger;                 //BYTECODE_POS: 115 
 v4 = 6;                           //BYTECODE_POS: 117 
 v3 <<= v4                         //BYTECODE_POS: 119 
 v2 |= v3;                         //BYTECODE_POS: 120 
 v3 = arguments;                   //BYTECODE_POS: 121 depth
 v4 = "envcode"                    //BYTECODE_POS: 124 
 v3[v4] = v2                       //BYTECODE_POS: 126 
 v2 = undefined                    //BYTECODE_POS: 128 
 v3 = executionStack[0];           //BYTECODE_POS: 129 depth
 v2 = v3();                        //BYTECODE_POS: 132 // context 2 could be custom vm or native func
 // if (!v2) skip to 194           //BYTECODE_POS: 134 
 v2 = window                       //BYTECODE_POS: 136 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 // if (!v2) skip 26 to 165        //BYTECODE_POS: 138 
 v3 = window                       //BYTECODE_POS: 140 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3.outerWidth;               //BYTECODE_POS: 142 
 v4 = window                       //BYTECODE_POS: 144 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v4.innerWidth;               //BYTECODE_POS: 146 
 v3 -= v4;                         //BYTECODE_POS: 148 
 v4 = 100;                         //BYTECODE_POS: 149 
 v3 = v3 > v4                      //BYTECODE_POS: 151 
 // if (v3) skip 12                //BYTECODE_POS: 152 
 v4 = window                       //BYTECODE_POS: 154 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v4.outerHeight;              //BYTECODE_POS: 156 
 v5 = window                       //BYTECODE_POS: 158 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v5.innerHeight;              //BYTECODE_POS: 160 
 v4 -= v5;                         //BYTECODE_POS: 162 
 v5 = 100;                         //BYTECODE_POS: 163 
 v4 = v4 > v5                      //BYTECODE_POS: 165 
 // if (!v4) skip to 194           //BYTECODE_POS: 166 
 v4 = executionStack[2];           //BYTECODE_POS: 168 depth
 v5 = true                         //BYTECODE_POS: 171 
 v4.debugger = v4;                 //BYTECODE_POS: 172 
 v4 = arguments;                   //BYTECODE_POS: 174 depth
 v4 = v4.envcode;                  //BYTECODE_POS: 177 
 v5 = executionStack[2];           //BYTECODE_POS: 179 depth
 v5 = v5.debugger;                 //BYTECODE_POS: 182 
 v6 = 6;                           //BYTECODE_POS: 184 
 v5 <<= v6                         //BYTECODE_POS: 186 
 v4 |= v5;                         //BYTECODE_POS: 187 
 v5 = arguments;                   //BYTECODE_POS: 188 depth
 v6 = "envcode"                    //BYTECODE_POS: 191 
 v5[v6] = v4                       //BYTECODE_POS: 193 
 v4 = undefined                    //BYTECODE_POS: 195 
 //return v4;                      //BYTECODE_POS: 196 
}