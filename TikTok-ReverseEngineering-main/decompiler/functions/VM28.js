function VM28(arg0) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = executionStack[3];           //BYTECODE_POS: 4 depth
 v2 = 1;                           //BYTECODE_POS: 7 
 v2 = -v2                          //BYTECODE_POS: 9 
 v3 = executionStack[2];           //BYTECODE_POS: 10 depth
 v3 = v3.message;                  //BYTECODE_POS: 13 
 v4 = v3                           //BYTECODE_POS: 15 
 v4 = v4.indexOf;                  //BYTECODE_POS: 16 
 v5 = "is not a valid enum value of type PermissionName"//BYTECODE_POS: 18 
 v3 = v4(v5);                      //BYTECODE_POS: 20 // context 3 could be custom vm or native func
 v2 = v2 !== v3;                   //BYTECODE_POS: 22 
 // if (!v2) skip to 28            //BYTECODE_POS: 23 
 v2 = 4;                           //BYTECODE_POS: 25 
 // go foward to 30                //BYTECODE_POS: 27 
 v3 = 3;                           //BYTECODE_POS: 29 
 v1[v2] = v3;                      //BYTECODE_POS: 31 
 v1 = undefined                    //BYTECODE_POS: 32 
 //return v1;                      //BYTECODE_POS: 33 
}