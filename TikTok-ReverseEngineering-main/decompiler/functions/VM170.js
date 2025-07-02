function VM170() {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = "XDomainRequest"             //BYTECODE_POS: 1 
 v1 = "createPopup"                //BYTECODE_POS: 3 
 v2 = "removeEventListener"        //BYTECODE_POS: 5 
 v3 = "globalStorage"              //BYTECODE_POS: 7 
 v4 = "openDatabase"               //BYTECODE_POS: 9 
 v5 = "indexedDB"                  //BYTECODE_POS: 11 
 v6 = "attachEvent"                //BYTECODE_POS: 13 
 v7 = "ActiveXObject"              //BYTECODE_POS: 15 
 v8 = "dispatchEvent"              //BYTECODE_POS: 17 
 v9 = "addBehavior"                //BYTECODE_POS: 19 
 v10 = "addEventListener"          //BYTECODE_POS: 21 
 v11 = "detachEvent"               //BYTECODE_POS: 23 
 v12 = "fireEvent"                 //BYTECODE_POS: 25 
 v13 = "MutationObserver"          //BYTECODE_POS: 27 
 v14 = "HTMLMenuItemElement"       //BYTECODE_POS: 29 
 v15 = "Int8Array"                 //BYTECODE_POS: 31 
 v16 = "postMessage"               //BYTECODE_POS: 33 
 v17 = "querySelector"             //BYTECODE_POS: 35 
 v0 = [v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17]//BYTECODE_POS: 37 
 executionStack[3] = v0;           //BYTECODE_POS: 39 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 42 
 v1 = executionStack[2];           //BYTECODE_POS: 43 depth
 v2 = window                       //BYTECODE_POS: 46 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = executionStack[3];           //BYTECODE_POS: 48 depth
 v4 = 0;                           //BYTECODE_POS: 51 
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 53 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 55 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 58 depth
 v1 = undefined                    //BYTECODE_POS: 61 
 v2 = executionStack[2];           //BYTECODE_POS: 62 depth
 v3 = window                       //BYTECODE_POS: 65 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3.performance;              //BYTECODE_POS: 67 
 v4 = "now"                        //BYTECODE_POS: 69 
 v4 = [v4]                         //BYTECODE_POS: 71 
 v5 = executionStack[3];           //BYTECODE_POS: 73 depth
 v5 = v5.length;                   //BYTECODE_POS: 76 
 v1 = v2(v3,v4,v5);                //BYTECODE_POS: 78 // context 1 could be custom vm or native func
 v0 |= v1;                         //BYTECODE_POS: 80 
 //get depth of 0 from executionStack//BYTECODE_POS: 81 
 v1 = executionStack;              //BYTECODE_POS: 81 
 v2 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v1[v2] = v0                       //BYTECODE_POS: 84 
 v0 = {};                          //BYTECODE_POS: 86 
 v1 = executionStack[2];           //BYTECODE_POS: 87 depth
 v0.data = v1;                     //BYTECODE_POS: 90 
 //return v0;                      //BYTECODE_POS: 92 
}