function VM66(arg0, arg1) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = ""                           //BYTECODE_POS: 1 
 executionStack[4] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = ""                           //BYTECODE_POS: 6 
 executionStack[5] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = ""                           //BYTECODE_POS: 11 
 executionStack[6] = v0;           //BYTECODE_POS: 13 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 16 
 executionStack[7] = v0;           //BYTECODE_POS: 18 // depth = 0
 v0 = executionStack[7];           //BYTECODE_POS: 21 depth
 v1 = executionStack[3];           //BYTECODE_POS: 24 depth
 v1 = v1.length;                   //BYTECODE_POS: 27 
 v0 = v0 < v1;                     //BYTECODE_POS: 29 
 // if (!v0) skip to 93            //BYTECODE_POS: 30 
 v0 = executionStack[7];           //BYTECODE_POS: 32 depth
 v1 = 2;                           //BYTECODE_POS: 35 
 v0 %= v1                          //BYTECODE_POS: 37 
 v1 = 0;                           //BYTECODE_POS: 38 
 v0 = v0 === v1                    //BYTECODE_POS: 40 
 // if (!v0) skip to 54            //BYTECODE_POS: 41 
 v0 = executionStack[3];           //BYTECODE_POS: 43 depth
 v1 = executionStack[7];           //BYTECODE_POS: 46 depth
 v0 = v0[v1]                       //BYTECODE_POS: 49 
 executionStack[5] = v0;           //BYTECODE_POS: 50 // depth = 0
 // go foward to 86                //BYTECODE_POS: 53 
 v0 = executionStack[3];           //BYTECODE_POS: 55 depth
 v1 = executionStack[7];           //BYTECODE_POS: 58 depth
 v0 = v0[v1]                       //BYTECODE_POS: 61 
 executionStack[6] = v0;           //BYTECODE_POS: 62 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 65 depth
 v1 = "&"                          //BYTECODE_POS: 68 
 v2 = executionStack[5];           //BYTECODE_POS: 70 depth
 v1 += v2                          //BYTECODE_POS: 73 
 v2 = "="                          //BYTECODE_POS: 74 
 v1 += v2                          //BYTECODE_POS: 76 
 v2 = executionStack[6];           //BYTECODE_POS: 77 depth
 v1 += v2                          //BYTECODE_POS: 80 
 v0 += v1                          //BYTECODE_POS: 81 
 //get depth of 0 from executionStack//BYTECODE_POS: 82 
 v1 = executionStack;              //BYTECODE_POS: 82 
 v2 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 85 
 //get depth of 0 from executionStack//BYTECODE_POS: 87 
 v0 = executionStack;              //BYTECODE_POS: 87 
 v1 = 7                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 90 // replace the executionStack var with an index incremented
 // go back to 20                  //BYTECODE_POS: 92 
 v0 = executionStack[2];           //BYTECODE_POS: 94 depth
 executionStack[8] = v0;           //BYTECODE_POS: 97 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 100 depth
 v0 = v0.length;                   //BYTECODE_POS: 103 
 v1 = 0;                           //BYTECODE_POS: 105 
 v0 = v0 > v1                      //BYTECODE_POS: 107 
 // if (!v0) skip to 155           //BYTECODE_POS: 108 
 v0 = executionStack[2];           //BYTECODE_POS: 110 depth
 v1 = v0                           //BYTECODE_POS: 113 
 v1 = v1.indexOf;                  //BYTECODE_POS: 114 
 v2 = "?"                          //BYTECODE_POS: 116 
 v0 = v1(v2);                      //BYTECODE_POS: 118 // context 0 could be custom vm or native func
 v1 = 1;                           //BYTECODE_POS: 120 
 v1 = -v1                          //BYTECODE_POS: 122 
 v0 = v0 === v1                    //BYTECODE_POS: 123 
 // if (!v0) skip to 129           //BYTECODE_POS: 124 
 v0 = "?"                          //BYTECODE_POS: 126 
 // go foward to 131               //BYTECODE_POS: 128 
 v1 = "&"                          //BYTECODE_POS: 130 
 executionStack[9] = v1;           //BYTECODE_POS: 132 // depth = 0
 v1 = executionStack[2];           //BYTECODE_POS: 135 depth
 v2 = executionStack[9];           //BYTECODE_POS: 138 depth
 v1 += v2                          //BYTECODE_POS: 141 
 v2 = executionStack[4];           //BYTECODE_POS: 142 depth
 v3 = v2                           //BYTECODE_POS: 145 
 v3 = v3.substr;                   //BYTECODE_POS: 146 
 v4 = 1;                           //BYTECODE_POS: 148 
 v2 = v3(v4);                      //BYTECODE_POS: 150 // context 2 could be custom vm or native func
 v1 += v2                          //BYTECODE_POS: 152 
 executionStack[8] = v1;           //BYTECODE_POS: 153 // depth = 0
 v1 = executionStack[8];           //BYTECODE_POS: 156 depth
 //return v1;                      //BYTECODE_POS: 159 
}