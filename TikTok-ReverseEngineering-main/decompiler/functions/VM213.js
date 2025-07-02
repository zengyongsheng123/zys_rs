function VM213() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = ""                           //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = null                         //BYTECODE_POS: 6 
 executionStack[3] = v0;           //BYTECODE_POS: 7 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 10 
 v1 = executionStack[0];           //BYTECODE_POS: 11 depth
 v2 = executionStack[4];           //BYTECODE_POS: 14 depth
 v3 = executionStack[10];          //BYTECODE_POS: 17 depth
 v2 = v2[v3]                       //BYTECODE_POS: 20 
 v0 = v1(v2);                      //BYTECODE_POS: 21 // context 0 could be custom vm or native func
 v1 = "object"                     //BYTECODE_POS: 23 
 v0 = v0 === v1                    //BYTECODE_POS: 25 
 // if (!v0) skip to 53            //BYTECODE_POS: 26 
 v0 = executionStack[4];           //BYTECODE_POS: 28 depth
 v1 = executionStack[10];          //BYTECODE_POS: 31 depth
 v0 = v0[v1]                       //BYTECODE_POS: 34 
 v0 = v0.URL;                      //BYTECODE_POS: 35 
 executionStack[2] = v0;           //BYTECODE_POS: 37 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 40 depth
 v1 = executionStack[10];          //BYTECODE_POS: 43 depth
 v0 = v0[v1]                       //BYTECODE_POS: 46 
 v0 = v0.Hash;                     //BYTECODE_POS: 47 
 executionStack[3] = v0;           //BYTECODE_POS: 49 // depth = 0
 // go foward to 63                //BYTECODE_POS: 52 
 v0 = executionStack[4];           //BYTECODE_POS: 54 depth
 v1 = executionStack[10];          //BYTECODE_POS: 57 depth
 v0 = v0[v1]                       //BYTECODE_POS: 60 
 executionStack[2] = v0;           //BYTECODE_POS: 61 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 64 
 v1 = executionStack[5];           //BYTECODE_POS: 65 depth
 v2 = executionStack[2];           //BYTECODE_POS: 68 depth
 v3 = executionStack[3];           //BYTECODE_POS: 71 depth
 v4 = functionVM214;               //BYTECODE_POS: 74 
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 76 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 79 
 //return v0;                      //BYTECODE_POS: 80 
}