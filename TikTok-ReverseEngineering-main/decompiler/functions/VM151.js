function VM151() {
 var v0,v1,v2,v3,v4,v5,v6; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = window                       //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.matchMedia;               //BYTECODE_POS: 3 
 v0 = typeof v0;                   //BYTECODE_POS: 5 
 v1 = "function"                   //BYTECODE_POS: 6 
 v0 = v0 !== v1;                   //BYTECODE_POS: 8 
 // if (!v0) skip to 12            //BYTECODE_POS: 9 
 v0 = {};                          //BYTECODE_POS: 11 
 //return v0;                      //BYTECODE_POS: 12 
 v0 = {};                          //BYTECODE_POS: 13 
 v1 = undefined                    //BYTECODE_POS: 14 
 v2 = executionStack[3];           //BYTECODE_POS: 15 depth
 v3 = "resolution"                 //BYTECODE_POS: 18 
 v4 = 1;                           //BYTECODE_POS: 20 
 v5 = +1.5                         //BYTECODE_POS: 22 
 v6 = 2;                           //BYTECODE_POS: 24 
 v7 = 3;                           //BYTECODE_POS: 26 
 v4 = [v4,v5,v6,v7]                //BYTECODE_POS: 28 
 v5 = "dppx"                       //BYTECODE_POS: 30 
 v1 = v2(v3,v4,v5);                //BYTECODE_POS: 32 // context 1 could be custom vm or native func
 v0.dppx = v1;                     //BYTECODE_POS: 34 
 v1 = undefined                    //BYTECODE_POS: 36 
 v2 = executionStack[3];           //BYTECODE_POS: 37 depth
 v3 = "orientation"                //BYTECODE_POS: 40 
 v4 = "landscape"                  //BYTECODE_POS: 42 
 v5 = "portrait"                   //BYTECODE_POS: 44 
 v4 = [v4,v5]                      //BYTECODE_POS: 46 
 v5 = ""                           //BYTECODE_POS: 48 
 v1 = v2(v3,v4,v5);                //BYTECODE_POS: 50 // context 1 could be custom vm or native func
 v0.orientation = v1;              //BYTECODE_POS: 52 
 v1 = undefined                    //BYTECODE_POS: 54 
 v2 = executionStack[3];           //BYTECODE_POS: 55 depth
 v3 = "hover"                      //BYTECODE_POS: 58 
 v4 = "none"                       //BYTECODE_POS: 60 
 v5 = "hover"                      //BYTECODE_POS: 62 
 v4 = [v4,v5]                      //BYTECODE_POS: 64 
 v5 = ""                           //BYTECODE_POS: 66 
 v1 = v2(v3,v4,v5);                //BYTECODE_POS: 68 // context 1 could be custom vm or native func
 v0.hover = v1;                    //BYTECODE_POS: 70 
 v1 = undefined                    //BYTECODE_POS: 72 
 v2 = executionStack[3];           //BYTECODE_POS: 73 depth
 v3 = "any-pointer"                //BYTECODE_POS: 76 
 v4 = "none"                       //BYTECODE_POS: 78 
 v5 = "coarse"                     //BYTECODE_POS: 80 
 v6 = "fine"                       //BYTECODE_POS: 82 
 v4 = [v4,v5,v6]                   //BYTECODE_POS: 84 
 v5 = ""                           //BYTECODE_POS: 86 
 v1 = v2(v3,v4,v5);                //BYTECODE_POS: 88 // context 1 could be custom vm or native func
 v0.anyPointer = v1;               //BYTECODE_POS: 90 
 v1 = undefined                    //BYTECODE_POS: 92 
 v2 = executionStack[2];           //BYTECODE_POS: 93 depth
 v3 = "max-height"                 //BYTECODE_POS: 96 
 v4 = 100;                         //BYTECODE_POS: 98 
 v5 = 15360;                       //BYTECODE_POS: 100 
 v6 = "px"                         //BYTECODE_POS: 102 
 v1 = v2(v3,v4,v5,v6);             //BYTECODE_POS: 104 // context 1 could be custom vm or native func
 v0.maxHeight = v1;                //BYTECODE_POS: 106 
 v1 = undefined                    //BYTECODE_POS: 108 
 v2 = executionStack[2];           //BYTECODE_POS: 109 depth
 v3 = "max-width"                  //BYTECODE_POS: 112 
 v4 = 100;                         //BYTECODE_POS: 114 
 v5 = 8640;                        //BYTECODE_POS: 116 
 v6 = "px"                         //BYTECODE_POS: 118 
 v1 = v2(v3,v4,v5,v6);             //BYTECODE_POS: 120 // context 1 could be custom vm or native func
 v0.maxWidth = v1;                 //BYTECODE_POS: 122 
 v1 = undefined                    //BYTECODE_POS: 124 
 v2 = executionStack[2];           //BYTECODE_POS: 125 depth
 v3 = "max-resolution"             //BYTECODE_POS: 128 
 v4 = 50;                          //BYTECODE_POS: 130 
 v5 = 400;                         //BYTECODE_POS: 132 
 v6 = "dpi"                        //BYTECODE_POS: 134 
 v1 = v2(v3,v4,v5,v6);             //BYTECODE_POS: 136 // context 1 could be custom vm or native func
 v0.dpi = v1;                      //BYTECODE_POS: 138 
 //return v0;                      //BYTECODE_POS: 140 
}