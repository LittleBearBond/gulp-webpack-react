/**
 * author           xj
 * @date            2016-03-25 10:55:35
 * @email           littlebearbond@qq.com
 * @description
 */
//https://github.com/imochen/hotcss/blob/master/src/hotcss.js
(function(window, document) {
    'use strict';
    var hotcss = {
        minWidth: 320
    };
    var docEl = document.documentElement;
    //640的时候fontSize是40
    var baseSize = 40;
    var baseWidth = 640;
    (function() {
        //根据devicePixelRatio自定计算scale
        //可以有效解决移动端1px这个世纪难题。
        var viewportEl = document.querySelector('meta[name="viewport"]'),
            hotcssEl = document.querySelector('meta[name="hotcss"]'),
            dpr = window.devicePixelRatio || 1,
            maxWidth = 540,
            designWidth = 0,
            //是使用rem来适配 还是使用缩放viewport来适配，默认使用rem
            isRem = true;

        dpr = dpr >= 3 ? 3 : (dpr >= 2 ? 2 : 1);

        //允许通过自定义name为hotcss的meta头，通过initial-dpr来强制定义页面缩放
        if (hotcssEl) {
            var hotcssCon = hotcssEl.getAttribute('content');
            if (hotcssCon) {
                //初始设置dpr
                var initialDprMatch = hotcssCon.match(/initial\-dpr=([\d\.]+)/);
                if (initialDprMatch) {
                    dpr = parseFloat(initialDprMatch[1]);
                }
                //最大宽度
                var maxWidthMatch = hotcssCon.match(/max\-width=([\d\.]+)/);
                if (maxWidthMatch) {
                    maxWidth = parseFloat(maxWidthMatch[1]);
                }
                //设计稿宽度
                var designWidthMatch = hotcssCon.match(/design\-width=([\d\.]+)/);
                if (designWidthMatch) {
                    designWidth = parseFloat(designWidthMatch[1]);
                }

                //是否使用rem适配
                var remVal = hotcssCon.match(/is\-rem=([\w]+)/);
                if (remVal) {
                    isRem = !(/false/i.test(remVal[1]));
                }
            }
        }
        if (isRem) {
            hotcss.dpr = dpr = 1;
        }
        hotcss.maxWidth = maxWidth;

        docEl.setAttribute('data-dpr', dpr);
        docEl.setAttribute('max-width', maxWidth);

        if (designWidth) {
            docEl.setAttribute('design-width', designWidth);
            hotcss.designWidth = designWidth | 0;
        }

        var scale = 1 / dpr,
            content = 'width=device-width, initial-scale=' + scale + ', minimum-scale=' + scale + ', maximum-scale=' + scale + ', user-scalable=no';

        if (viewportEl) {
            viewportEl.setAttribute('content', content);
        } else {
            viewportEl = document.createElement('meta');
            viewportEl.setAttribute('name', 'viewport');
            viewportEl.setAttribute('content', content);
            document.head.appendChild(viewportEl);
        }

    })();

    hotcss.px2rem = function(px, designWidth) {
        return parseInt(px, 10) * baseWidth / (designWidth || hotcss.designWidth) / baseSize;
    };

    hotcss.rem2px = function(rem, designWidth) {
        //rem可能为小数，这里不再做处理了
        return rem * baseSize * (designWidth || hotcss.designWidth) / baseWidth;
    };

    hotcss.mresize = function() {
        //对，这个就是核心方法了，给HTML设置font-size。
        var innerWidth = docEl.getBoundingClientRect().width || window.innerWidth;
        if (hotcss.maxWidth && (innerWidth / hotcss.dpr > hotcss.maxWidth)) {
            innerWidth = hotcss.maxWidth * hotcss.dpr;
        }
        if (!innerWidth) {
            return false;
        }
        //控制最小宽度为320
        innerWidth <= hotcss.minWidth && (innerWidth = hotcss.minWidth);
        docEl.style.fontSize = (innerWidth * baseSize / baseWidth) + 'px';
        hotcss.callback && hotcss.callback();
    };

    //直接调用一次
    hotcss.mresize();

    //绑定resize的时候调用
    window.addEventListener('resize', function() {
        clearTimeout(hotcss.tid);
        hotcss.tid = setTimeout(hotcss.mresize, 100);
    }, false);

    //防止不明原因的bug。load之后再调用一次。
    window.addEventListener('load', hotcss.mresize, false);
    setTimeout(function() {
        hotcss.mresize();
        //防止某些机型怪异现象，异步再调用一次
    }, 333)
    window.hotcss = hotcss;
    //命名空间暴露给你，控制权交给你，想怎么调怎么调。
})(window, document);
