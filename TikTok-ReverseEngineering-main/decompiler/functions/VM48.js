function VM48(arg0) {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = "cefSharp"                   //BYTECODE_POS: 4 
 v0 = v0 === v1                    //BYTECODE_POS: 6 
 // if (v0) skip 6                 //BYTECODE_POS: 7 
 v1 = executionStack[2];           //BYTECODE_POS: 9 depth
 v2 = "CefSharp"                   //BYTECODE_POS: 12 
 v1 = v1 === v2                    //BYTECODE_POS: 14 
 // if (v1) skip 6                 //BYTECODE_POS: 15 
 v2 = executionStack[2];           //BYTECODE_POS: 17 depth
 v3 = "eoapi"                      //BYTECODE_POS: 20 
 v2 = v2 === v3                    //BYTECODE_POS: 22 
 // if (v2) skip 6                 //BYTECODE_POS: 23 
 v3 = executionStack[2];           //BYTECODE_POS: 25 depth
 v4 = "eoWebBrowserDispatcher"     //BYTECODE_POS: 28 
 v3 = v3 === v4                    //BYTECODE_POS: 30 
 // if (!v3) skip to 34            //BYTECODE_POS: 31 
 v3 = true                         //BYTECODE_POS: 33 
 //return v3;                      //BYTECODE_POS: 34 
 v3 = window                       //BYTECODE_POS: 35 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = executionStack[2];           //BYTECODE_POS: 37 depth
 v3 = v3[v4]                       //BYTECODE_POS: 40 
 // if (!v3) skip 22 to 64         //BYTECODE_POS: 41 
 v4 = window                       //BYTECODE_POS: 43 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = executionStack[2];           //BYTECODE_POS: 45 depth
 v4 = v4[v5]                       //BYTECODE_POS: 48 
 v4 = v4.bindObjectAsync;          //BYTECODE_POS: 49 
 v5 = undefined                    //BYTECODE_POS: 51 
 v4 = v4 !== v5;                   //BYTECODE_POS: 52 
 // if (v4) skip 10                //BYTECODE_POS: 53 
 v5 = window                       //BYTECODE_POS: 55 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v6 = executionStack[2];           //BYTECODE_POS: 57 depth
 v5 = v5[v6]                       //BYTECODE_POS: 60 
 v5 = v5.isEOWebBrowser;           //BYTECODE_POS: 61 
 v6 = undefined                    //BYTECODE_POS: 63 
 v5 = v5 !== v6;                   //BYTECODE_POS: 64 
 // if (!v5) skip to 68            //BYTECODE_POS: 65 
 v5 = true                         //BYTECODE_POS: 67 
 //return v5;                      //BYTECODE_POS: 68 
 // go foward to 73                //BYTECODE_POS: 69 
 executionStack[3] = v4;           //BYTECODE_POS: 71 // depth = 0
 v4 = undefined                    //BYTECODE_POS: 74 
 //return v4;                      //BYTECODE_POS: 75 
}