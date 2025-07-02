function VM134(arg0, arg1) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = null                         //BYTECODE_POS: 4 
 v0 = v0 == v1;                    //BYTECODE_POS: 5 
 // if (v0) skip 5                 //BYTECODE_POS: 6 
 v1 = executionStack[3];           //BYTECODE_POS: 8 depth
 v2 = null                         //BYTECODE_POS: 11 
 v1 = v1 == v2;                    //BYTECODE_POS: 12 
 // if (!v1) skip to 16            //BYTECODE_POS: 13 
 v1 = false;                       //BYTECODE_POS: 15 
 //return v1;                      //BYTECODE_POS: 16 
 v1 = undefined                    //BYTECODE_POS: 17 
 v2 = executionStack[0];           //BYTECODE_POS: 18 depth
 v3 = executionStack[2];           //BYTECODE_POS: 21 depth
 v1 = v2(v3);                      //BYTECODE_POS: 24 // context 1 could be custom vm or native func
 v2 = "object"                     //BYTECODE_POS: 26 
 v1 = v1 !== v2;                   //BYTECODE_POS: 28 
 // if (v1) skip 12                //BYTECODE_POS: 29 
 v2 = undefined                    //BYTECODE_POS: 31 
 v3 = executionStack[0];           //BYTECODE_POS: 32 depth
 v4 = executionStack[3];           //BYTECODE_POS: 35 depth
 v2 = v3(v4);                      //BYTECODE_POS: 38 // context 2 could be custom vm or native func
 v3 = "object"                     //BYTECODE_POS: 40 
 v2 = v2 !== v3;                   //BYTECODE_POS: 42 
 // if (!v2) skip to 46            //BYTECODE_POS: 43 
 v2 = false;                       //BYTECODE_POS: 45 
 //return v2;                      //BYTECODE_POS: 46 
 v2 = executionStack[2];           //BYTECODE_POS: 47 depth
 v2 = v2.data;                     //BYTECODE_POS: 50 
 v2 = v2.length;                   //BYTECODE_POS: 52 
 v3 = executionStack[3];           //BYTECODE_POS: 54 depth
 v3 = v3.data;                     //BYTECODE_POS: 57 
 v3 = v3.length;                   //BYTECODE_POS: 59 
 v2 = v2 !== v3;                   //BYTECODE_POS: 61 
 // if (v2) skip 11                //BYTECODE_POS: 62 
 v3 = executionStack[2];           //BYTECODE_POS: 64 depth
 v3 = v3.data;                     //BYTECODE_POS: 67 
 v3 = v3.length;                   //BYTECODE_POS: 69 
 v4 = executionStack[2];           //BYTECODE_POS: 71 depth
 v3 = v3 !== v4;                   //BYTECODE_POS: 74 
 // if (!v3) skip to 78            //BYTECODE_POS: 75 
 v3 = false;                       //BYTECODE_POS: 77 
 //return v3;                      //BYTECODE_POS: 78 
 v3 = 0;                           //BYTECODE_POS: 79 
 executionStack[4] = v3;           //BYTECODE_POS: 81 // depth = 0
 v3 = executionStack[4];           //BYTECODE_POS: 84 depth
 v4 = executionStack[2];           //BYTECODE_POS: 87 depth
 v4 = v4.length;                   //BYTECODE_POS: 90 
 v3 = v3 < v4;                     //BYTECODE_POS: 92 
 // if (!v3) skip to 120           //BYTECODE_POS: 93 
 v3 = executionStack[2];           //BYTECODE_POS: 95 depth
 v4 = executionStack[4];           //BYTECODE_POS: 98 depth
 v3 = v3[v4]                       //BYTECODE_POS: 101 
 v4 = executionStack[3];           //BYTECODE_POS: 102 depth
 v5 = executionStack[4];           //BYTECODE_POS: 105 depth
 v4 = v4[v5]                       //BYTECODE_POS: 108 
 v3 = v3 !== v4;                   //BYTECODE_POS: 109 
 // if (!v3) skip to 113           //BYTECODE_POS: 110 
 v3 = false;                       //BYTECODE_POS: 112 
 //return v3;                      //BYTECODE_POS: 113 
 //get depth of 0 from executionStack//BYTECODE_POS: 114 
 v3 = executionStack;              //BYTECODE_POS: 114 
 v4 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v3 = v3[v4]++                     //BYTECODE_POS: 117 // replace the executionStack var with an index incremented
 // go back to 83                  //BYTECODE_POS: 119 
 v3 = true                         //BYTECODE_POS: 121 
 //return v3;                      //BYTECODE_POS: 122 
}