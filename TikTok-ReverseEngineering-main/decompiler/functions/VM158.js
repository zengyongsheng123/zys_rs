function VM158(arg0, arg1) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = 0;                           //BYTECODE_POS: 1 
 executionStack[4] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 6 
 executionStack[5] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = 0;                           //BYTECODE_POS: 11 
 executionStack[6] = v0;           //BYTECODE_POS: 13 // depth = 0
 v0 = executionStack[6];           //BYTECODE_POS: 16 depth
 v1 = executionStack[3];           //BYTECODE_POS: 19 depth
 v1 = v1.length;                   //BYTECODE_POS: 22 
 v0 = v0 < v1;                     //BYTECODE_POS: 24 
 // if (!v0) skip to 99            //BYTECODE_POS: 25 
 v0 = executionStack[3];           //BYTECODE_POS: 27 depth
 v1 = executionStack[6];           //BYTECODE_POS: 30 depth
 v0 = v0[v1]                       //BYTECODE_POS: 33 
 executionStack[7] = v0;           //BYTECODE_POS: 34 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 37 depth
 v1 = executionStack[7];           //BYTECODE_POS: 40 depth
 v0 = v0[v1]                       //BYTECODE_POS: 43 
 v0 = typeof v0;                   //BYTECODE_POS: 44 
 v1 = "function"                   //BYTECODE_POS: 45 
 v0 = v0 === v1                    //BYTECODE_POS: 47 
 // if (!v0) skip to 92            //BYTECODE_POS: 48 
 v0 = executionStack[3];           //BYTECODE_POS: 50 depth
 v1 = v0                           //BYTECODE_POS: 53 
 v1 = v1.call;                     //BYTECODE_POS: 54 
 v2 = executionStack[2];           //BYTECODE_POS: 56 depth
 v3 = executionStack[7];           //BYTECODE_POS: 59 depth
 v2 = v2[v3]                       //BYTECODE_POS: 62 
 v0 = v1(v2);                      //BYTECODE_POS: 63 // context 0 could be custom vm or native func
 executionStack[8] = v0;           //BYTECODE_POS: 65 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 68 depth
 v1 = v0                           //BYTECODE_POS: 71 
 v1 = v1.test;                     //BYTECODE_POS: 72 
 v2 = executionStack[8];           //BYTECODE_POS: 74 depth
 v0 = v1(v2);                      //BYTECODE_POS: 77 // context 0 could be custom vm or native func
 // if (!v0) skip to 87            //BYTECODE_POS: 79 
 //get depth of 0 from executionStack//BYTECODE_POS: 81 
 v0 = executionStack;              //BYTECODE_POS: 81 
 v1 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 84 // replace the executionStack var with an index incremented
 // go foward to 92                //BYTECODE_POS: 86 
 //get depth of 0 from executionStack//BYTECODE_POS: 88 
 v0 = executionStack;              //BYTECODE_POS: 88 
 v1 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 91 // replace the executionStack var with an index incremented
 //get depth of 0 from executionStack//BYTECODE_POS: 93 
 v0 = executionStack;              //BYTECODE_POS: 93 
 v1 = 6                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 96 // replace the executionStack var with an index incremented
 // go back to 15                  //BYTECODE_POS: 98 
 v0 = executionStack[4];           //BYTECODE_POS: 100 depth
 v1 = executionStack[5];           //BYTECODE_POS: 103 depth
 v0 = [v0,v1]                      //BYTECODE_POS: 106 
 //return v0;                      //BYTECODE_POS: 108 
}