function VM162() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = 0;                           //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 6 
 v1 = executionStack[2];           //BYTECODE_POS: 7 depth
 v2 = "localStorage"               //BYTECODE_POS: 10 
 v0 = v1(v2);                      //BYTECODE_POS: 12 // context 0 could be custom vm or native func
 // if (!v0) skip to 26            //BYTECODE_POS: 14 
 v0 = executionStack[2];           //BYTECODE_POS: 16 depth
 v1 = 1;                           //BYTECODE_POS: 19 
 v0 |= v1;                         //BYTECODE_POS: 21 
 //get depth of 0 from executionStack//BYTECODE_POS: 22 
 v1 = executionStack;              //BYTECODE_POS: 22 
 v2 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 25 
 v0 = undefined                    //BYTECODE_POS: 27 
 v1 = executionStack[2];           //BYTECODE_POS: 28 depth
 v2 = "sessionStorage"             //BYTECODE_POS: 31 
 v0 = v1(v2);                      //BYTECODE_POS: 33 // context 0 could be custom vm or native func
 // if (!v0) skip to 50            //BYTECODE_POS: 35 
 v0 = executionStack[2];           //BYTECODE_POS: 37 depth
 v1 = 1;                           //BYTECODE_POS: 40 
 v2 = 1;                           //BYTECODE_POS: 42 
 v1 <<= v2                         //BYTECODE_POS: 44 
 v0 |= v1;                         //BYTECODE_POS: 45 
 //get depth of 0 from executionStack//BYTECODE_POS: 46 
 v1 = executionStack;              //BYTECODE_POS: 46 
 v2 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 49 
 v0 = {};                          //BYTECODE_POS: 51 
 v1 = executionStack[2];           //BYTECODE_POS: 52 depth
 v0.data = v1;                     //BYTECODE_POS: 55 
 //return v0;                      //BYTECODE_POS: 57 
}