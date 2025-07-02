function VM210() {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = arguments;                   //BYTECODE_POS: 1 depth
 v0 = v0.regionConf;               //BYTECODE_POS: 4 
 v0 = v0.host;                     //BYTECODE_POS: 6 
 v1 = "/web/resource"              //BYTECODE_POS: 8 
 v0 += v1                          //BYTECODE_POS: 10 
 executionStack[2] = v0;           //BYTECODE_POS: 11 // depth = 0
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
 executionStack[3] = v0;           //BYTECODE_POS: 44 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 47 depth
 v1 = "?eq="                       //BYTECODE_POS: 50 
 v0 += v1                          //BYTECODE_POS: 52 
 v1 = undefined                    //BYTECODE_POS: 53 
 v2 = executionStack[2];           //BYTECODE_POS: 54 depth
 v3 = executionStack[3];           //BYTECODE_POS: 57 depth
 v1 = v2(v3);                      //BYTECODE_POS: 60 // context 1 could be custom vm or native func
 v0 += v1                          //BYTECODE_POS: 62 
 executionStack[4] = v0;           //BYTECODE_POS: 63 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 66 
 v1 = executionStack[4];           //BYTECODE_POS: 67 depth
 v2 = executionStack[4];           //BYTECODE_POS: 70 depth
 v3 = functionVM211;               //BYTECODE_POS: 73 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 75 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 78 
 //return v0;                      //BYTECODE_POS: 79 
}