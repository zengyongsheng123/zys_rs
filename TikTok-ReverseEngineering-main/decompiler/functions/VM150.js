function VM150(arg0, arg1, arg2) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = 0;                           //BYTECODE_POS: 1 
 executionStack[5] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 6 depth
 v1 = executionStack[3];           //BYTECODE_POS: 9 depth
 v1 = v1.length;                   //BYTECODE_POS: 12 
 v0 = v0 < v1;                     //BYTECODE_POS: 14 
 // if (!v0) skip to 76            //BYTECODE_POS: 15 
 v0 = window                       //BYTECODE_POS: 17 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 19 
 v1 = v1.matchMedia;               //BYTECODE_POS: 20 
 v2 = "("                          //BYTECODE_POS: 22 
 v3 = v2                           //BYTECODE_POS: 24 
 v3 = v3.concat;                   //BYTECODE_POS: 25 
 v4 = executionStack[2];           //BYTECODE_POS: 27 depth
 v5 = ": "                         //BYTECODE_POS: 30 
 v2 = v3(v4,v5);                   //BYTECODE_POS: 32 // context 2 could be custom vm or native func
 v3 = v2                           //BYTECODE_POS: 34 
 v3 = v3.concat;                   //BYTECODE_POS: 35 
 v4 = executionStack[3];           //BYTECODE_POS: 37 depth
 v5 = executionStack[5];           //BYTECODE_POS: 40 depth
 v4 = v4[v5]                       //BYTECODE_POS: 43 
 v2 = v3(v4);                      //BYTECODE_POS: 44 // context 2 could be custom vm or native func
 v3 = v2                           //BYTECODE_POS: 46 
 v3 = v3.concat;                   //BYTECODE_POS: 47 
 v4 = executionStack[4];           //BYTECODE_POS: 49 depth
 v5 = ")"                          //BYTECODE_POS: 52 
 v2 = v3(v4,v5);                   //BYTECODE_POS: 54 // context 2 could be custom vm or native func
 v0 = v1(v2);                      //BYTECODE_POS: 56 // context 0 could be custom vm or native func
 v0 = v0.matches;                  //BYTECODE_POS: 58 
 // if (!v0) skip to 69            //BYTECODE_POS: 60 
 v0 = executionStack[3];           //BYTECODE_POS: 62 depth
 v1 = executionStack[5];           //BYTECODE_POS: 65 depth
 v0 = v0[v1]                       //BYTECODE_POS: 68 
 //return v0;                      //BYTECODE_POS: 69 
 //get depth of 0 from executionStack//BYTECODE_POS: 70 
 v0 = executionStack;              //BYTECODE_POS: 70 
 v1 = 5                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 73 // replace the executionStack var with an index incremented
 // go back to 5                   //BYTECODE_POS: 75 
 v0 = undefined                    //BYTECODE_POS: 77 
 //return v0;                      //BYTECODE_POS: 78 
}