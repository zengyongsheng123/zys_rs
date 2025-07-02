function VM64(arg0) {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v0 = v0.regionConf;               //BYTECODE_POS: 4 
 v0 = v0.host;                     //BYTECODE_POS: 6 
 executionStack[3] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 11 depth
 // if (!v0) skip to 34            //BYTECODE_POS: 14 
 v0 = executionStack[2];           //BYTECODE_POS: 16 depth
 v1 = v0                           //BYTECODE_POS: 19 
 v1 = v1.indexOf;                  //BYTECODE_POS: 20 
 v2 = executionStack[3];           //BYTECODE_POS: 22 depth
 v0 = v1(v2);                      //BYTECODE_POS: 25 // context 0 could be custom vm or native func
 v1 = 1;                           //BYTECODE_POS: 27 
 v1 = -v1                          //BYTECODE_POS: 29 
 v0 = v0 !== v1;                   //BYTECODE_POS: 30 
 // if (!v0) skip to 34            //BYTECODE_POS: 31 
 v0 = true                         //BYTECODE_POS: 33 
 //return v0;                      //BYTECODE_POS: 34 
 v0 = false;                       //BYTECODE_POS: 35 
 //return v0;                      //BYTECODE_POS: 36 
}