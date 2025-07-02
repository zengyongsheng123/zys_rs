function VM18() {
 var v0,v1; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = window                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.ActiveXObject;            //BYTECODE_POS: 3 
 // if (!v0) skip to 96            //BYTECODE_POS: 5 
 v0 = 2;                           //BYTECODE_POS: 7 
 executionStack[2] = v0;           //BYTECODE_POS: 9 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 12 depth
 v1 = 10;                          //BYTECODE_POS: 15 
 v0 = v0 < v1;                     //BYTECODE_POS: 17 
 // if (!v0) skip to 56            //BYTECODE_POS: 18 
 v0 = window                       //BYTECODE_POS: 20 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.ActiveXObject;            //BYTECODE_POS: 22 
 v1 = "PDF.PdfCtrl."               //BYTECODE_POS: 24 
 v2 = executionStack[2];           //BYTECODE_POS: 26 depth
 v1 += v2                          //BYTECODE_POS: 29 
 v0 = new v0()                     //BYTECODE_POS: 30 
 v0 = !v0                          //BYTECODE_POS: 32 
 v0 = !v0                          //BYTECODE_POS: 33 
 // if (!v0) skip 8 to 43          //BYTECODE_POS: 34 
 v1 = executionStack[2];           //BYTECODE_POS: 36 depth
 v2 = v1                           //BYTECODE_POS: 39 
 v2 = v2.toString;                 //BYTECODE_POS: 40 
 v1 = v2();                        //BYTECODE_POS: 42 // context 1 could be custom vm or native func
 //return v1;                      //BYTECODE_POS: 44 
 // go foward to 49                //BYTECODE_POS: 45 
 executionStack[3] = v0;           //BYTECODE_POS: 47 // depth = 0
 //get depth of 0 from executionStack//BYTECODE_POS: 50 
 v0 = executionStack;              //BYTECODE_POS: 50 
 v1 = 2                            //BYTECODE_POS: NO BYTECODE POS ADDED 
 v0 = v0[v1]++                     //BYTECODE_POS: 53 // replace the executionStack var with an index incremented
 // go back to 11                  //BYTECODE_POS: 55 
 v0 = window                       //BYTECODE_POS: 57 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.ActiveXObject;            //BYTECODE_POS: 59 
 v1 = "PDF.PdfCtrl.1"              //BYTECODE_POS: 61 
 v0 = new v0()                     //BYTECODE_POS: 63 
 v0 = !v0                          //BYTECODE_POS: 65 
 v0 = !v0                          //BYTECODE_POS: 66 
 // if (!v0) skip 2 to 70          //BYTECODE_POS: 67 
 v1 = "4"                          //BYTECODE_POS: 69 
 //return v1;                      //BYTECODE_POS: 71 
 // go foward to 76                //BYTECODE_POS: 72 
 executionStack[4] = v0;           //BYTECODE_POS: 74 // depth = 0
 v0 = window                       //BYTECODE_POS: 77 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.ActiveXObject;            //BYTECODE_POS: 79 
 v1 = "AcroPDF.PDF.1"              //BYTECODE_POS: 81 
 v0 = new v0()                     //BYTECODE_POS: 83 
 v0 = !v0                          //BYTECODE_POS: 85 
 v0 = !v0                          //BYTECODE_POS: 86 
 // if (!v0) skip 2 to 90          //BYTECODE_POS: 87 
 v1 = "7"                          //BYTECODE_POS: 89 
 //return v1;                      //BYTECODE_POS: 91 
 // go foward to 96                //BYTECODE_POS: 92 
 executionStack[5] = v0;           //BYTECODE_POS: 94 // depth = 0
 v0 = "0"                          //BYTECODE_POS: 97 
 //return v0;                      //BYTECODE_POS: 99 
}