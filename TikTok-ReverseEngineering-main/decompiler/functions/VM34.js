function VM34(arg0) {
 var v0,v1,v2,v3,v4; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = {};                          //BYTECODE_POS: 1 
 executionStack[3] = v0;           //BYTECODE_POS: 2 // depth = 0
 v0 = {};                          //BYTECODE_POS: 5 
 v1 = executionStack[2];           //BYTECODE_POS: 6 depth
 v1 = v1.charging;                 //BYTECODE_POS: 9 
 // if (!v1) skip to 16            //BYTECODE_POS: 11 
 v1 = 1;                           //BYTECODE_POS: 13 
 // go foward to 18                //BYTECODE_POS: 15 
 v2 = 2;                           //BYTECODE_POS: 17 
 v1.charging = v2;                 //BYTECODE_POS: 19 
 v2 = Math                         //BYTECODE_POS: 21 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = v2                           //BYTECODE_POS: 23 
 v3 = v3.round;                    //BYTECODE_POS: 24 
 v4 = executionStack[2];           //BYTECODE_POS: 26 depth
 v4 = v4.level;                    //BYTECODE_POS: 29 
 v5 = 100;                         //BYTECODE_POS: 31 
 v4 *= v5                          //BYTECODE_POS: 33 
 v2 = v3(v4);                      //BYTECODE_POS: 34 // context 2 could be custom vm or native func
 v1.level = v2;                    //BYTECODE_POS: 36 
 v2 = ""                           //BYTECODE_POS: 38 
 v3 = executionStack[2];           //BYTECODE_POS: 40 depth
 v3 = v3.chargingTime;             //BYTECODE_POS: 43 
 v2 += v3                          //BYTECODE_POS: 45 
 v1.chargingTime = v2;             //BYTECODE_POS: 46 
 v2 = ""                           //BYTECODE_POS: 48 
 v3 = executionStack[2];           //BYTECODE_POS: 50 depth
 v3 = v3.dischargingTime;          //BYTECODE_POS: 53 
 v2 += v3                          //BYTECODE_POS: 55 
 v1.dischargingTime = v2;          //BYTECODE_POS: 56 
 executionStack[3] = v1;           //BYTECODE_POS: 58 // depth = 0
 // go foward to 84                //BYTECODE_POS: 61 
 executionStack[4] = v0;           //BYTECODE_POS: 63 // depth = 0
 v0 = executionStack[11];          //BYTECODE_POS: 66 depth
 v1 = v0                           //BYTECODE_POS: 69 
 v1 = v1.push;                     //BYTECODE_POS: 70 
 v2 = {};                          //BYTECODE_POS: 72 
 v3 = executionStack[4];           //BYTECODE_POS: 73 depth
 v2.err = v3;                      //BYTECODE_POS: 76 
 v3 = "d_b"                        //BYTECODE_POS: 78 
 v2.type = v3;                     //BYTECODE_POS: 80 
 v0 = v1(v2);                      //BYTECODE_POS: 82 // context 0 could be custom vm or native func
 v0 = executionStack[3];           //BYTECODE_POS: 85 depth
 //return v0;                      //BYTECODE_POS: 88 
}