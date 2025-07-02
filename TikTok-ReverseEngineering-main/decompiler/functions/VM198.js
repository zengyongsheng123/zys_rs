function VM198() {
 var v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = "Image"                      //BYTECODE_POS: 1 
 v1 = "innerHeight"                //BYTECODE_POS: 3 
 v2 = "innerWidth"                 //BYTECODE_POS: 5 
 v3 = "screenX"                    //BYTECODE_POS: 7 
 v4 = "screenY"                    //BYTECODE_POS: 9 
 v5 = "isSecureContext"            //BYTECODE_POS: 11 
 v6 = "devicePixelRatio"           //BYTECODE_POS: 13 
 v7 = "toolbar"                    //BYTECODE_POS: 15 
 v8 = "locationbar"                //BYTECODE_POS: 17 
 v9 = "ActiveXObject"              //BYTECODE_POS: 19 
 v10 = "external"                  //BYTECODE_POS: 21 
 v11 = "mozRTCPeerConnection"      //BYTECODE_POS: 23 
 v12 = "postMessage"               //BYTECODE_POS: 25 
 v13 = "webkitRequestAnimationFrame"//BYTECODE_POS: 27 
 v14 = "BluetoothUUID"             //BYTECODE_POS: 29 
 v15 = "netscape"                  //BYTECODE_POS: 31 
 v0 = [v0,v1,v2,v3,v4,v5,v6,v7,v8,v9,v10,v11,v12,v13,v14,v15]//BYTECODE_POS: 33 
 executionStack[2] = v0;           //BYTECODE_POS: 35 // depth = 0
 v0 = undefined                    //BYTECODE_POS: 38 
 v1 = executionStack[2];           //BYTECODE_POS: 39 depth
 v2 = window                       //BYTECODE_POS: 42 // return 'new ReferenceError(Z + " is not defined")' if not in globalThis
 v3 = executionStack[2];           //BYTECODE_POS: 44 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 47 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 49 
}