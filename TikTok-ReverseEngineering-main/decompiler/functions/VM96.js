function VM96(arg0, arg1, arg2) {
 var v0,v1,v2,v3,v4,v5,v6; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[4];           //BYTECODE_POS: 1 depth
 v1 = null                         //BYTECODE_POS: 4 
 v0 = v0 === v1                    //BYTECODE_POS: 5 
 // if (v0) skip 6                 //BYTECODE_POS: 6 
 v1 = executionStack[4];           //BYTECODE_POS: 8 depth
 v2 = ""                           //BYTECODE_POS: 11 
 v1 = v1 === v2                    //BYTECODE_POS: 13 
 // if (!v1) skip to 19            //BYTECODE_POS: 14 
 v1 = executionStack[2];           //BYTECODE_POS: 16 depth
 //return v1;                      //BYTECODE_POS: 19 
 v1 = executionStack[4];           //BYTECODE_POS: 20 depth
 v2 = v1                           //BYTECODE_POS: 23 
 v2 = v2.toString;                 //BYTECODE_POS: 24 
 v1 = v2();                        //BYTECODE_POS: 26 // context 1 could be custom vm or native func
 executionStack[4] = v1;           //BYTECODE_POS: 28 // depth = 0
 v1 = executionStack[3];           //BYTECODE_POS: 31 depth
 v2 = "application/x-www-form-urlencoded"//BYTECODE_POS: 34 
 v1 = v1 === v2                    //BYTECODE_POS: 36 
 // if (!v1) skip to 140           //BYTECODE_POS: 37 
 v1 = executionStack[2];           //BYTECODE_POS: 39 depth
 v2 = true                         //BYTECODE_POS: 42 
 v1.bodyVal2str = v1;              //BYTECODE_POS: 43 
 v1 = executionStack[4];           //BYTECODE_POS: 45 depth
 v2 = v1                           //BYTECODE_POS: 48 
 v2 = v2.split;                    //BYTECODE_POS: 49 
 v3 = "&"                          //BYTECODE_POS: 51 
 v1 = v2(v3);                      //BYTECODE_POS: 53 // context 1 could be custom vm or native func
 executionStack[5] = v1;           //BYTECODE_POS: 55 // depth = 0
 v1 = {};                          //BYTECODE_POS: 58 
 executionStack[6] = v1;           //BYTECODE_POS: 59 // depth = 0
 v1 = executionStack[5];           //BYTECODE_POS: 62 depth
 // if (!v1) skip to 130           //BYTECODE_POS: 65 
 v1 = 0;                           //BYTECODE_POS: 67 
 executionStack[7] = v1;           //BYTECODE_POS: 69 // depth = 0
 v1 = executionStack[7];           //BYTECODE_POS: 72 depth
 v2 = executionStack[5];           //BYTECODE_POS: 75 depth
 v2 = v2.length;                   //BYTECODE_POS: 78 
 v1 = v1 < v2;                     //BYTECODE_POS: 80 
 // if (!v1) skip to 130           //BYTECODE_POS: 81 
 v1 = executionStack[6];           //BYTECODE_POS: 83 depth
 v2 = executionStack[5];           //BYTECODE_POS: 86 depth
 v3 = executionStack[7];           //BYTECODE_POS: 89 depth
 v2 = v2[v3]                       //BYTECODE_POS: 92 
 v3 = v2                           //BYTECODE_POS: 93 
 v3 = v3.split;                    //BYTECODE_POS: 94 
 v4 = "="                          //BYTECODE_POS: 96 
 v2 = v3(v4);                      //BYTECODE_POS: 98 // context 2 could be custom vm or native func
 v2 = v2[0];                       //BYTECODE_POS: 100 
 v3 = undefined                    //BYTECODE_POS: 102 
 v4 = decodeURIComponent           //BYTECODE_POS: 103 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = executionStack[5];           //BYTECODE_POS: 105 depth
 v6 = executionStack[7];           //BYTECODE_POS: 108 depth
 v5 = v5[v6]                       //BYTECODE_POS: 111 
 v6 = v5                           //BYTECODE_POS: 112 
 v6 = v6.split;                    //BYTECODE_POS: 113 
 v7 = "="                          //BYTECODE_POS: 115 
 v5 = v6(v7);                      //BYTECODE_POS: 117 // context 5 could be custom vm or native func
 v5 = v5[1];                       //BYTECODE_POS: 119 
 v3 = v4(v5);                      //BYTECODE_POS: 121 // context 3 could be custom vm or native func
 v1[v2] = v3;                      //BYTECODE_POS: 123 
 //get depth of 0 from executionStack//BYTECODE_POS: 124 
 v1 = executionStack;              //BYTECODE_POS: 124 
 v2 = 7                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1 = v1[v2]++                     //BYTECODE_POS: 127 // replace the executionStack var with an index incremented
 // go back to 71                  //BYTECODE_POS: 129 
 v1 = executionStack[2];           //BYTECODE_POS: 131 depth
 v2 = executionStack[6];           //BYTECODE_POS: 134 depth
 v1.body = v1;                     //BYTECODE_POS: 137 
 // go foward to 155               //BYTECODE_POS: 139 
 v1 = executionStack[2];           //BYTECODE_POS: 141 depth
 v2 = JSON                         //BYTECODE_POS: 144 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 146 
 v3 = v3.parse;                    //BYTECODE_POS: 147 
 v4 = executionStack[4];           //BYTECODE_POS: 149 depth
 v2 = v3(v4);                      //BYTECODE_POS: 152 // context 2 could be custom vm or native func
 v1.body = v1;                     //BYTECODE_POS: 154 
 v1 = executionStack[2];           //BYTECODE_POS: 156 depth
 //return v1;                      //BYTECODE_POS: 159 
}