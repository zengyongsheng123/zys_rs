function VM178() {
 var v0; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = typeof globalThis.Notification//BYTECODE_POS: 1 
 v1 = "function"                   //BYTECODE_POS: 3 
 v0 = v0 === v1                    //BYTECODE_POS: 5 
 // if (!v0) skip to 30            //BYTECODE_POS: 6 
 v0 = Notification                 //BYTECODE_POS: 8 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.permission;               //BYTECODE_POS: 10 
 executionStack[2] = v0;           //BYTECODE_POS: 12 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 15 depth
 v0 = typeof v0;                   //BYTECODE_POS: 18 
 v1 = "string"                     //BYTECODE_POS: 19 
 v0 = v0 === v1                    //BYTECODE_POS: 21 
 // if (!v0) skip to 30            //BYTECODE_POS: 22 
 v0 = {};                          //BYTECODE_POS: 24 
 v1 = executionStack[2];           //BYTECODE_POS: 25 depth
 v0.data = v1;                     //BYTECODE_POS: 28 
 //return v0;                      //BYTECODE_POS: 30 
 v0 = {};                          //BYTECODE_POS: 31 
 v1 = "undefined"                  //BYTECODE_POS: 32 
 v0.data = v1;                     //BYTECODE_POS: 34 
 //return v0;                      //BYTECODE_POS: 36 
}