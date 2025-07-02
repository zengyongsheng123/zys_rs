function VM71(arg0, arg1) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = thisContextRef;              //BYTECODE_POS: 1 
 v0 = v0._send;                    //BYTECODE_POS: 2 
 v0 = !v0                          //BYTECODE_POS: 4 
 // if (!v0) skip to 68            //BYTECODE_POS: 5 
 v0 = thisContextRef;              //BYTECODE_POS: 7 
 v0 = v0._byted_intercept_list;    //BYTECODE_POS: 8 
 v1 = v0                           //BYTECODE_POS: 10 
 v1 = v1.push;                     //BYTECODE_POS: 11 
 v2 = {};                          //BYTECODE_POS: 13 
 v3 = "setRequestHeader"           //BYTECODE_POS: 14 
 v2.func = v3;                     //BYTECODE_POS: 16 
 v3 = arguments;                   //BYTECODE_POS: 18 depth
 v2.arguments = v3;                //BYTECODE_POS: 21 
 v0 = v1(v2);                      //BYTECODE_POS: 23 // context 0 could be custom vm or native func
 v0 = RegExp                       //BYTECODE_POS: 26 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = "^content-type$"             //BYTECODE_POS: 28 
 v2 = "i"                          //BYTECODE_POS: 30 
 v0 = new v0()                     //BYTECODE_POS: 32 
 v1 = v0                           //BYTECODE_POS: 34 
 v1 = v1.test;                     //BYTECODE_POS: 35 
 v2 = executionStack[2];           //BYTECODE_POS: 37 depth
 v0 = v1(v2);                      //BYTECODE_POS: 40 // context 0 could be custom vm or native func
 // if (!v0) skip to 68            //BYTECODE_POS: 42 
 v0 = thisContextRef;              //BYTECODE_POS: 44 
 v1 = executionStack[3];           //BYTECODE_POS: 45 depth
 v2 = v1                           //BYTECODE_POS: 48 
 v2 = v2.toString;                 //BYTECODE_POS: 49 
 v1 = v2();                        //BYTECODE_POS: 51 // context 1 could be custom vm or native func
 v2 = v1                           //BYTECODE_POS: 53 
 v2 = v2.toLowerCase;              //BYTECODE_POS: 54 
 v1 = v2();                        //BYTECODE_POS: 56 // context 1 could be custom vm or native func
 v2 = v1                           //BYTECODE_POS: 58 
 v2 = v2.split;                    //BYTECODE_POS: 59 
 v3 = ";"                          //BYTECODE_POS: 61 
 v1 = v2(v3);                      //BYTECODE_POS: 63 // context 1 could be custom vm or native func
 v1 = v1[0];                       //BYTECODE_POS: 65 
 v0._byted_content = v0;           //BYTECODE_POS: 67 
 v0 = executionStack[6];           //BYTECODE_POS: 69 depth
 v1 = v0                           //BYTECODE_POS: 72 
 v1 = v1.apply;                    //BYTECODE_POS: 73 
 v2 = thisContextRef;              //BYTECODE_POS: 75 
 v3 = arguments;                   //BYTECODE_POS: 76 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 79 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 81 
}