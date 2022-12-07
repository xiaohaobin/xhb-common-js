"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// promise的三种状态
// pending 任何回调之前
var PENDING = "pending";
// fulfuilled 成功回调
var FULFUILLED = "fulfuilled";
// rejected 失败回调
var REJECTED = "rejected";

// 初始化状态
var status = PENDING;

// 存放所有的成功回调函数
var sucCallBack = [];

// 存放所有的失败回调函数
var failCallBack = [];

var value = undefined;
var reason = undefined;

// promise是类对象

var MyPromise = function () {
    function MyPromise(excutor) {
        _classCallCheck(this, MyPromise);

        // excutor异常处理
        try {
            // 外部excutor对象，传入两个函数对象，对应 reslove  reject
            excutor(this.reslove, this.reject);
        } catch (error) {
            this.reject(error);
        }
    }

    _createClass(MyPromise, [{
        key: "reslove",
        value: function reslove(value) {
            // 用于阻止非 pending 的调用（执行 resolve 和 reject 必须二选一）
            if (this.status !== PENDING) return;

            this.status = FULFUILLED;
            this.value = value;
            // FIFO
            while (this.sucCallBack.length) {
                this.sucCallBack.shift()();
            }
        }
    }, {
        key: "reject",
        value: function reject(reason) {
            // 用于阻止非 pending 的调用（执行 resolve 和 reject 必须二选一）
            if (this.status !== PENDING) return;

            this.status = REJECTED;
            this.reason = reason;
            // FIFO
            while (this.failCallBack.length) {
                this.failCallBack.shift()();
            }
        }

        // 是能被链式调用的，因此then有返回值，是promise

    }, {
        key: "then",
        value: function then(sucCallBack, failCallBack) {
            var _this = this;

            // then 参数变为可选
            sucCallBack = sucCallBack ? sucCallBack : function (value) {
                return value;
            };
            failCallBack = failCallBack ? failCallBack : function (reason) {
                throw reason;
            };
            // 需要返回新的promise，用于实现then 链式调用
            var newPromise = new MyPromise(function (resolve, reject) {
                // 分情况讨论：同步 和 异步 回调处理
                // 同步
                // 调用then之前，同步status状态已发生变化
                if (_this.status === FULFUILLED) {
                    setTimeout(function () {
                        try {
                            // 成功回调函数
                            var newValue = sucCallBack(_this.value);
                            resolvePromise(newPromise, newValue, resolve, reject);
                        } catch (error) {
                            // 在新promise中处理异常
                            reject(error);
                        }
                    }, 0);
                } else if (_this.status === REJECTED) {

                    setTimeout(function () {
                        try {
                            // 失败回调函数
                            var newValue = failCallBack(_this.reason);
                            resolvePromise(newPromise, newValue, resolve, reject);
                        } catch (error) {
                            // 在新promise中处理异常
                            reject(error);
                        }
                    }, 0);
                }
                // 异步
                else {
                        // 异步status状态未发生变化，先对回调函数做保存
                        _this.sucCallBack.push(function () {
                            setTimeout(function () {
                                try {
                                    // 成功回调函数
                                    var newValue = sucCallBack(_this.value);
                                    resolvePromise(newPromise, newValue, resolve, reject);
                                } catch (error) {
                                    // 在新promise中处理异常
                                    reject(error);
                                }
                            }, 0);
                        });
                        _this.failCallBack.push(function () {
                            failCallBack;
                        });
                    }
            });
            return newPromise;
        }
        // 无论promise对象返回成功还是失败，finally都会被执行一次

    }, {
        key: "finally",
        value: function _finally(callback) {
            // then 的返回值是promise
            // 不管value是promise对象还是普通值，一律返回promise对象，保证异步promise的执行顺序
            return this.then(function (value) {
                return MyPromise.resolve(callback()).then(function () {
                    return value;
                });
            }, function (reason) {
                return MyPromise.resolve(callback()).then(function () {
                    throw reason;
                });
            });
        }

        // 只调用失败

    }, {
        key: "catch",
        value: function _catch(failCallBack) {
            return this.then(undefined, failCallBack);
        }
        // 处理异步并发，按照异步代码调用顺序得到异步代码执行结果，参数为数组，数组值的顺序即结果的顺序，返回值也是promise对象

    }], [{
        key: "all",
        value: function all(array) {

            var result = [];
            var index = 0;

            return new MyPromise(function (resolve, reject) {

                function addData(key, value) {
                    result[key] = value;
                    index++;
                    // 保证所有（同步于异步）结果都获取到后，在resolve
                    if (index === array.length) {
                        resolve(result);
                    }
                }
                array.forEach(function (item, index) {
                    if (item instanceof MyPromise) {
                        // promise对象
                        item.then(function (value) {
                            return addData(index, value);
                        }, function (reason) {
                            return reject(reason);
                        });
                    } else {
                        // 普通值
                        addData(index, item);
                    }
                });
            });
        }
        // 对value进行promise包装，返回值为promise

    }, {
        key: "resolve",
        value: function resolve(value) {
            if (value instanceof MyPromise) {
                return value;
            }
            return new MyPromise(function (reslove) {
                reslove(value);
            });
        }
    }]);

    return MyPromise;
}();

function resolvePromise(newPromise, newValue, resolve, reject) {
    // 分情况讨论：
    // 原promise（防止循环调用）
    if (newPromise === newValue) {
        // 在新promise中处理异常
        reject("cycle call promise");
    }
    // MyPromise
    if (newValue instanceof MyPromise) {
        // 将状态传递给下一个promise对象
        // 🌰 ---- 实现then链式异步顺序调用
        // newValue.then(value=>resolve(value),value=>reject(value))
        newValue.then(resolve, reject);
    }
    // 普通值
    else {
            // 在新promise中处理成功回调
            resolve(newValue);
        }
}
module.exports = MyPromise;