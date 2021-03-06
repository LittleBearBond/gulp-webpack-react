'use strict';
/**
 * author           xj
 * @date            2016-06-16 10:34:21
 * @email           littlebearbond@qq.com
 * @description
 */
import React from 'react';
import ReactDOM  from 'react-dom';

// CSS
require('../css/normalize.css');
require('../css/main.scss');
// 获取图片相关的数据
let imageDatas = require('../data/imageDatas.json');
let prefix = '';
(function () {
    let el = document.createElement('div');
    for (let name in {
        webkit: 'Webkit',
        moz: 'Moz',
        o: 'O'
    }) {
        if (el.style[name + 'TransitionProperty'] !== undefined) {
            prefix = name;
            break;
        }
    }
} ());

imageDatas.forEach(function (val, index) {
    imageDatas[index].imageURL = require('../images/' + val.fileName);
});

function getRangeRandom(low, high) {
    return Math.ceil(low + Math.random() * (high - low));
}

function get30DegRandom() {
    return ((Math.random() > 0.5 ? '' : '-') + Math.ceil(Math.random() * 30));
}

let ImgFigure = React.createClass({
    handleClick: function (e) {
        this.props[this.props.arrange.isCenter ? 'inverse' : 'center']();
        e.stopPropagation();
        e.preventDefault();
    },
    render() {

        let styleObj = {};
        let arrange = this.props.arrange;
        // 如果props属性中指定了这张图片的位置，则使用
        if (arrange.pos) {
            styleObj = arrange.pos;
        }

        // 如果图片的旋转角度有值并且不为0， 添加旋转角度
        if (arrange.rotate) {
            styleObj[prefix + 'Transform'] = 'rotate(' + arrange.rotate + 'deg)';
        }
        // 如果是居中的图片， z-index设为11
        if (arrange.isCenter) {
            styleObj.zIndex = 11;
        }

        let imgFigureClassName = 'img-figure' + (arrange.isInverse ? ' is-inverse' : '');

        return (
            <figure className={imgFigureClassName} ref="img" style={styleObj} onClick={this.handleClick}>
                <img src={this.props.data.imageURL}
                    alt={this.props.data.title}
                    />
                <figcaption>
                    <h2 className="img-title">{this.props.data.title}</h2>
                    <div className="img-back" onClick={this.handleClick}>
                        <p>
                            {this.props.data.desc}
                        </p>
                    </div>
                </figcaption>
            </figure>
        );

    }
});
// 控制组件
let ControllerUnit = React.createClass({
    handleClick: function (e) {
        // 如果点击的是当前正在选中态的按钮，则翻转图片，否则将对应的图片居中
        this.props[this.props.arrange.isCenter ? 'inverse' : 'center']();
        e.preventDefault();
        e.stopPropagation();
    },
    render: function () {
        let controlelrUnitClassName = "controller-unit";

        // 如果对应的是居中的图片，显示控制按钮的居中态
        if (this.props.arrange.isCenter) {
            controlelrUnitClassName += " is-center";
            // 如果同时对应的是翻转图片， 显示控制按钮的翻转态
            if (this.props.arrange.isInverse) {
                controlelrUnitClassName += " is-inverse";
            }
        }
        return (
            <span className={controlelrUnitClassName} onClick={this.handleClick}></span>
        );
    }
});

let App = React.createClass({
    getInitialState() {
        return {
            imgsArrangeArr: []
        };
    },
    Constant: {
        centerPos: {
            left: 0,
            right: 0
        },
        hPosRange: { // 水平方向的取值范围
            leftSecX: [0, 0],
            rightSecX: [0, 0],
            y: [0, 0]
        },
        vPosRange: { // 垂直方向的取值范围
            x: [0, 0],
            topY: [0, 0]
        }
    },
    /*
   * 重新布局所有图片
   * @param centerIndex 指定居中排布哪个图片
   */
    rearrange: function (centerIndex) {
        let imgsArrangeArr = this.state.imgsArrangeArr,
            Constant = this.Constant,
            centerPos = Constant.centerPos,
            hPosRange = Constant.hPosRange,
            vPosRange = Constant.vPosRange,
            hPosRangeLeftSecX = hPosRange.leftSecX,
            hPosRangeRightSecX = hPosRange.rightSecX,
            hPosRangeY = hPosRange.y,
            vPosRangeTopY = vPosRange.topY,
            vPosRangeX = vPosRange.x,

            imgsArrangeTopArr = [],
            topImgNum = Math.floor(Math.random() * 2), // 取一个或者不取
            topImgSpliceIndex = 0,

            imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

        // 首先居中 centerIndex 的图片, 居中的 centerIndex 的图片不需要旋转
        imgsArrangeCenterArr[0] = {
            pos: centerPos,
            rotate: 0,
            isCenter: true
        };

        // 取出要布局上侧的图片的状态信息
        topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
        imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

        // 布局位于上侧的图片
        imgsArrangeTopArr.forEach(function (value, index) {
            imgsArrangeTopArr[index] = {
                pos: {
                    top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
                    left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };
        });

        // 布局左右两侧的图片
        for (let i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
            let hPosRangeLORX = null;

            // 前半部分布局左边， 右半部分布局右边
            if (i < k) {
                hPosRangeLORX = hPosRangeLeftSecX;
            } else {
                hPosRangeLORX = hPosRangeRightSecX;
            }

            imgsArrangeArr[i] = {
                pos: {
                    top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
                    left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
                },
                rotate: get30DegRandom(),
                isCenter: false
            };

        }

        if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
            imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
        }

        imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);
        this.setState({
            imgsArrangeArr: imgsArrangeArr
        });
    },
    inverse(index) {
        return function () {
            let imgsArrangeArr = this.state.imgsArrangeArr;

            imgsArrangeArr[index].isInverse = !imgsArrangeArr[index].isInverse;

            this.setState({
                imgsArrangeArr: imgsArrangeArr
            });
        }.bind(this);
    },
    center(index) {
        return function () {
            this.rearrange(index);
        }.bind(this);
    },
    initPos() {
        // 首先拿到舞台的大小
        let stageDOM = this.refs.stage,
            stageW = stageDOM.scrollWidth,
            stageH = stageDOM.scrollHeight,
            halfStageW = Math.ceil(stageW / 2),
            halfStageH = Math.ceil(stageH / 2);

        // 拿到一个imageFigure的大小
        let imgFigureDOM = this.refs.imgFigure0.refs.img,
            imgW = imgFigureDOM.scrollWidth,
            imgH = imgFigureDOM.scrollHeight,
            halfImgW = Math.ceil(imgW / 2),
            halfImgH = Math.ceil(imgH / 2);

        // 计算中心图片的位置点
        this.Constant.centerPos = {
            left: halfStageW - halfImgW,
            top: halfStageH - halfImgH
        };

        // 计算左侧，右侧区域图片排布位置的取值范围
        this.Constant.hPosRange.leftSecX[0] = -halfImgW;
        this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
        this.Constant.hPosRange.rightSecX[0] = halfStageW + halfImgW;
        this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
        this.Constant.hPosRange.y[0] = -halfImgH;
        this.Constant.hPosRange.y[1] = stageH - halfImgH;

        // 计算上侧区域图片排布位置的取值范围
        this.Constant.vPosRange.topY[0] = -halfImgH;
        this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
        this.Constant.vPosRange.x[0] = halfStageW - imgW;
        this.Constant.vPosRange.x[1] = halfStageW;

        this.rearrange(0);
    },
    // 组件加载以后， 为每张图片计算其位置的范围
    componentDidMount() {
        this.initPos();
        window.addEventListener('resize', this.initPos.bind(this));
    },
    render() {
        let controllerUnits = [],
            imgFigures = [];

        imageDatas.forEach(function (value, index) {
            if (!this.state.imgsArrangeArr[index]) {
                this.state.imgsArrangeArr[index] = {
                    pos: {
                        left: 0,
                        top: 0
                    },
                    rotate: 0,
                    isInverse: false,
                    isCenter: false
                };
            }
            imgFigures.push(<ImgFigure key={index} data={value} ref={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index) } center={this.center(index) }/>);
            controllerUnits.push(<ControllerUnit key={index} arrange={this.state.imgsArrangeArr[index]} inverse={this.inverse(index) } center={this.center(index) }/>);
        }.bind(this));

        return (
            <section className="stage" ref="stage">
                <section className="img-sec">
                    {imgFigures}
                </section>
                <nav className="controller-nav">
                    {controllerUnits}
                </nav>
            </section>
        );
    }
});

ReactDOM.render(<App />, document.getElementById('content'));

export default App;
