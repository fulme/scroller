# 移动端高性能滚动组件
> 基于[infinite-scroller](http://googlechromelabs.github.io/ui-element-samples/infinite-scroller/)改进、封装

当页面元素过多时，内存占用会持续增加，页面重绘的时候占用的CPU资源也会随之增大，页面频繁滚动或者重排的时候就会出现明显的卡顿。
此组件可以有效解决海量数据列表动态加载时的性能问题，可以在性能较差的设备上流畅地滚动，帧率能接近理想化的60FPS（同等条件下iScroll的无限加载版本只能达到30FPS左右）。
可以动态加载任何形式的UI节点，不要求节点具有相同的结构或者尺寸，可以随意定制每个节点的UI。[demo](http://j1.58cdn.com.cn/git/scroller/demo/demo.html)

# 实用场景
- 需要大规模动态加载数据的
- 想要通过墓碑元素改善加载视图
- 不需要兼容IE9-的应用

# 实现原理
- 通过`will-change: transform;`开启元素3D加速（目前chrome、safari、firefox支持）
- 通过`contain: layout;`开启元素的（目前仅chrome支持）
- 通过节点的复用，维持页面的节点数量在一个设定的范围，降低内存占用，减少页面重绘、重排的性能开销
- 通过墓碑节点实现更友好的数据加载站位显示
- 数据更新导致滚动位置变化的时候通过记录锚点元素实现滚动定位

# 改进
- 去除第三方依赖（摘除`es6-promise.js`依赖，减少代码量，降低接入成本，也有利于后期兼容更低版本浏览器）
- 解决原生`Promise`性能问题（提升2~3倍，[详情](https://softwareengineering.stackexchange.com/questions/278778/why-are-native-es6-promises-slower-and-more-memory-intensive-than-bluebird)）
- 对`resize`事件做防抖操作，对`scroll`事件做节流操作
- 多种接入方式的支持（支持全局、ES6模块、AMD、CMD方式接入）

# 使用
- npm包引用  
```
  # 安装模块
  # @sea https://www.npmjs.com/package/better-scroller
  npm i -S better-scroller
```

```js
  // ES6 使用方式
  import BetterScroller from 'better-scroller';
  
  // cmd 使用方式
  // let BetterScroller = require('better-scroller');
```

- 全局引用  
```html  
  <script src="//j1.58cdn.com.cn/git/scroller/index.min.js"></script>
```

- 模块加载器引用

```js
  // cmd 使用方式（如seajs）
  let BetterScroller = require('dist/index.min.js');

  // amd 使用方式(如requirejs)
  requirejs(['dist/index.min.js'], function(BetterScroller) {
    // TODO
  });
```

- 调用
```html
<div id="templates">
  <li class="item" data-id="{{id}}">
    <img class="avatar" width="48" height="48">
    <div class="bubble">
      <p></p>
      <img width="300" height="300">
      <div class="meta">
        <time class="posted-date"></time>
      </div>
    </div>
  </li>
  
  <li class="item tombstone" data-id="{{id}}">
    <img class="avatar" width="48" height="48" src="images/unknown.jpg">
    <div class="bubble">
      <p></p>
      <p></p>
      <p></p>
      <div class="meta">
        <time class="posted-date"></time>
      </div>
    </div>
  </li>
</div>
<ul id="scroll-container"></ul>
```

```css
  #templates {display: none}
  
  #scroll-container {
    position: absolute;
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    overflow-x: hidden;
    overflow-y: scroll;
    box-sizing: border-box;
    
    /*safari上开启原生滚动*/
    -webkit-overflow-scrolling: touch;
    /*chrome重隔离优化*/
    contain: layout;
    /*开启3D加速*/
    will-change: transform;
  }
  
  .item {
    display: flex;
    padding: 10px 0;
    width: 100%;
    contain: layout;
    will-change: transform;
  }
```

```js
  let scroller = new BetterScroller(
    document.querySelector('#scroll-container'),
    new ContentSource())
```

# TODO
- 源码中TODO的问题
- issue中一些问题
- 上拉加载数据
- IE8-兼容性问题