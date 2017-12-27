# 移动端高性能滚动组件
> 基于[infinite-scroller](http://googlechromelabs.github.io/ui-element-samples/infinite-scroller/)改进、封装

# 改进
- 去除第三方依赖（摘除`es6-promise.js`依赖，减少代码量，降低接入成本，也有利于后期兼容更低版本浏览器）
- 解决原生`Promise`性能问题（提升2~3倍，[详情](https://softwareengineering.stackexchange.com/questions/278778/why-are-native-es6-promises-slower-and-more-memory-intensive-than-bluebird)）
- 多种接入方式的支持（支持全局、ES6模块、AMD、CMD方式接入）

# TODO
- 源码中TODO的问题
- issue中一些问题
- 上拉加载数据
- IE8-兼容性问题

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
    new ContentSource(), {
      runwayItems: 50,
      runwayItemsOpposite: 10,
      scrollRunway: 2000,
      animationDurationMs: 200
    }
  )
```