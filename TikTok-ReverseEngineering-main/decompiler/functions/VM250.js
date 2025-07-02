function VM250() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = true                         //BYTECODE_POS: 4 
 v0.debugger = v0;                 //BYTECODE_POS: 5 
 v0 = arguments;                   //BYTECODE_POS: 7 depth
 v0 = v0.envcode;                  //BYTECODE_POS: 10 
 v1 = executionStack[2];           //BYTECODE_POS: 12 depth
 v1 = v1.debugger;                 //BYTECODE_POS: 15 
 v2 = 6;                           //BYTECODE_POS: 17 
 v1 <<= v2                         //BYTECODE_POS: 19 
 v0 |= v1;                         //BYTECODE_POS: 20 
 v1 = arguments;                   //BYTECODE_POS: 21 depth
 v2 = "envcode"                    //BYTECODE_POS: 24 
 v1[v2] = v0                       //BYTECODE_POS: 26 
 v0 = ""                           //BYTECODE_POS: 28 
 //return v0;                      //BYTECODE_POS: 30 
}