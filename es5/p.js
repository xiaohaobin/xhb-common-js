"use strict";

// promise拆分
function createProcessPromise() {
  var resolve = void 0,
      reject = void 0;
  var instance = new Promise(function (res, rej) {
    resolve = res;
    reject = rej;
  });
  return {
    instance: instance,
    success: resolve,
    fail: reject
  };
}

/**
 * 柯里化函数
 * @param {function} fn 需要要执行的函数
 * @param {boolean} isLoading 页面导航栏是否展示loading条
 * @returns function
 */
var promisify = function promisify(fn) {
  var isLoading = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

  return function () {
    var obj = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    return new Promise(function (resolve, reject) {
      obj.success = function (res) {
        isLoading && alert("succ loading");
        resolve(res);
      };
      obj.fail = function (err) {
        isLoading && alert("err loading");
        reject(err);
      };
      fn(obj);
    });
  };
};