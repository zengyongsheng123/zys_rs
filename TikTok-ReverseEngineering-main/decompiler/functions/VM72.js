function VM72(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = thisContextRef;              //BYTECODE_POS: 1 
 v1 = arguments;                   //BYTECODE_POS: 2 depth
 v0._overrideMimeTypeArgs = v0;    //BYTECODE_POS: 5 
 v0 = executionStack[8];           //BYTECODE_POS: 7 depth
 v1 = v0                           //BYTECODE_POS: 10 
 v1 = v1.apply;                    //BYTECODE_POS: 11 
 v2 = thisContextRef;              //BYTECODE_POS: 13 
 v3 = arguments;                   //BYTECODE_POS: 14 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 17 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 19 
}