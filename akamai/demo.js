 function watch(obj,name){
    return new Proxy(obj,{
        get: function (target,property){
            try {
                if (typeof target[property] === "function"){
                    console.log("对象=>"+name+"对象属性:"+property+"，值为："+"function"+",类型为："+(typeof target[property]))
                } else {
                    console.log("对象=>"+name+"对象属性:"+property+"，值为："+ target[property] +",类型为："+(typeof target[property]))
                }
            }catch (e){
            }
            return target[property]
        },
        set:(target,property,newValue,receiver)=>{
                try{
                    console.log("对象=>"+name+"对象属性:"+property+"，值为："+ newValue +",类型为："+(typeof newValue))
                }catch (e) {
                }
                return Reflect.set(target,property,newValue,receiver)
            }
    })
}
window = global
watch(window,"window")