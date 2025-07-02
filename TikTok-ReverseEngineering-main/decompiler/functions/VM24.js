function VM24() {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[3];           //BYTECODE_POS: 1 depth
 v1 = v0                           //BYTECODE_POS: 4 
 v1 = v1.drawImage;                //BYTECODE_POS: 5 
 v2 = executionStack[2];           //BYTECODE_POS: 7 depth
 v3 = 0;                           //BYTECODE_POS: 10 
 v4 = 0;                           //BYTECODE_POS: 12 
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 14 // context 0 could be custom vm or native func
 v0 = 0;                           //BYTECODE_POS: 17 
 v1 = executionStack[3];           //BYTECODE_POS: 19 depth
 v2 = v1                           //BYTECODE_POS: 22 
 v2 = v2.getImageData;             //BYTECODE_POS: 23 
 v3 = 0;                           //BYTECODE_POS: 25 
 v4 = 0;                           //BYTECODE_POS: 27 
 v5 = 1;                           //BYTECODE_POS: 29 
 v6 = 1;                           //BYTECODE_POS: 31 
 v1 = v2(v3,v4,v5,v6);             //BYTECODE_POS: 33 // context 1 could be custom vm or native func
 v1 = v1.data;                     //BYTECODE_POS: 35 
 v1 = v1[3];                       //BYTECODE_POS: 37 
 v0 = v0 === v1                    //BYTECODE_POS: 39 
 executionStack[2] = v0;           //BYTECODE_POS: 40 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 43 depth
 v0 = v0.wID;                      //BYTECODE_POS: 46 
 v1 = 2;                           //BYTECODE_POS: 48 
 v2 = executionStack[2];           //BYTECODE_POS: 50 depth
 v1 += v2                          //BYTECODE_POS: 53 
 v0.load = v0;                     //BYTECODE_POS: 54 
 v0 = undefined                    //BYTECODE_POS: 56 
 //return v0;                      //BYTECODE_POS: 57 
}