function VM12() {
 var v0; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[12];          //BYTECODE_POS: 2 depth
 v0 = v1();                        //BYTECODE_POS: 5 // context 0 could be custom vm or native func
 // go foward to 12                //BYTECODE_POS: 8 
 executionStack[2] = v-1;          //BYTECODE_POS: 10 // depth = 0
 v-1 = undefined                   //BYTECODE_POS: 13 
 //return v-1;                     //BYTECODE_POS: 14 
}