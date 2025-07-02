function VM50() {
 var v0,v1,v2,v3,v4,v5; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = document                     //BYTECODE_POS: 1 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 3 
 v1 = v1.createElement;            //BYTECODE_POS: 4 
 v2 = "canvas"                     //BYTECODE_POS: 6 
 v0 = v1(v2);                      //BYTECODE_POS: 8 // context 0 could be custom vm or native func
 executionStack[2] = v0;           //BYTECODE_POS: 10 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 13 depth
 v1 = 48;                          //BYTECODE_POS: 16 
 v0.width = v0;                    //BYTECODE_POS: 18 
 v0 = executionStack[2];           //BYTECODE_POS: 20 depth
 v1 = 16;                          //BYTECODE_POS: 23 
 v0.height = v0;                   //BYTECODE_POS: 25 
 v0 = executionStack[2];           //BYTECODE_POS: 27 depth
 v1 = v0                           //BYTECODE_POS: 30 
 v1 = v1.getContext;               //BYTECODE_POS: 31 
 v2 = "2d"                         //BYTECODE_POS: 33 
 v0 = v1(v2);                      //BYTECODE_POS: 35 // context 0 could be custom vm or native func
 executionStack[3] = v0;           //BYTECODE_POS: 37 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 40 depth
 v1 = "14px serif"                 //BYTECODE_POS: 43 
 v0.font = v0;                     //BYTECODE_POS: 45 
 v0 = executionStack[3];           //BYTECODE_POS: 47 depth
 v1 = v0                           //BYTECODE_POS: 50 
 v1 = v1.fillText;                 //BYTECODE_POS: 51 
 v2 = "龘ฑภ경"                       //BYTECODE_POS: 53 
 v3 = 2;                           //BYTECODE_POS: 55 
 v4 = 12;                          //BYTECODE_POS: 57 
 v0 = v1(v2,v3,v4);                //BYTECODE_POS: 59 // context 0 could be custom vm or native func
 v0 = executionStack[3];           //BYTECODE_POS: 62 depth
 v1 = 2;                           //BYTECODE_POS: 65 
 v0.shadowBlur = v0;               //BYTECODE_POS: 67 
 v0 = executionStack[3];           //BYTECODE_POS: 69 depth
 v1 = 1;                           //BYTECODE_POS: 72 
 v0.showOffsetX = v0;              //BYTECODE_POS: 74 
 v0 = executionStack[3];           //BYTECODE_POS: 76 depth
 v1 = "lime"                       //BYTECODE_POS: 79 
 v0.showColor = v0;                //BYTECODE_POS: 81 
 v0 = executionStack[3];           //BYTECODE_POS: 83 depth
 v1 = v0                           //BYTECODE_POS: 86 
 v1 = v1.arc;                      //BYTECODE_POS: 87 
 v2 = 8;                           //BYTECODE_POS: 89 
 v3 = 8;                           //BYTECODE_POS: 91 
 v4 = 8;                           //BYTECODE_POS: 93 
 v5 = 0;                           //BYTECODE_POS: 95 
 v6 = 2;                           //BYTECODE_POS: 97 
 v0 = v1(v2,v3,v4,v5,v6);          //BYTECODE_POS: 99 // context 0 could be custom vm or native func
 v0 = executionStack[3];           //BYTECODE_POS: 102 depth
 v1 = v0                           //BYTECODE_POS: 105 
 v1 = v1.stroke;                   //BYTECODE_POS: 106 
 v0 = v1();                        //BYTECODE_POS: 108 // context 0 could be custom vm or native func
 v0 = executionStack[2];           //BYTECODE_POS: 111 depth
 v1 = v0                           //BYTECODE_POS: 114 
 v1 = v1.toDataURL;                //BYTECODE_POS: 115 
 v0 = v1();                        //BYTECODE_POS: 117 // context 0 could be custom vm or native func
 executionStack[4] = v0;           //BYTECODE_POS: 119 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 122 
 v1 = executionStack[0];           //BYTECODE_POS: 123 depth
 v2 = executionStack[4];           //BYTECODE_POS: 126 depth
 v0 = v1(v2);                      //BYTECODE_POS: 129 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 131 
}