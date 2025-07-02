function VM254() {
 var v0,v1,v2,v3,v4,v5,v6; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = undefined                    //BYTECODE_POS: 1 
 v1 = executionStack[0];           //BYTECODE_POS: 2 depth
 v0 = v1();                        //BYTECODE_POS: 5 // context 0 could be custom vm or native func
 v0 = !v0                          //BYTECODE_POS: 7 
 // if (!v0) skip to 60            //BYTECODE_POS: 8 
 v0 = "plugins"                    //BYTECODE_POS: 10 
 v1 = navigator                    //BYTECODE_POS: 12 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0 in v1                     //BYTECODE_POS: 14 
 v0 = !v0                          //BYTECODE_POS: 15 
 // if (v0) skip 8                 //BYTECODE_POS: 16 
 v1 = navigator                    //BYTECODE_POS: 18 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1.plugins;                  //BYTECODE_POS: 20 
 v2 = PluginArray                  //BYTECODE_POS: 22 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v1 instanceof v2;            //BYTECODE_POS: 24 
 v1 = !v1                          //BYTECODE_POS: 25 
 // if (v1) skip 5                 //BYTECODE_POS: 26 
 v2 = "_phantom"                   //BYTECODE_POS: 28 
 v3 = window                       //BYTECODE_POS: 30 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v2 = v2 in v3                     //BYTECODE_POS: 32 
 // if (v2) skip 5                 //BYTECODE_POS: 33 
 v3 = "callPhantom"                //BYTECODE_POS: 35 
 v4 = window                       //BYTECODE_POS: 37 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v3 in v4                     //BYTECODE_POS: 39 
 // if (v3) skip 5                 //BYTECODE_POS: 40 
 v4 = "__nightmare"                //BYTECODE_POS: 42 
 v5 = window                       //BYTECODE_POS: 44 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v4 = v4 in v5                     //BYTECODE_POS: 46 
 // if (v4) skip 11                //BYTECODE_POS: 47 
 v5 = "Audio"                      //BYTECODE_POS: 49 
 v6 = window                       //BYTECODE_POS: 51 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v5 = v5 in v6                     //BYTECODE_POS: 53 
 v6 = "CanvasRenderingContext2D"   //BYTECODE_POS: 54 
 v7 = window                       //BYTECODE_POS: 56 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v6 = v6 in v7                     //BYTECODE_POS: 58 
 v5 = v5 < v6;                     //BYTECODE_POS: 59 
 //return v5;                      //BYTECODE_POS: 60 
 v5 = false;                       //BYTECODE_POS: 61 
 //return v5;                      //BYTECODE_POS: 62 
}