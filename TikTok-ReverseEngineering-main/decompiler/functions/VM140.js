function VM140(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = null                         //BYTECODE_POS: 4 
 v0 = v0 != v1;                    //BYTECODE_POS: 5 
 // if (!v0) skip to 85            //BYTECODE_POS: 6 
 v0 = executionStack[2];           //BYTECODE_POS: 8 depth
 v1 = v0                           //BYTECODE_POS: 11 
 v1 = v1.call;                     //BYTECODE_POS: 12 
 v2 = executionStack[2];           //BYTECODE_POS: 14 depth
 v0 = v1(v2);                      //BYTECODE_POS: 17 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 19 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 22 depth
 v1 = v0                           //BYTECODE_POS: 25 
 v1 = v1.toString;                 //BYTECODE_POS: 26 
 v0 = v1();                        //BYTECODE_POS: 28 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 30 // depth = 0
 v0 = executionStack[0];           //BYTECODE_POS: 33 depth
 v1 = v0                           //BYTECODE_POS: 36 
 v1 = v1.test;                     //BYTECODE_POS: 37 
 v2 = executionStack[3];           //BYTECODE_POS: 39 depth
 v0 = v1(v2);                      //BYTECODE_POS: 42 // context 0 could be custom vm or native func
 v0 = !v0                          //BYTECODE_POS: 44 
 // if (!v0) skip to 49            //BYTECODE_POS: 45 
 v0 = 2;                           //BYTECODE_POS: 47 
 //return v0;                      //BYTECODE_POS: 49 
 v0 = executionStack[3];           //BYTECODE_POS: 50 depth
 v1 = executionStack[4];           //BYTECODE_POS: 53 depth
 v0 = v0 !== v1;                   //BYTECODE_POS: 56 
 // if (!v0) skip to 61            //BYTECODE_POS: 57 
 v0 = 3;                           //BYTECODE_POS: 59 
 //return v0;                      //BYTECODE_POS: 61 
 v0 = executionStack[0];           //BYTECODE_POS: 62 depth
 v1 = v0                           //BYTECODE_POS: 65 
 v1 = v1.test;                     //BYTECODE_POS: 66 
 v2 = executionStack[2];           //BYTECODE_POS: 68 depth
 v2 = v2.toString;                 //BYTECODE_POS: 71 
 v3 = v2                           //BYTECODE_POS: 73 
 v3 = v3.toString;                 //BYTECODE_POS: 74 
 v2 = v3();                        //BYTECODE_POS: 76 // context 2 could be custom vm or native func
 v0 = v1(v2);                      //BYTECODE_POS: 78 // context 0 could be custom vm or native func
 v0 = !v0                          //BYTECODE_POS: 80 
 // if (!v0) skip to 85            //BYTECODE_POS: 81 
 v0 = 4;                           //BYTECODE_POS: 83 
 //return v0;                      //BYTECODE_POS: 85 
 v0 = 1;                           //BYTECODE_POS: 86 
 //return v0;                      //BYTECODE_POS: 88 
}