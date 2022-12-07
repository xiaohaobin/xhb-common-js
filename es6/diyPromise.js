// promise的三种状态
// pending 任何回调之前
const PENDING = "pending";
// fulfuilled 成功回调
const FULFUILLED = "fulfuilled";
// rejected 失败回调
const REJECTED = "rejected";

// 初始化状态
    var status = PENDING;
	
    // 存放所有的成功回调函数
    var sucCallBack = [];
	
    // 存放所有的失败回调函数
    var failCallBack = [];
	
    var value = undefined;
    var reason = undefined;

// promise是类对象
class MyPromise {
    constructor (excutor) {
        // excutor异常处理
        try {
            // 外部excutor对象，传入两个函数对象，对应 reslove  reject
            excutor(this.reslove, this.reject)
        } catch (error) {
            this.reject(error)
        }
    }
	
    
	reslove(value){
		// 用于阻止非 pending 的调用（执行 resolve 和 reject 必须二选一）
		if (this.status !== PENDING) return
		
		this.status = FULFUILLED
		this.value = value
		// FIFO
		while (this.sucCallBack.length) {
		    this.sucCallBack.shift()()
		}
	}
   
	reject(reason){
		// 用于阻止非 pending 的调用（执行 resolve 和 reject 必须二选一）
		if (this.status !== PENDING) return
		
		this.status = REJECTED
		this.reason = reason
		// FIFO
		while (this.failCallBack.length) {
		    this.failCallBack.shift()()
		}
	}
   
    // 是能被链式调用的，因此then有返回值，是promise
    then (sucCallBack, failCallBack) {
        // then 参数变为可选
        sucCallBack = sucCallBack ? sucCallBack : value => value
        failCallBack = failCallBack ? failCallBack : reason => { throw reason }
        // 需要返回新的promise，用于实现then 链式调用
        let newPromise = new MyPromise((resolve, reject) => {
            // 分情况讨论：同步 和 异步 回调处理
            // 同步
            // 调用then之前，同步status状态已发生变化
            if (this.status === FULFUILLED) {
                setTimeout(() => {
                    try {
                        // 成功回调函数
                        let newValue = sucCallBack(this.value)
                        resolvePromise(newPromise, newValue, resolve, reject)   
                    } catch (error) {
                        // 在新promise中处理异常
                        reject(error)
                    }
                }, 0);
            }
            else if (this.status === REJECTED) {

                setTimeout(() => {
                    try {
                        // 失败回调函数
                        let newValue = failCallBack(this.reason)
                        resolvePromise(newPromise, newValue, resolve, reject)   
                    } catch (error) {
                        // 在新promise中处理异常
                        reject(error)
                    }
                }, 0);

                
            }
            // 异步
            else
            {
                // 异步status状态未发生变化，先对回调函数做保存
                this.sucCallBack.push(() => {
                    setTimeout(() => {
                        try {
                            // 成功回调函数
                            let newValue = sucCallBack(this.value)
                            resolvePromise(newPromise, newValue, resolve, reject)   
                        } catch (error) {
                            // 在新promise中处理异常
                            reject(error)
                        }
                    }, 0);
                })
                this.failCallBack.push(() => {
                    failCallBack
                })
            }
        })
        return newPromise
    }
    // 无论promise对象返回成功还是失败，finally都会被执行一次
    finally (callback) {
        // then 的返回值是promise
        // 不管value是promise对象还是普通值，一律返回promise对象，保证异步promise的执行顺序
        return this.then(value => {
            return MyPromise.resolve(callback()).then(()=>value)
        },reason => {
            return MyPromise.resolve(callback()).then(()=>{throw reason})
        })
    }

    // 只调用失败
    catch (failCallBack) {
        return this.then(undefined, failCallBack)
    }
    // 处理异步并发，按照异步代码调用顺序得到异步代码执行结果，参数为数组，数组值的顺序即结果的顺序，返回值也是promise对象
    static all(array) {
 
        let result = []
        let index = 0
        
        return new MyPromise((resolve, reject)=>{

            function addData(key, value) {
                result[key] = value
                index ++
                // 保证所有（同步于异步）结果都获取到后，在resolve
                if (index === array.length) {
                    resolve(result)
                }
            }
            array.forEach((item, index) => {
                if (item instanceof MyPromise) {
                    // promise对象
                    item.then(value=>addData(index,value),reason=>reject(reason))
                }
                else 
                {
                    // 普通值
                    addData(index, item)
                }
            })
        })
    }
    // 对value进行promise包装，返回值为promise
    static resolve(value) {
        if (value instanceof MyPromise) {
            return value
        }
        return new MyPromise(reslove=>{
            reslove(value)
        })
    }
    
}

function resolvePromise(newPromise, newValue, resolve, reject) {
    // 分情况讨论：
    // 原promise（防止循环调用）
    if (newPromise === newValue) {
        // 在新promise中处理异常
        reject("cycle call promise")
    }
    // MyPromise
    if (newValue instanceof MyPromise) {
        // 将状态传递给下一个promise对象
        // 🌰 ---- 实现then链式异步顺序调用
        // newValue.then(value=>resolve(value),value=>reject(value))
        newValue.then(resolve,reject)
    }
    // 普通值
    else
    {
        // 在新promise中处理成功回调
        resolve(newValue)
    }
}
module.exports = MyPromise
