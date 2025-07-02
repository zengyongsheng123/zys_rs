function VM70() {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = "X-Bogus"                    //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = "_signature"                 //BYTECODE_POS: 6 
 executionStack[3] = v0;           //BYTECODE_POS: 8 // depth = 0
 v0 = window                       //BYTECODE_POS: 11 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.XMLHttpRequest;           //BYTECODE_POS: 13 
 v0 = v0.prototype;                //BYTECODE_POS: 15 
 executionStack[4] = v0;           //BYTECODE_POS: 17 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 20 depth
 v0 = v0.open;                     //BYTECODE_POS: 23 
 executionStack[5] = v0;           //BYTECODE_POS: 25 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 28 depth
 v0 = v0.setRequestHeader;         //BYTECODE_POS: 31 
 executionStack[6] = v0;           //BYTECODE_POS: 33 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 36 depth
 v0 = v0.send;                     //BYTECODE_POS: 39 
 executionStack[7] = v0;           //BYTECODE_POS: 41 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 44 depth
 v0 = v0.overrideMimeType;         //BYTECODE_POS: 47 
 executionStack[8] = v0;           //BYTECODE_POS: 49 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 52 depth
 v0 = v0._ac_intercepted;          //BYTECODE_POS: 55 
 // if (!v0) skip to 60            //BYTECODE_POS: 57 
 v0 = undefined                    //BYTECODE_POS: 59 
 //return v0;                      //BYTECODE_POS: 60 
 v0 = executionStack[4];           //BYTECODE_POS: 61 depth
 v1 = true                         //BYTECODE_POS: 64 
 v0._ac_intercepted = v0;          //BYTECODE_POS: 65 
 v0 = executionStack[4];           //BYTECODE_POS: 67 depth
 v1 = functionVM71;                //BYTECODE_POS: 70 
 v0.setRequestHeader = v0;         //BYTECODE_POS: 72 
 v0 = executionStack[4];           //BYTECODE_POS: 74 depth
 v1 = functionVM72;                //BYTECODE_POS: 77 
 v0.overrideMimeType = v0;         //BYTECODE_POS: 79 
 v0 = executionStack[4];           //BYTECODE_POS: 81 depth
 v1 = functionVM73;                //BYTECODE_POS: 84 
 v0.open = v0;                     //BYTECODE_POS: 86 
 v0 = "onabort"                    //BYTECODE_POS: 88 
 v1 = "onerror"                    //BYTECODE_POS: 90 
 v2 = "onload"                     //BYTECODE_POS: 92 
 v3 = "onloadend"                  //BYTECODE_POS: 94 
 v4 = "onloadstart"                //BYTECODE_POS: 96 
 v5 = "onprogress"                 //BYTECODE_POS: 98 
 v6 = "ontimeout"                  //BYTECODE_POS: 100 
 v0 = [v0,v1,v2,v3,v4,v5,v6]       //BYTECODE_POS: 102 
 executionStack[9] = v0;           //BYTECODE_POS: 104 // depth = 0
 v0 = "GET"                        //BYTECODE_POS: 107 
 v1 = "POST"                       //BYTECODE_POS: 109 
 v0 = [v0,v1]                      //BYTECODE_POS: 111 
 executionStack[10] = v0;          //BYTECODE_POS: 113 // depth = 0
 v0 = executionStack[4];           //BYTECODE_POS: 116 depth
 v1 = functionVM74;                //BYTECODE_POS: 119 
 v0._doRestOfXHRSend = v0;         //BYTECODE_POS: 121 
 v0 = executionStack[4];           //BYTECODE_POS: 123 depth
 v1 = functionVM77;                //BYTECODE_POS: 126 
 v0.send = v0;                     //BYTECODE_POS: 128 
 v0 = undefined                    //BYTECODE_POS: 130 
 //return v0;                      //BYTECODE_POS: 131 
}