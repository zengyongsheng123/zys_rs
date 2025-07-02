function VM203(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = arguments;                   //BYTECODE_POS: 1 depth
 v0 = v0.regionConf;               //BYTECODE_POS: 4 
 v0 = v0.host;                     //BYTECODE_POS: 6 
 v1 = "/web/ping"                  //BYTECODE_POS: 8 
 v0 += v1                          //BYTECODE_POS: 10 
 executionStack[3] = v0;           //BYTECODE_POS: 11 // depth = 0
 v0 = {};                          //BYTECODE_POS: 14 
 v1 = arguments;                   //BYTECODE_POS: 15 depth
 v1 = v1.aid;                      //BYTECODE_POS: 18 
 v0.aid = v1;                      //BYTECODE_POS: 20 
 v1 = arguments;                   //BYTECODE_POS: 22 depth
 v1 = v1.region;                   //BYTECODE_POS: 25 
 v0.region = v1;                   //BYTECODE_POS: 27 
 v1 = window                       //BYTECODE_POS: 29 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.location;                 //BYTECODE_POS: 31 
 v1 = v1.host;                     //BYTECODE_POS: 33 
 v2 = window                       //BYTECODE_POS: 35 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.location;                 //BYTECODE_POS: 37 
 v2 = v2.pathname;                 //BYTECODE_POS: 39 
 v1 += v2                          //BYTECODE_POS: 41 
 v0.location = v1;                 //BYTECODE_POS: 42 
 executionStack[4] = v0;           //BYTECODE_POS: 44 // depth = 0
 v0 = URL                          //BYTECODE_POS: 47 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = executionStack[2];           //BYTECODE_POS: 49 depth
 v0 = new v0()                     //BYTECODE_POS: 52 
 executionStack[5] = v0;           //BYTECODE_POS: 54 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 57 depth
 v1 = "5.0.2"                      //BYTECODE_POS: 60 
 v0.coreVersion = v0;              //BYTECODE_POS: 62 
 v0 = executionStack[4];           //BYTECODE_POS: 64 depth
 v1 = executionStack[5];           //BYTECODE_POS: 67 depth
 v1 = v1.pathname;                 //BYTECODE_POS: 70 
 v0.jsLinkPath = v0;               //BYTECODE_POS: 72 
 // go foward to 80                //BYTECODE_POS: 74 
 executionStack[8] = v-1;          //BYTECODE_POS: 76 // depth = 0
 v-1 = undefined                   //BYTECODE_POS: 79 
 //return v-1;                     //BYTECODE_POS: 80 
 v-1 = executionStack[3];          //BYTECODE_POS: 81 depth
 v0 = "?eq="                       //BYTECODE_POS: 84 
 v-1 += v0                         //BYTECODE_POS: 86 
 v0 = undefined                    //BYTECODE_POS: 87 
 v1 = executionStack[2];           //BYTECODE_POS: 88 depth
 v2 = executionStack[4];           //BYTECODE_POS: 91 depth
 v0 = v1(v2);                      //BYTECODE_POS: 94 // context 0 could be custom vm or native func
 v-1 += v0                         //BYTECODE_POS: 96 
 executionStack[6] = v-1;          //BYTECODE_POS: 97 // depth = 0
 v-1 = XMLHttpRequest              //BYTECODE_POS: 100 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v-1 = new v-1()                   //BYTECODE_POS: 102 
 executionStack[7] = v-1;          //BYTECODE_POS: 104 // depth = 0
 v-1 = executionStack[7];          //BYTECODE_POS: 107 depth
 v0 = true                         //BYTECODE_POS: 110 
 v-1.withCredentials = v-1;        //BYTECODE_POS: 111 
 v-1 = executionStack[7];          //BYTECODE_POS: 113 depth
 v0 = v-1                          //BYTECODE_POS: 116 
 v0 = v0.open;                     //BYTECODE_POS: 117 
 v1 = "GET"                        //BYTECODE_POS: 119 
 v2 = executionStack[6];           //BYTECODE_POS: 121 depth
 v3 = true                         //BYTECODE_POS: 124 
 v-1 = v0(v1,v2,v3);               //BYTECODE_POS: 125 // context -1 could be custom vm or native func
 v-1 = executionStack[7];          //BYTECODE_POS: 128 depth
 v0 = v-1                          //BYTECODE_POS: 131 
 v0 = v0.send;                     //BYTECODE_POS: 132 
 v-1 = v0();                       //BYTECODE_POS: 134 // context -1 could be custom vm or native func
 v-1 = undefined                   //BYTECODE_POS: 137 
 //return v-1;                     //BYTECODE_POS: 138 
}