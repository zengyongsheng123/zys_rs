function VM63(arg0) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v0 = v0.regionConf;               //BYTECODE_POS: 4 
 // if (!v0) skip 7 to 14          //BYTECODE_POS: 6 
 v1 = executionStack[2];           //BYTECODE_POS: 8 depth
 v1 = v1.regionConf;               //BYTECODE_POS: 11 
 v1 = v1.host;                     //BYTECODE_POS: 13 
 // if (!v1) skip to 43            //BYTECODE_POS: 15 
 v1 = executionStack[2];           //BYTECODE_POS: 17 depth
 v2 = v1                           //BYTECODE_POS: 20 
 v2 = v2.indexOf;                  //BYTECODE_POS: 21 
 v3 = executionStack[2];           //BYTECODE_POS: 23 depth
 v3 = v3.regionConf;               //BYTECODE_POS: 26 
 v3 = v3.host;                     //BYTECODE_POS: 28 
 v1 = v2(v3);                      //BYTECODE_POS: 30 // context 1 could be custom vm or native func
 v2 = 1;                           //BYTECODE_POS: 32 
 v2 = -v2                          //BYTECODE_POS: 34 
 v1 = v1 !== v2;                   //BYTECODE_POS: 35 
 // if (!v1) skip to 43            //BYTECODE_POS: 36 
 v1 = executionStack[6];           //BYTECODE_POS: 38 depth
 v1 = v1.sec;                      //BYTECODE_POS: 41 
 //return v1;                      //BYTECODE_POS: 43 
 v1 = executionStack[6];           //BYTECODE_POS: 44 depth
 v1 = v1.asgw;                     //BYTECODE_POS: 47 
 //return v1;                      //BYTECODE_POS: 49 
}