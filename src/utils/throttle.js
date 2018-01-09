/**
 * 节流函数
 * @param {Number} timeout
 * @returns {function(*)}
 */
export default function(timeout = 50) {
  let timer;

  return (fn) => {
    if (timer) {
      return;
    }

    timer = setTimeout(() => {
      timer = null;
      fn && fn();
    }, timeout);
  }
}