function VM0() {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = Array                        //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 3 
 v1 = v1.isArray;                  //BYTECODE_POS: 4 
 v2 = window                       //BYTECODE_POS: 6 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2._mssdk;                   //BYTECODE_POS: 8 
 v0 = v1(v2);                      //BYTECODE_POS: 10 // context 0 could be custom vm or native func
 v0 = !v0                          //BYTECODE_POS: 12 
 // if (!v0) skip to 20            //BYTECODE_POS: 13 
 v0 = window                       //BYTECODE_POS: 15 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = []                           //BYTECODE_POS: 17 
 v0._mssdk = v0;                   //BYTECODE_POS: 19 
 v0 = window                       //BYTECODE_POS: 21 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0._mssdk;                   //BYTECODE_POS: 23 
 v1 = executionStack[12];          //BYTECODE_POS: 25 depth
 v0._sharedCache = v0;             //BYTECODE_POS: 28 
 v0 = undefined                    //BYTECODE_POS: 30 
 v1 = executionStack[14];          //BYTECODE_POS: 31 depth
 v0 = v1();                        //BYTECODE_POS: 34 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 36 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 39 depth
 // if (!v0) skip to 61            //BYTECODE_POS: 42 
 v0 = executionStack[10];          //BYTECODE_POS: 44 depth
 v1 = executionStack[2];           //BYTECODE_POS: 47 depth
 v0.msToken = v0;                  //BYTECODE_POS: 50 
 v0 = executionStack[10];          //BYTECODE_POS: 52 depth
 v1 = executionStack[11];          //BYTECODE_POS: 55 depth
 v1 = v1.asgw;                     //BYTECODE_POS: 58 
 v0.msStatus = v0;                 //BYTECODE_POS: 60 
 v0 = undefined                    //BYTECODE_POS: 62 
 v1 = setTimeout                   //BYTECODE_POS: 63 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = functionVM1;                 //BYTECODE_POS: 65 
 v3 = 1000;                        //BYTECODE_POS: 67 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 69 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 72 
 v1 = setTimeout                   //BYTECODE_POS: 73 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = functionVM2;                 //BYTECODE_POS: 75 
 v3 = 3;                           //BYTECODE_POS: 77 
 v4 = 1000;                        //BYTECODE_POS: 79 
 v3 *= v4                          //BYTECODE_POS: 81 
 v0 = v1(v2,v3);                   //BYTECODE_POS: 82 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 85 
 v1 = executionStack[0];           //BYTECODE_POS: 86 depth
 v0 = v1();                        //BYTECODE_POS: 89 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 92 
 v1 = executionStack[18];          //BYTECODE_POS: 93 depth
 v2 = "/web/report"                //BYTECODE_POS: 96 
 v3 = "/web/common"                //BYTECODE_POS: 98 
 v2 = [v2,v3]                      //BYTECODE_POS: 100 
 v0 = v1(v2);                      //BYTECODE_POS: 102 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 105 
 //return v0;                      //BYTECODE_POS: 106 
}