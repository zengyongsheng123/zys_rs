function VM52() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 // if (!v0) skip to 9             //BYTECODE_POS: 4 
 v0 = executionStack[2];           //BYTECODE_POS: 6 depth
 //return v0;                      //BYTECODE_POS: 9 
 v0 = undefined                    //BYTECODE_POS: 10 
 v1 = executionStack[3];           //BYTECODE_POS: 11 depth
 v2 = +3735928559                  //BYTECODE_POS: 14 
 v0 = v1(v2);                      //BYTECODE_POS: 16 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 18 // depth = 1
 v0 = undefined                    //BYTECODE_POS: 21 
 //return v0;                      //BYTECODE_POS: 22 
}