let lastTime = (new Date()).getTime();
/**
 * 节流函数
 * @param {Number} timeout
 * @returns {function(*)}
 */
export default function(timeout = 16) {
  let timer;

  return (fn) => {
    let now = (new Date()).getTime();

    if (now - lastTime > timeout) {
      lastTime = now;
      clearTimeout(timer);
      timer = null;
      fn && fn();
    } else {
      if (!timer) {
        timer = setTimeout(() => {
          timer = null;
          fn && fn();
        }, timeout);
      }
    }
  }
}