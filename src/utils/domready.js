let stamp = 0;
const CHECK_INTERVAL = 10;
const CALLBACKS = [];

function domContentLoaded() {
  if (stamp) {
    return;
  }

  stamp = new Date().getTime();
  for (let i=0; i<CALLBACKS.length; i++) {
    CALLBACKS[i](stamp);
  }

  if (document.removeEventListener) {
    document.removeEventListener('DOMContentLoaded', domContentLoaded, false);
  } else if (document.detachEvent) {
    document.detachEvent('onreadystatechange', domContentLoaded);
  }
}

(function() {
  let readyState = document.readyState;
  if (readyState === 'complete' || (readyState !== 'loading' && document.addEventListener)) {
    // Handle it asynchronously to allow scripts the opportunity to delay ready
    setTimeout(domContentLoaded, 1);
  } else if (document.addEventListener) {
    document.addEventListener('DOMContentLoaded', domContentLoaded, false);
  } else if (document.attachEvent) {
    document.attachEvent('onreadystatechange', domContentLoaded);

    // @sea http://code.jquery.com/jquery-1.8.0.js
    if (!stamp) {
      let top = false;

      try {
        top = window.frameElement === null && document.documentElement;
      } catch(e) {}

      if (top && top.doScroll) {
        // 5s timeout
        let maxRetry = Math.ceil(5e3 / CHECK_INTERVAL);
        let retryCounter = 0;

        (function doScrollCheck() {
          if (!stamp && (retryCounter++ < maxRetry)) {
            try {
              // @sea http://javascript.nwbox.com/IEContentLoaded/
              top.doScroll('left');

              // TODO 此时调用domContentLoaded
              // 会导致前面绑定失败（domContentLoaded为undefined）
              stamp = new Date().getTime();
              for (let i=0; i<CALLBACKS.length; i++) {
                CALLBACKS[i](stamp);
              }
            } catch (e) {
              setTimeout(doScrollCheck, CHECK_INTERVAL);
            }
          }
        })();
      }
    }
  }
})();

/**
 * DOMContentLoaded监听器
 * @param {Function} cb
 * 回调参数：stamp, DOMContentLoaded时的时间戳
 */
export default function(cb) {
  if (typeof cb === 'function') {
    if (stamp) {
      cb(stamp);
    } else {
      CALLBACKS.push(cb);
    }
  }
};