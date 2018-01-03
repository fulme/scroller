/**
 * 防抖函数
 * @param {Number} timeout
 * @returns {function(*=)}
 */
export default function(timeout = 100) {
  let timer;

  return (fn) => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      fn && fn();
    }, timeout);
  }
}