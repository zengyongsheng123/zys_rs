function VM200() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = {};                          //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 2 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 5 depth
 v1 = undefined                    //BYTECODE_POS: 8 
 v2 = executionStack[11];          //BYTECODE_POS: 9 depth
 v1 = v2();                        //BYTECODE_POS: 12 // context 1 could be custom vm or native func
 v0.navigator = v0;                //BYTECODE_POS: 14 
 v0 = executionStack[2];           //BYTECODE_POS: 16 depth
 v1 = undefined                    //BYTECODE_POS: 19 
 v2 = executionStack[12];          //BYTECODE_POS: 20 depth
 v1 = v2();                        //BYTECODE_POS: 23 // context 1 could be custom vm or native func
 v0.window = v0;                   //BYTECODE_POS: 25 
 v0 = executionStack[2];           //BYTECODE_POS: 27 depth
 v1 = undefined                    //BYTECODE_POS: 30 
 v2 = executionStack[13];          //BYTECODE_POS: 31 depth
 v1 = v2();                        //BYTECODE_POS: 34 // context 1 could be custom vm or native func
 v0.document = v0;                 //BYTECODE_POS: 36 
 v0 = undefined                    //BYTECODE_POS: 38 
 v1 = executionStack[8];           //BYTECODE_POS: 39 depth
 v2 = true                         //BYTECODE_POS: 42 
 v0 = v1(v2);                      //BYTECODE_POS: 43 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 45 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 48 depth
 v0 = v0.data;                     //BYTECODE_POS: 51 
 executionStack[4] = v0;           //BYTECODE_POS: 53 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 56 depth
 v0 = v0.webglData;                //BYTECODE_POS: 59 
 executionStack[5] = v0;           //BYTECODE_POS: 61 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 64 depth
 v0 = v0.gpu;                      //BYTECODE_POS: 67 
 executionStack[6] = v0;           //BYTECODE_POS: 69 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 72 depth
 v1 = executionStack[5];           //BYTECODE_POS: 75 depth
 v0.webgl = v0;                    //BYTECODE_POS: 78 
 v0 = executionStack[2];           //BYTECODE_POS: 80 depth
 v1 = executionStack[6];           //BYTECODE_POS: 83 depth
 v0.gpu = v0;                      //BYTECODE_POS: 86 
 v0 = executionStack[2];           //BYTECODE_POS: 88 depth
 v1 = undefined                    //BYTECODE_POS: 91 
 v2 = arguments;                   //BYTECODE_POS: 92 depth
 v3 = executionStack[2];           //BYTECODE_POS: 95 depth
 v4 = executionStack[3];           //BYTECODE_POS: 98 depth
 v4 = v4.slardarErrs;              //BYTECODE_POS: 101 
 v1 = v2(v3,v4);                   //BYTECODE_POS: 103 // context 1 could be custom vm or native func
 v0.plugins = v0;                  //BYTECODE_POS: 105 
 v0 = executionStack[2];           //BYTECODE_POS: 107 depth
 v1 = executionStack[2];           //BYTECODE_POS: 110 depth
 v0.SECINFO = v0;                  //BYTECODE_POS: 113 
 v0 = executionStack[2];           //BYTECODE_POS: 115 depth
 //return v0;                      //BYTECODE_POS: 118 
}