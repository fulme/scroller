/**
 * @fileOverview 用于多个异步任务完成后回调，类似于`Promise.all`
 * @param {Number} count  异步任务个数
 * @param {Function} cb   回调函数
 * @returns {Function}    单个异步任务回调函数
 */
export default function (count, cb) {
  let counter = 0;
  let list = [];

  return function(result) {
    list.push(result);

    if (++counter === count) {
      cb && cb(list);
    }
  }
}