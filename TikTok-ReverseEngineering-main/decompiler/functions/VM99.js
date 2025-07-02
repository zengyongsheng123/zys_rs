function VM99(arg0, arg1, arg2) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 executionStack[5] = v0;           //BYTECODE_POS: 4 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 7 
 v1 = executionStack[9];           //BYTECODE_POS: 8 depth
 v2 = executionStack[2];           //BYTECODE_POS: 11 depth
 v0 = v1(v2);                      //BYTECODE_POS: 14 // context 0 could be custom vm or native func
 // if (!v0) skip to 128           //BYTECODE_POS: 16 
 v0 = executionStack[4];           //BYTECODE_POS: 18 depth
 v0 = v0.__ac_testid;              //BYTECODE_POS: 21 
 executionStack[6] = v0;           //BYTECODE_POS: 23 // depth = 0
 v0 = executionStack[6];           //BYTECODE_POS: 26 depth
 v1 = ""                           //BYTECODE_POS: 29 
 v0 = v0 == v1;                    //BYTECODE_POS: 31 
 // if (!v0) skip to 44            //BYTECODE_POS: 32 
 v0 = "msToken"                    //BYTECODE_POS: 34 
 v1 = executionStack[4];           //BYTECODE_POS: 36 depth
 v1 = v1.msToken;                  //BYTECODE_POS: 39 
 v0 = [v0,v1]                      //BYTECODE_POS: 41 
 // go foward to 58                //BYTECODE_POS: 43 
 v1 = "msToken"                    //BYTECODE_POS: 45 
 v2 = executionStack[4];           //BYTECODE_POS: 47 depth
 v2 = v2.msToken;                  //BYTECODE_POS: 50 
 v3 = "__ac_testid"                //BYTECODE_POS: 52 
 v4 = executionStack[6];           //BYTECODE_POS: 54 depth
 v1 = [v1,v2,v3,v4]                //BYTECODE_POS: 57 
 executionStack[7] = v1;           //BYTECODE_POS: 59 // depth = 0
 v1 = undefined                    //BYTECODE_POS: 62 
 v2 = executionStack[7];           //BYTECODE_POS: 63 depth
 v3 = undefined                    //BYTECODE_POS: 66 
 v4 = executionStack[6];           //BYTECODE_POS: 67 depth
 v5 = executionStack[2];           //BYTECODE_POS: 70 depth
 v3 = v4(v5);                      //BYTECODE_POS: 73 // context 3 could be custom vm or native func
 v4 = executionStack[7];           //BYTECODE_POS: 75 depth
 v1 = v2(v3,v4);                   //BYTECODE_POS: 78 // context 1 could be custom vm or native func
 executionStack[8] = v1;           //BYTECODE_POS: 80 // depth = 0
 v1 = undefined                    //BYTECODE_POS: 83 
 v2 = executionStack[8];           //BYTECODE_POS: 84 depth
 v3 = executionStack[8];           //BYTECODE_POS: 87 depth
 v1 = v2(v3);                      //BYTECODE_POS: 90 // context 1 could be custom vm or native func
 executionStack[9] = v1;           //BYTECODE_POS: 92 // depth = 0
 v1 = undefined                    //BYTECODE_POS: 95 
 v2 = executionStack[7];           //BYTECODE_POS: 96 depth
 v3 = executionStack[9];           //BYTECODE_POS: 99 depth
 v4 = ""                           //BYTECODE_POS: 102 
 v1 = v2(v3,v4);                   //BYTECODE_POS: 104 // context 1 could be custom vm or native func
 executionStack[10] = v1;          //BYTECODE_POS: 106 // depth = 0
 v1 = undefined                    //BYTECODE_POS: 109 
 v2 = executionStack[7];           //BYTECODE_POS: 110 depth
 v3 = executionStack[8];           //BYTECODE_POS: 113 depth
 v4 = executionStack[2];           //BYTECODE_POS: 116 depth
 v5 = executionStack[10];          //BYTECODE_POS: 119 depth
 v4 = [v4,v5]                      //BYTECODE_POS: 122 
 v1 = v2(v3,v4);                   //BYTECODE_POS: 124 // context 1 could be custom vm or native func
 executionStack[5] = v1;           //BYTECODE_POS: 126 // depth = 0
 v1 = undefined                    //BYTECODE_POS: 129 
 v2 = executionStack[3];           //BYTECODE_POS: 130 depth
 v3 = executionStack[5];           //BYTECODE_POS: 133 depth
 v4 = executionStack[3];           //BYTECODE_POS: 136 depth
 v5 = executionStack[4];           //BYTECODE_POS: 139 depth
 v1 = v2(v3,v4,v5);                //BYTECODE_POS: 142 // context 1 could be custom vm or native func
 //return v1;                      //BYTECODE_POS: 144 
}