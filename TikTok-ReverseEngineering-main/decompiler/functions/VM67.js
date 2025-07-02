function VM67(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = v0                           //BYTECODE_POS: 4 
 v1 = v1.indexOf;                  //BYTECODE_POS: 5 
 v2 = "?"                          //BYTECODE_POS: 7 
 v0 = v1(v2);                      //BYTECODE_POS: 9 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 11 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 14 depth
 v1 = 1;                           //BYTECODE_POS: 17 
 v1 = -v1                          //BYTECODE_POS: 19 
 v0 = v0 !== v1;                   //BYTECODE_POS: 20 
 // if (!v0) skip to 37            //BYTECODE_POS: 21 
 v0 = executionStack[2];           //BYTECODE_POS: 23 depth
 v1 = v0                           //BYTECODE_POS: 26 
 v1 = v1.substr;                   //BYTECODE_POS: 27 
 v2 = executionStack[3];           //BYTECODE_POS: 29 depth
 v3 = 1;                           //BYTECODE_POS: 32 
 v2 += v3                          //BYTECODE_POS: 34 
 v0 = v1(v2);                      //BYTECODE_POS: 35 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 37 
 v0 = ""                           //BYTECODE_POS: 38 
 //return v0;                      //BYTECODE_POS: 40 
}