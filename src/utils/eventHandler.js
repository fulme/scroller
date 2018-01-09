/**
 * @fileOverview DOM事件处理工具函数集
 */


/**
 * 添加事件监听器
 * @param {Element|Window|Document} target  目标节点
 * @param {String} evtName                  事件名
 * @param {Function} handler                事件处理函数
 * @param {Boolean|Object} useCapture       事件捕获方式
 */
export function addEvent(target, evtName, handler, useCapture) {
  if (target.addEventListener) {
    target.addEventListener(evtName, handler, useCapture);
  } else if (target.attachEvent) {
    target.attachEvent(['on', evtName].join(''), handler);
  } else {
    // ignored
  }
}

/**
 * 移除事件监听器
 * @param {Element|Window|Document} target  目标节点
 * @param {String} evtName                  事件名
 * @param {Function} handler                事件处理函数
 */
export function removeEvent(target, evtName, handler) {
  if (target.removeEventListener) {
    target.removeEventListener(evtName, handler);
  } else if (target.detachEvent) {
    target.detachEvent(['on', evtName].join(''), handler);
  } else {
    // ignored
  }
}

/**
 * 阻止默认事件
 * @param {Event} e   事件对象
 * @returns {boolean}
 */
export function preventDefault(e) {
  e.preventDefault();
  e.returnValue = false;
  return false;
}

/**
 * 判断浏览器是否支持`passive`属性
 * @returns {boolean}
 */
let supportPassiveCache = null;
export function supportPassive() {
  if (supportPassiveCache !== null) {
    return supportPassiveCache;
  }

  let support = false;

  try {
    let options = Object.defineProperty({}, 'passive', {
      get: function() {
        support = true;
      }
    });
    addEvent(window, 'test', null, options);
  } catch (e) {}

  return (supportPassiveCache = support);
}