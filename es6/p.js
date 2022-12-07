// promise拆分
function createProcessPromise() {
  let resolve, reject;
  const instance = new Promise((res, rej) => {
    resolve = res;
    reject = rej;
  });
  return {
    instance,
    success: resolve,
    fail: reject,
  };
}

/**
 * 柯里化函数
 * @param {function} fn 需要要执行的函数
 * @param {boolean} isLoading 页面导航栏是否展示loading条
 * @returns function
 */
const promisify = (fn, isLoading = false) => {
  return (obj = {}) => {
    return new Promise((resolve, reject) => {
      obj.success = res => {
        isLoading && alert("succ loading");
        resolve(res);
      };
      obj.fail = err => {
        isLoading && alert("err loading");
        reject(err);
      };
      fn(obj);
    });
  };
};