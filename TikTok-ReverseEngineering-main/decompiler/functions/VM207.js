function VM207(arg0, arg1, arg2, arg3) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[5];           //BYTECODE_POS: 1 depth
 v0 = !v0                          //BYTECODE_POS: 4 
 // if (!v0) skip to 27            //BYTECODE_POS: 5 
 v0 = {};                          //BYTECODE_POS: 7 
 executionStack[5] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = executionStack[5];           //BYTECODE_POS: 11 depth
 v1 = 1;                           //BYTECODE_POS: 14 
 v2 = 1000;                        //BYTECODE_POS: 16 
 v1 *= v2                          //BYTECODE_POS: 18 
 v0.interval = v0;                 //BYTECODE_POS: 19 
 v0 = executionStack[5];           //BYTECODE_POS: 21 depth
 v1 = 0;                           //BYTECODE_POS: 24 
 v0.times = v0;                    //BYTECODE_POS: 26 
 v0 = document                     //BYTECODE_POS: 28 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 30 
 v1 = v1.createElement;            //BYTECODE_POS: 31 
 v2 = "script"                     //BYTECODE_POS: 33 
 v0 = v1(v2);                      //BYTECODE_POS: 35 // context 0 could be custom vm or native func
 executionStack[6] = v0;           //BYTECODE_POS: 37 // depth = 0
 v0 = executionStack[6];           //BYTECODE_POS: 40 depth
 v1 = "text/javascript"            //BYTECODE_POS: 43 
 v0.type = v0;                     //BYTECODE_POS: 45 
 v0 = executionStack[3];           //BYTECODE_POS: 47 depth
 v1 = null                         //BYTECODE_POS: 50 
 v0 = v0 !== v1;                   //BYTECODE_POS: 51 
 // if (!v0) skip 6 to 59          //BYTECODE_POS: 52 
 v1 = executionStack[2];           //BYTECODE_POS: 54 depth
 v2 = 0;                           //BYTECODE_POS: 57 
 v1 = v1 === v2                    //BYTECODE_POS: 59 
 // if (!v1) skip to 76            //BYTECODE_POS: 60 
 v1 = executionStack[6];           //BYTECODE_POS: 62 depth
 v2 = executionStack[3];           //BYTECODE_POS: 65 depth
 v1.integrity = v1;                //BYTECODE_POS: 68 
 v1 = executionStack[6];           //BYTECODE_POS: 70 depth
 v2 = "anonymous"                  //BYTECODE_POS: 73 
 v1.crossOrigin = v1;              //BYTECODE_POS: 75 
 v1 = executionStack[6];           //BYTECODE_POS: 77 depth
 v2 = executionStack[2];           //BYTECODE_POS: 80 depth
 v1.src = v1;                      //BYTECODE_POS: 83 
 v1 = executionStack[6];           //BYTECODE_POS: 85 depth
 v2 = functionVM208;               //BYTECODE_POS: 88 
 v1.onerror = v1;                  //BYTECODE_POS: 90 
 v1 = executionStack[6];           //BYTECODE_POS: 92 depth
 v2 = executionStack[4];           //BYTECODE_POS: 95 depth
 v1.onload = v1;                   //BYTECODE_POS: 98 
 v1 = document                     //BYTECODE_POS: 100 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.body;                     //BYTECODE_POS: 102 
 v2 = v1                           //BYTECODE_POS: 104 
 v2 = v2.appendChild;              //BYTECODE_POS: 105 
 v3 = executionStack[6];           //BYTECODE_POS: 107 depth
 v1 = v2(v3);                      //BYTECODE_POS: 110 // context 1 could be custom vm or native func
 v1 = undefined                    //BYTECODE_POS: 113 
 //return v1;                      //BYTECODE_POS: 114 
}