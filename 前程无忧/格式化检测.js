/*****
 File:格式化检测.js
 Author:南宫啸天
 Date:2025/5/26 22:24
 *****/


//我这里随便去定义一个函数

var testcode=function(){
    return "testcode";
}

//这是检测代码是否格式化的函数
var isFormat=function(){
    var bools=new RegExp("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}").test(testcode.toString())
    if(!bools){
        return "格式化代码";
    }
    else{
        return "未格式化代码";
    }
    // return new RegExp("\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}").test(testcode.toString());
}

console.log(isFormat());


//\w+ *\(\) *{\w+ *['|"].+['|"];? *}含义
//这个正则他就是代表去匹配 function (){......}这样的函数
//如果代码格式化了function (){
// ......
// }
//就会变成这样 就匹配不到了 就返回false 压缩是一种办法 hook正则也可以的


//我们现在讲第二中检测方式

function isFormat2(){
    var len=testcode.toString().split("\r\n");
    if(len.length>1){
        return "格式化代码";
    }
    else{
        return "未格式化代码";
    }

}

console.log(isFormat2());


//直接hook正则
(function(){
  const originalTest = RegExp.prototype.test;
  RegExp.prototype.test = function(str) {
    if (this.source === "\\w+ *\\(\\) *{\\w+ *['|\"].+['|\"];? *}") {
      return true; // 强制绕过检测
    }
    return originalTest.call(this, str);
  };
})()

//我到时候给你讲 我们看看效果

