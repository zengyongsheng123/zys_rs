function VM73(arg0, arg1, arg2, arg3, arg4) {
 var v0,v1,v2; // BYTECODE_POS: GENERATED
 var executionStack = [];          //BYTECODE_POS: GENEREATED 
 v0 = thisContextRef;              //BYTECODE_POS: 1 
 v1 = {};                          //BYTECODE_POS: 2 
 v2 = "open"                       //BYTECODE_POS: 3 
 v1.func = v2;                     //BYTECODE_POS: 5 
 v2 = arguments;                   //BYTECODE_POS: 7 depth
 v1.arguments = v2;                //BYTECODE_POS: 10 
 v1 = [v1]                         //BYTECODE_POS: 12 
 v0._byted_intercept_list = v0;    //BYTECODE_POS: 14 
 v0 = thisContextRef;              //BYTECODE_POS: 16 
 v1 = executionStack[2];           //BYTECODE_POS: 17 depth
 v2 = v1                           //BYTECODE_POS: 20 
 v2 = v2.toUpperCase;              //BYTECODE_POS: 21 
 v1 = v2();                        //BYTECODE_POS: 23 // context 1 could be custom vm or native func
 v0._byted_method = v0;            //BYTECODE_POS: 25 
 v0 = thisContextRef;              //BYTECODE_POS: 27 
 v1 = executionStack[3];           //BYTECODE_POS: 28 depth
 v0._byted_url = v0;               //BYTECODE_POS: 31 
 v0 = executionStack[5];           //BYTECODE_POS: 33 depth
 v1 = v0                           //BYTECODE_POS: 36 
 v1 = v1.apply;                    //BYTECODE_POS: 37 
 v2 = thisContextRef;              //BYTECODE_POS: 39 
 v3 = arguments;                   //BYTECODE_POS: 40 depth
 v0 = v1(v2,v3);                   //BYTECODE_POS: 43 // context 0 could be custom vm or native func
 //return v0;                      //BYTECODE_POS: 45 
}