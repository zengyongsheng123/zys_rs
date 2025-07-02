function VM22() {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[7];           //BYTECODE_POS: 1 depth
 v0 = !v0                          //BYTECODE_POS: 4 
 // if (!v0) skip to 73            //BYTECODE_POS: 5 
 v0 = Error                        //BYTECODE_POS: 7 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = "test err"                   //BYTECODE_POS: 9 
 v0 = new v0()                     //BYTECODE_POS: 11 
 executionStack[2] = v0;           //BYTECODE_POS: 13 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 16 depth
 v0 = v0.stack;                    //BYTECODE_POS: 19 
 v1 = v0                           //BYTECODE_POS: 21 
 v1 = v1.toString;                 //BYTECODE_POS: 22 
 v0 = v1();                        //BYTECODE_POS: 24 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 26 
 v1 = v1.includes;                 //BYTECODE_POS: 27 
 v2 = "puppeteer"                  //BYTECODE_POS: 29 
 v0 = v1(v2);                      //BYTECODE_POS: 31 // context 0 could be custom vm or native func
 // if (!v0) skip to 42            //BYTECODE_POS: 33 
 v0 = window                       //BYTECODE_POS: 35 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0._mssdk;                   //BYTECODE_POS: 37 
 v1 = 1;                           //BYTECODE_POS: 39 
 v0.pppt = v0;                     //BYTECODE_POS: 41 
 v0 = Date                         //BYTECODE_POS: 43 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = new v0()                     //BYTECODE_POS: 45 
 v1 = v0                           //BYTECODE_POS: 47 
 v1 = v1.getTime;                  //BYTECODE_POS: 48 
 v0 = v1();                        //BYTECODE_POS: 50 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 52 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 55 depth
 v1 = executionStack[8];           //BYTECODE_POS: 58 depth
 v0 -= v1;                         //BYTECODE_POS: 61 
 v1 = 3;                           //BYTECODE_POS: 62 
 v2 = 1000;                        //BYTECODE_POS: 64 
 v1 *= v2                          //BYTECODE_POS: 66 
 v0 = v0 > v1                      //BYTECODE_POS: 67 
 // if (!v0) skip to 73            //BYTECODE_POS: 68 
 v0 = true                         //BYTECODE_POS: 70 
 executionStack[7] = v0;           //BYTECODE_POS: 71 // depth = 3
 v0 = executionStack[2];           //BYTECODE_POS: 74 depth
 v1 = v0                           //BYTECODE_POS: 77 
 v1 = v1.apply;                    //BYTECODE_POS: 78 
 v2 = thisContextRef;              //BYTECODE_POS: 80 
 v3 = arguments;                   //BYTECODE_POS: 81 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 84 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 86 
}