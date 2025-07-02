function VM204(arg0, arg1, arg2) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[4];           //BYTECODE_POS: 1 depth
 v0 = !v0                          //BYTECODE_POS: 4 
 // if (!v0) skip to 27            //BYTECODE_POS: 5 
 v0 = {};                          //BYTECODE_POS: 7 
 executionStack[4] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 11 depth
 v1 = 1;                           //BYTECODE_POS: 14 
 v2 = 1000;                        //BYTECODE_POS: 16 
 v1 *= v2                          //BYTECODE_POS: 18 
 v0.interval = v0;                 //BYTECODE_POS: 19 
 v0 = executionStack[4];           //BYTECODE_POS: 21 depth
 v1 = 0;                           //BYTECODE_POS: 24 
 v0.times = v0;                    //BYTECODE_POS: 26 
 v0 = XMLHttpRequest               //BYTECODE_POS: 28 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = new v0()                     //BYTECODE_POS: 30 
 executionStack[5] = v0;           //BYTECODE_POS: 32 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 35 depth
 v1 = true                         //BYTECODE_POS: 38 
 v0.withCredentials = v0;          //BYTECODE_POS: 39 
 v0 = executionStack[5];           //BYTECODE_POS: 41 depth
 v1 = v0                           //BYTECODE_POS: 44 
 v1 = v1.open;                     //BYTECODE_POS: 45 
 v2 = "GET"                        //BYTECODE_POS: 47 
 v3 = executionStack[2];           //BYTECODE_POS: 49 depth
 v4 = true                         //BYTECODE_POS: 52 
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 53 // context 0 could be custom vm or native func
 v0 = executionStack[5];           //BYTECODE_POS: 56 depth
 v1 = "json"                       //BYTECODE_POS: 59 
 v0.responseType = v0;             //BYTECODE_POS: 61 
 v0 = executionStack[5];           //BYTECODE_POS: 63 depth
 v1 = functionVM205;               //BYTECODE_POS: 66 
 v0.onreadystatechange = v0;       //BYTECODE_POS: 68 
 v0 = executionStack[5];           //BYTECODE_POS: 70 depth
 v1 = v0                           //BYTECODE_POS: 73 
 v1 = v1.send;                     //BYTECODE_POS: 74 
 v0 = v1();                        //BYTECODE_POS: 76 // context 0 could be custom vm or native func
 v0 = undefined                    //BYTECODE_POS: 79 
 //return v0;                      //BYTECODE_POS: 80 
}