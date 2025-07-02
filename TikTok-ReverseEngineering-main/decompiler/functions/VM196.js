function VM196(arg0, arg1) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = {};                          //BYTECODE_POS: 1 
 executionStack[4] = v0;           //BYTECODE_POS: 2 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 5 
 executionStack[5] = v0;           //BYTECODE_POS: 7 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 10 depth
 v1 = executionStack[3];           //BYTECODE_POS: 13 depth
 v1 = v1.length;                   //BYTECODE_POS: 16 
 v0 = v0 < v1;                     //BYTECODE_POS: 18 
 // if (!v0) skip to 111           //BYTECODE_POS: 19 
 v0 = executionStack[3];           //BYTECODE_POS: 21 depth
 v1 = executionStack[5];           //BYTECODE_POS: 24 depth
 v0 = v0[v1]                       //BYTECODE_POS: 27 
 executionStack[6] = v0;           //BYTECODE_POS: 28 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 31 depth
 v1 = executionStack[6];           //BYTECODE_POS: 34 depth
 v0 = v0[v1]                       //BYTECODE_POS: 37 
 executionStack[7] = v0;           //BYTECODE_POS: 38 // depth = 0
 v0 = executionStack[7];           //BYTECODE_POS: 41 depth
 v0 = typeof v0;                   //BYTECODE_POS: 44 
 v1 = "undefined"                  //BYTECODE_POS: 45 
 v0 = v0 === v1                    //BYTECODE_POS: 47 
 // if (v0) skip 5                 //BYTECODE_POS: 48 
 v1 = executionStack[7];           //BYTECODE_POS: 50 depth
 v2 = null                         //BYTECODE_POS: 53 
 v1 = v1 === v2                    //BYTECODE_POS: 54 
 // if (!v1) skip to 60            //BYTECODE_POS: 55 
 v1 = false;                       //BYTECODE_POS: 57 
 executionStack[7] = v1;           //BYTECODE_POS: 58 // depth = 0
 v1 = executionStack[7];           //BYTECODE_POS: 61 depth
 v2 = null                         //BYTECODE_POS: 64 
 v1 = v1 !== v2;                   //BYTECODE_POS: 65 
 // if (!v1) skip 21 to 88         //BYTECODE_POS: 66 
 v2 = executionStack[7];           //BYTECODE_POS: 68 depth
 v2 = typeof v2;                   //BYTECODE_POS: 71 
 v3 = "function"                   //BYTECODE_POS: 72 
 v2 = v2 === v3                    //BYTECODE_POS: 74 
 // if (v2) skip 12                //BYTECODE_POS: 75 
 v3 = undefined                    //BYTECODE_POS: 77 
 v4 = executionStack[0];           //BYTECODE_POS: 78 depth
 v5 = executionStack[7];           //BYTECODE_POS: 81 depth
 v3 = v4(v5);                      //BYTECODE_POS: 84 // context 3 could be custom vm or native func
 v4 = "object"                     //BYTECODE_POS: 86 
 v3 = v3 === v4                    //BYTECODE_POS: 88 
 // if (!v3) skip to 94            //BYTECODE_POS: 89 
 v3 = true                         //BYTECODE_POS: 91 
 executionStack[7] = v3;           //BYTECODE_POS: 92 // depth = 0
 v3 = executionStack[4];           //BYTECODE_POS: 95 depth
 v4 = executionStack[6];           //BYTECODE_POS: 98 depth
 v5 = executionStack[7];           //BYTECODE_POS: 101 depth
 v3[v4] = v5;                      //BYTECODE_POS: 104 
 //get depth of 0 from executionStack//BYTECODE_POS: 105 
 v3 = executionStack;              //BYTECODE_POS: 105 
 v4 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v3 = v3[v4]++                     //BYTECODE_POS: 108 // replace the executionStack var with an index incremented
 // go back to 9                   //BYTECODE_POS: 110 
 v3 = executionStack[4];           //BYTECODE_POS: 112 depth
 //return v3;                      //BYTECODE_POS: 115 
}