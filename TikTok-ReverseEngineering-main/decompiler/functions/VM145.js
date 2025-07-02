function VM145() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = arguments;                   //BYTECODE_POS: 1 depth
 v0 = v0.length;                   //BYTECODE_POS: 4 
 v1 = 0;                           //BYTECODE_POS: 6 
 v0 = v0 > v1                      //BYTECODE_POS: 8 
 // if (!v0) skip 7 to 17          //BYTECODE_POS: 9 
 v1 = arguments;                   //BYTECODE_POS: 11 depth
 v1 = v1[0];                       //BYTECODE_POS: 14 
 v2 = undefined                    //BYTECODE_POS: 16 
 v1 = v1 !== v2;                   //BYTECODE_POS: 17 
 // if (!v1) skip to 26            //BYTECODE_POS: 18 
 v1 = arguments;                   //BYTECODE_POS: 20 depth
 v1 = v1[0];                       //BYTECODE_POS: 23 
 // go foward to 27                //BYTECODE_POS: 25 
 v2 = false;                       //BYTECODE_POS: 27 
 executionStack[2] = v2;           //BYTECODE_POS: 28 // depth = 0
 v2 = undefined                    //BYTECODE_POS: 31 
 v3 = executionStack[5];           //BYTECODE_POS: 32 depth
 v4 = executionStack[2];           //BYTECODE_POS: 35 depth
 v2 = v3(v4);                      //BYTECODE_POS: 38 // context 2 could be custom vm or native func
 executionStack[3] = v2;           //BYTECODE_POS: 40 // depth = 0
 v2 = executionStack[3];           //BYTECODE_POS: 43 depth
 v2 = v2.data;                     //BYTECODE_POS: 46 
 v2 = v2.webglData;                //BYTECODE_POS: 48 
 executionStack[4] = v2;           //BYTECODE_POS: 50 // depth = 0
 v2 = {};                          //BYTECODE_POS: 53 
 v3 = executionStack[4];           //BYTECODE_POS: 54 depth
 v2.data = v3;                     //BYTECODE_POS: 57 
 //return v2;                      //BYTECODE_POS: 59 
}