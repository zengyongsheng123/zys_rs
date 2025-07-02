function VM263() {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = navigator                    //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.userAgent;                //BYTECODE_POS: 3 
 v1 = v0                           //BYTECODE_POS: 5 
 v1 = v1.toLowerCase;              //BYTECODE_POS: 6 
 v0 = v1();                        //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 10 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 13 depth
 v1 = v0                           //BYTECODE_POS: 16 
 v1 = v1.indexOf;                  //BYTECODE_POS: 17 
 v2 = "electron"                   //BYTECODE_POS: 19 
 v0 = v1(v2);                      //BYTECODE_POS: 21 // context 0 could be custom vm or native func
 v1 = 0;                           //BYTECODE_POS: 23 
 v0 = v0 >= v1                     //BYTECODE_POS: 25 
 // if (!v0) skip to 29            //BYTECODE_POS: 26 
 v0 = false;                       //BYTECODE_POS: 28 
 //return v0;                      //BYTECODE_POS: 29 
 v0 = RegExp                       //BYTECODE_POS: 30 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = "^https?:\/\/([0-9]{1,3}(\.[0-9]{1,3}){3}|[a-f0-9]{1,4}(:[a-f0-9]{1,4}){7})"//BYTECODE_POS: 32 
 v0 = new v0()                     //BYTECODE_POS: 34 
 executionStack[3] = v0;           //BYTECODE_POS: 36 // depth = 0
 v0 = window                       //BYTECODE_POS: 39 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 // if (!v0) skip 4 to 46          //BYTECODE_POS: 41 
 v1 = window                       //BYTECODE_POS: 43 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.location;                 //BYTECODE_POS: 45 
 // if (!v1) skip 6 to 54          //BYTECODE_POS: 47 
 v2 = window                       //BYTECODE_POS: 49 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.location;                 //BYTECODE_POS: 51 
 v2 = v2.href;                     //BYTECODE_POS: 53 
 // if (!v2) skip to 110           //BYTECODE_POS: 55 
 v2 = window                       //BYTECODE_POS: 57 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2.location;                 //BYTECODE_POS: 59 
 v2 = v2.href;                     //BYTECODE_POS: 61 
 executionStack[4] = v2;           //BYTECODE_POS: 63 // depth = 0
 v2 = executionStack[4];           //BYTECODE_POS: 66 depth
 v3 = v2                           //BYTECODE_POS: 69 
 v3 = v3.indexOf;                  //BYTECODE_POS: 70 
 v4 = "file"                       //BYTECODE_POS: 72 
 v2 = v3(v4);                      //BYTECODE_POS: 74 // context 2 could be custom vm or native func
 v3 = 0;                           //BYTECODE_POS: 76 
 v2 = v2 === v3                    //BYTECODE_POS: 78 
 // if (v2) skip 13                //BYTECODE_POS: 79 
 v3 = executionStack[4];           //BYTECODE_POS: 81 depth
 v4 = v3                           //BYTECODE_POS: 84 
 v4 = v4.indexOf;                  //BYTECODE_POS: 85 
 v5 = "http://localhost"           //BYTECODE_POS: 87 
 v3 = v4(v5);                      //BYTECODE_POS: 89 // context 3 could be custom vm or native func
 v4 = 0;                           //BYTECODE_POS: 91 
 v3 = v3 === v4                    //BYTECODE_POS: 93 
 // if (v3) skip 11                //BYTECODE_POS: 94 
 v4 = executionStack[3];           //BYTECODE_POS: 96 depth
 v5 = v4                           //BYTECODE_POS: 99 
 v5 = v5.test;                     //BYTECODE_POS: 100 
 v6 = executionStack[4];           //BYTECODE_POS: 102 depth
 v4 = v5(v6);                      //BYTECODE_POS: 105 // context 4 could be custom vm or native func
 // if (!v4) skip to 110           //BYTECODE_POS: 107 
 v4 = true                         //BYTECODE_POS: 109 
 //return v4;                      //BYTECODE_POS: 110 
 v4 = false;                       //BYTECODE_POS: 111 
 //return v4;                      //BYTECODE_POS: 112 
}