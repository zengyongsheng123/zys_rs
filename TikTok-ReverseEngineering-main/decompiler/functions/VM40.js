function VM40(arg0) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[22];          //BYTECODE_POS: 2 depth
 v2 = executionStack[2];           //BYTECODE_POS: 5 depth
 v0 = v1(v2);                      //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 10 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 13 
 v1 = executionStack[8];           //BYTECODE_POS: 14 depth
 v2 = executionStack[3];           //BYTECODE_POS: 17 depth
 v3 = executionStack[9];           //BYTECODE_POS: 20 depth
 v3 = v3.json;                     //BYTECODE_POS: 23 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 25 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 27 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 30 
 v1 = executionStack[10];          //BYTECODE_POS: 31 depth
 v2 = executionStack[11];          //BYTECODE_POS: 34 depth
 v2 = v2.WEB_DEVICE_INFO;          //BYTECODE_POS: 37 
 v3 = executionStack[4];           //BYTECODE_POS: 39 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 42 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 44 // depth = 0
 v0 = executionStack[10];          //BYTECODE_POS: 47 depth
 v0 = v0.regionConf;               //BYTECODE_POS: 50 
 v0 = v0.reportUrls;               //BYTECODE_POS: 52 
 executionStack[6] = v0;           //BYTECODE_POS: 54 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 57 depth
 // if (!v0) skip to 74            //BYTECODE_POS: 60 
 v0 = executionStack[3];           //BYTECODE_POS: 62 depth
 v1 = v0                           //BYTECODE_POS: 65 
 v1 = v1.then;                     //BYTECODE_POS: 66 
 v2 = functionVM41;                //BYTECODE_POS: 68 
 v0 = v1(v2);                      //BYTECODE_POS: 70 // context 0 could be custom vm or native func
 // go foward to 89                //BYTECODE_POS: 73 
 v0 = undefined                    //BYTECODE_POS: 75 
 v1 = executionStack[7];           //BYTECODE_POS: 76 depth
 v2 = executionStack[6];           //BYTECODE_POS: 79 depth
 v3 = executionStack[5];           //BYTECODE_POS: 82 depth
 v4 = {};                          //BYTECODE_POS: 85 
 v5 = true                         //BYTECODE_POS: 86 
 v0 = v1(v2,v3,v4,v5);             //BYTECODE_POS: 87 // context 0 could be custom vm or native func
 v0 = true                         //BYTECODE_POS: 90 
 executionStack[12] = v0;          //BYTECODE_POS: 91 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 94 
 //return v0;                      //BYTECODE_POS: 95 
}