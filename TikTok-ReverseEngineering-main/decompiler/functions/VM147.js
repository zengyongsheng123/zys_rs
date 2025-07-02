function VM147(arg0) {
 var v0,v1,v2,v3; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = executionStack[2];           //BYTECODE_POS: 1 depth
 v1 = v0                           //BYTECODE_POS: 4 
 v1 = v1.getExtension;             //BYTECODE_POS: 5 
 v2 = "EXT_texture_filter_anisotropic"//BYTECODE_POS: 7 
 v0 = v1(v2);                      //BYTECODE_POS: 9 // context 0 could be custom vm or native func
 // if (v0) skip 10                //BYTECODE_POS: 11 
 v1 = executionStack[2];           //BYTECODE_POS: 13 depth
 v2 = v1                           //BYTECODE_POS: 16 
 v2 = v2.getExtension;             //BYTECODE_POS: 17 
 v3 = "WEBKIT_EXT_texture_filter_anisotropic"//BYTECODE_POS: 19 
 v1 = v2(v3);                      //BYTECODE_POS: 21 // context 1 could be custom vm or native func
 // if (v1) skip 10                //BYTECODE_POS: 23 
 v2 = executionStack[2];           //BYTECODE_POS: 25 depth
 v3 = v2                           //BYTECODE_POS: 28 
 v3 = v3.getExtension;             //BYTECODE_POS: 29 
 v4 = "MOZ_EXT_texture_filter_anisotropic"//BYTECODE_POS: 31 
 v2 = v3(v4);                      //BYTECODE_POS: 33 // context 2 could be custom vm or native func
 executionStack[3] = v2;           //BYTECODE_POS: 35 // depth = 0
 v2 = executionStack[3];           //BYTECODE_POS: 38 depth
 // if (!v2) skip to 77            //BYTECODE_POS: 41 
 v2 = executionStack[2];           //BYTECODE_POS: 43 depth
 v3 = v2                           //BYTECODE_POS: 46 
 v3 = v3.getParameter;             //BYTECODE_POS: 47 
 v4 = executionStack[3];           //BYTECODE_POS: 49 depth
 v4 = v4.MAX_TEXTURE_MAX_ANISOTROPY_EXT;//BYTECODE_POS: 52 
 v2 = v3(v4);                      //BYTECODE_POS: 54 // context 2 could be custom vm or native func
 executionStack[4] = v2;           //BYTECODE_POS: 56 // depth = 0
 v2 = executionStack[4];           //BYTECODE_POS: 59 depth
 v3 = 0;                           //BYTECODE_POS: 62 
 v2 = v2 === v3                    //BYTECODE_POS: 64 
 // if (!v2) skip to 71            //BYTECODE_POS: 65 
 v2 = 2;                           //BYTECODE_POS: 67 
 executionStack[4] = v2;           //BYTECODE_POS: 69 // depth = 0
 v2 = executionStack[4];           //BYTECODE_POS: 72 depth
 //return v2;                      //BYTECODE_POS: 75 
 // go foward to 79                //BYTECODE_POS: 76 
 v2 = null                         //BYTECODE_POS: 78 
 //return v2;                      //BYTECODE_POS: 79 
 v2 = undefined                    //BYTECODE_POS: 80 
 //return v2;                      //BYTECODE_POS: 81 
}