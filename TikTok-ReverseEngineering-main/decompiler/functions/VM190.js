function VM190(arg0) {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = 63;                          //BYTECODE_POS: 4 
 v0 &= v1;                         //BYTECODE_POS: 6 
 //get depth of 0 from executionStack//BYTECODE_POS: 7 
 v1 = executionStack;              //BYTECODE_POS: 7 
 v2 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 10 
 v0 = String                       //BYTECODE_POS: 12 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 14 
 v1 = v1.fromCharCode;             //BYTECODE_POS: 15 
 v2 = executionStack[2];           //BYTECODE_POS: 17 depth
 v3 = executionStack[2];           //BYTECODE_POS: 20 depth
 v4 = 26;                          //BYTECODE_POS: 23 
 v3 = v3 < v4;                     //BYTECODE_POS: 25 
 // if (!v3) skip to 31            //BYTECODE_POS: 26 
 v3 = 65;                          //BYTECODE_POS: 28 
 // go foward to 59                //BYTECODE_POS: 30 
 v4 = executionStack[2];           //BYTECODE_POS: 32 depth
 v5 = 52;                          //BYTECODE_POS: 35 
 v4 = v4 < v5;                     //BYTECODE_POS: 37 
 // if (!v4) skip to 43            //BYTECODE_POS: 38 
 v4 = 71;                          //BYTECODE_POS: 40 
 // go foward to 59                //BYTECODE_POS: 42 
 v5 = executionStack[2];           //BYTECODE_POS: 44 depth
 v6 = 62;                          //BYTECODE_POS: 47 
 v5 = v5 < v6;                     //BYTECODE_POS: 49 
 // if (!v5) skip to 56            //BYTECODE_POS: 50 
 v5 = 4;                           //BYTECODE_POS: 52 
 v5 = -v5                          //BYTECODE_POS: 54 
 // go foward to 59                //BYTECODE_POS: 55 
 v6 = 17;                          //BYTECODE_POS: 57 
 v6 = -v6                          //BYTECODE_POS: 59 
 v5 += v6                          //BYTECODE_POS: 60 
 v3 = v4(v5);                      //BYTECODE_POS: 61 // context 3 could be custom vm or native func
 //return v3;                      //BYTECODE_POS: 63 
}