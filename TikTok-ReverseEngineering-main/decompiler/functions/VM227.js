function VM227() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[3];           //BYTECODE_POS: 1 depth
 v1 = 0;                           //BYTECODE_POS: 4 
 v0 = v0 > v1                      //BYTECODE_POS: 6 
 // if (!v0) skip to 20            //BYTECODE_POS: 7 
 v0 = executionStack[2];           //BYTECODE_POS: 9 depth
 v1 = v0                           //BYTECODE_POS: 12 
 v1 = v1.push;                     //BYTECODE_POS: 13 
 v2 = executionStack[4];           //BYTECODE_POS: 15 depth
 v0 = v1(v2);                      //BYTECODE_POS: 18 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 21 
 //return v0;                      //BYTECODE_POS: 22 
}