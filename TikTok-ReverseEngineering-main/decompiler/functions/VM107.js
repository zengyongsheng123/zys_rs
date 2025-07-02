function VM107(arg0) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = null                         //BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 2 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 5 
 executionStack[4] = v0;           //BYTECODE_POS: 7 // depth = 0
 v0 = "X-MS-STUB"                  //BYTECODE_POS: 10 
 executionStack[5] = v0;           //BYTECODE_POS: 12 // depth = 0
 v0 = "X-MS-PAYLOAD"               //BYTECODE_POS: 15 
 executionStack[6] = v0;           //BYTECODE_POS: 17 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 20 depth
 v1 = executionStack[5];           //BYTECODE_POS: 23 depth
 v0 = v0[v1]                       //BYTECODE_POS: 26 
 // if (!v0) skip to 40            //BYTECODE_POS: 27 
 v0 = executionStack[2];           //BYTECODE_POS: 29 depth
 v1 = executionStack[5];           //BYTECODE_POS: 32 depth
 v0 = v0[v1]                       //BYTECODE_POS: 35 
 executionStack[3] = v0;           //BYTECODE_POS: 36 // depth = 0
 // go foward to 72                //BYTECODE_POS: 39 
 v0 = executionStack[2];           //BYTECODE_POS: 41 depth
 v1 = executionStack[6];           //BYTECODE_POS: 44 depth
 v0 = v0[v1]                       //BYTECODE_POS: 47 
 // if (!v0) skip to 67            //BYTECODE_POS: 48 
 v0 = undefined                    //BYTECODE_POS: 50 
 v1 = executionStack[2];           //BYTECODE_POS: 51 depth
 v2 = executionStack[2];           //BYTECODE_POS: 54 depth
 v3 = executionStack[6];           //BYTECODE_POS: 57 depth
 v2 = v2[v3]                       //BYTECODE_POS: 60 
 v0 = v1(v2);                      //BYTECODE_POS: 61 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 63 // depth = 0
 // go foward to 72                //BYTECODE_POS: 66 
 v0 = "00000000000000000000000000000000"//BYTECODE_POS: 68 
 executionStack[3] = v0;           //BYTECODE_POS: 70 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 73 
 v1 = executionStack[0];           //BYTECODE_POS: 74 depth
 v2 = executionStack[4];           //BYTECODE_POS: 77 depth
 v3 = null                         //BYTECODE_POS: 80 
 v4 = executionStack[3];           //BYTECODE_POS: 81 depth
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 84 // context 0 could be custom vm or native func
 executionStack[7] = v0;           //BYTECODE_POS: 86 // depth = 0
 v0 = executionStack[7];           //BYTECODE_POS: 89 depth
 //return v0;                      //BYTECODE_POS: 92 
}