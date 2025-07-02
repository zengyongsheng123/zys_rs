function VM226(arg0, arg1) {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[3];           //BYTECODE_POS: 1 depth
 v1 = 0;                           //BYTECODE_POS: 4 
 v0 = v0 > v1                      //BYTECODE_POS: 6 
 // if (!v0) skip to 84            //BYTECODE_POS: 7 
 v0 = executionStack[2];           //BYTECODE_POS: 9 depth
 v1 = 1;                           //BYTECODE_POS: 12 
 v0 &= v1;                         //BYTECODE_POS: 14 
 // if (!v0) skip to 31            //BYTECODE_POS: 15 
 v0 = executionStack[4];           //BYTECODE_POS: 17 depth
 v1 = 1;                           //BYTECODE_POS: 20 
 v2 = executionStack[3];           //BYTECODE_POS: 22 depth
 v1 <<= v2                         //BYTECODE_POS: 25 
 v0 |= v1;                         //BYTECODE_POS: 26 
 //get depth of 1 from executionStack//BYTECODE_POS: 27 
 v1 = executionStack;              //BYTECODE_POS: 27 
 v2 = 4                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 30 
 v0 = executionStack[2];           //BYTECODE_POS: 32 depth
 v1 = 1;                           //BYTECODE_POS: 35 
 v0 >>= v1                         //BYTECODE_POS: 37 
 //get depth of 0 from executionStack//BYTECODE_POS: 38 
 v1 = executionStack;              //BYTECODE_POS: 38 
 v2 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 41 
 //get depth of 1 from executionStack//BYTECODE_POS: 43 
 v0 = executionStack;              //BYTECODE_POS: 43 
 v1 = 3                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 ++(v0[v-1]);                      //BYTECODE_POS: 46 
 v0 = executionStack[3];           //BYTECODE_POS: 48 depth
 v1 = 8;                           //BYTECODE_POS: 51 
 v0 = v0 == v1;                    //BYTECODE_POS: 53 
 // if (!v0) skip to 77            //BYTECODE_POS: 54 
 v0 = executionStack[2];           //BYTECODE_POS: 56 depth
 v1 = v0                           //BYTECODE_POS: 59 
 v1 = v1.push;                     //BYTECODE_POS: 60 
 v2 = executionStack[4];           //BYTECODE_POS: 62 depth
 v0 = v1(v2);                      //BYTECODE_POS: 65 // context 0 could be custom vm or native func
 v0 = 0;                           //BYTECODE_POS: 68 
 executionStack[3] = v0;           //BYTECODE_POS: 70 // depth = 1
 v0 = 0;                           //BYTECODE_POS: 73 
 executionStack[4] = v0;           //BYTECODE_POS: 75 // depth = 1
 //get depth of 0 from executionStack//BYTECODE_POS: 78 
 v0 = executionStack;              //BYTECODE_POS: 78 
 v1 = 3                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 --(v0[v-1]);                      //BYTECODE_POS: 81 
 // go back to 0                   //BYTECODE_POS: 83 
 v0 = undefined                    //BYTECODE_POS: 85 
 //return v0;                      //BYTECODE_POS: 86 
}