function VM25() {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = []                           //BYTECODE_POS: 1 
 executionStack[2] = v0;           //BYTECODE_POS: 3 // depth = 0
 v0 = executionStack[2];           //BYTECODE_POS: 6 depth
 v0 = v0.wID;                      //BYTECODE_POS: 9 
 v1 = ""                           //BYTECODE_POS: 11 
 v0.permState = v0;                //BYTECODE_POS: 13 
 v0 = navigator                    //BYTECODE_POS: 15 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v0 = v0.permissions;              //BYTECODE_POS: 17 
 v0 = !v0                          //BYTECODE_POS: 19 
 // if (!v0) skip to 32            //BYTECODE_POS: 20 
 v0 = "6"                          //BYTECODE_POS: 22 
 v1 = executionStack[2];           //BYTECODE_POS: 24 depth
 v1 = v1.wID;                      //BYTECODE_POS: 27 
 v2 = "nap"                        //BYTECODE_POS: 29 
 v1[v2] = v0                       //BYTECODE_POS: 31 
 //return v0;                      //BYTECODE_POS: 32 
 v0 = "geolocation"                //BYTECODE_POS: 33 
 v1 = "notifications"              //BYTECODE_POS: 35 
 v2 = "push"                       //BYTECODE_POS: 37 
 v3 = "midi"                       //BYTECODE_POS: 39 
 v4 = "camera"                     //BYTECODE_POS: 41 
 v5 = "microphone"                 //BYTECODE_POS: 43 
 v6 = "speaker"                    //BYTECODE_POS: 45 
 v7 = "device-info"                //BYTECODE_POS: 47 
 v8 = "background-sync"            //BYTECODE_POS: 49 
 v9 = "bluetooth"                  //BYTECODE_POS: 51 
 v10 = "persistent-storage"        //BYTECODE_POS: 53 
 v11 = "ambient-light-sensor"      //BYTECODE_POS: 55 
 v12 = "accelerometer"             //BYTECODE_POS: 57 
 v13 = "gyroscope"                 //BYTECODE_POS: 59 
 v14 = "magnetometer"              //BYTECODE_POS: 61 
 v15 = "clipboard"                 //BYTECODE_POS: 63 
 v16 = "accessibility-events"      //BYTECODE_POS: 65 
 v17 = "clipboard-read"            //BYTECODE_POS: 67 
 v18 = "clipboard-write"           //BYTECODE_POS: 69 
 v19 = "payment-handler"           //BYTECODE_POS: 71 
 v0 = [v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15,v16,v17,v18,v19]//BYTECODE_POS: 73 
 executionStack[3] = v0;           //BYTECODE_POS: 75 // depth = 0
 v0 = functionVM26;                //BYTECODE_POS: 78 
 v1 = v0                           //BYTECODE_POS: 80 
 executionStack[6] = v1;           //BYTECODE_POS: 81 // depth = 0
 executionStack[4] = v0;           //BYTECODE_POS: 84 // depth = 0
 v0 = executionStack[3];           //BYTECODE_POS: 87 depth
 v1 = v0                           //BYTECODE_POS: 90 
 v1 = v1.map;                      //BYTECODE_POS: 91 
 v2 = functionVM29;                //BYTECODE_POS: 93 
 v0 = v1(v2);                      //BYTECODE_POS: 95 // context 0 could be custom vm or native func
 executionStack[5] = v0;           //BYTECODE_POS: 97 // depth = 0
 v0 = Promise                      //BYTECODE_POS: 100 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v1 = v0                           //BYTECODE_POS: 102 
 v1 = v1.all;                      //BYTECODE_POS: 103 
 v2 = executionStack[5];           //BYTECODE_POS: 105 depth
 v0 = v1(v2);                      //BYTECODE_POS: 108 // context 0 could be custom vm or native func
 v1 = v0                           //BYTECODE_POS: 110 
 v1 = v1.then;                     //BYTECODE_POS: 111 
 v2 = functionVM30;                //BYTECODE_POS: 113 
 v0 = v1(v2);                      //BYTECODE_POS: 115 // context 0 could be custom vm or native func
 // go foward to 133               //BYTECODE_POS: 118 
 executionStack[7] = v-1;          //BYTECODE_POS: 120 // depth = 0
 v-1 = "7"                         //BYTECODE_POS: 123 
 v0 = executionStack[2];           //BYTECODE_POS: 125 depth
 v0 = v0.wID;                      //BYTECODE_POS: 128 
 v1 = "nap"                        //BYTECODE_POS: 130 
 v0[v1] = v-1                      //BYTECODE_POS: 132 
 //return v-1;                     //BYTECODE_POS: 133 
 v-1 = undefined                   //BYTECODE_POS: 134 
 //return v-1;                     //BYTECODE_POS: 135 
}