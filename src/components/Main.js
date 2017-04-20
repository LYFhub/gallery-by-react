require('normalize.css/normalize.css');
require('../styles/App.scss');

import React from 'react';

// 获取图片相关的数据
var imageDatas = require('../data/imagedata.json');

// 利用自执行函数，将图片名信息转成图片URL路径信息。因为这个图片只执行一次，所以用自执行函数
imageDatas = (function genImageURL(imageDatasArr) {
	for (var i = 0, j = imageDatasArr.length; i < j; i++) {
		var singleImageData = imageDatasArr[i];

		singleImageData.imageURL = require('../images/' + singleImageData.fileName);

		imageDatasArr[i] = singleImageData;
	}

	return imageDatasArr;
})(imageDatas);

// 获取区间内的一个随机值
function getRangeRandom(low, high) {
	return Math.ceil(Math.random() * (high - low) + low);
}

// 单个图片组件，做子组件，由父组件 GalleryByReactApp 调用
// 使用props获取父组件中自定义的属性:data
class ImgFigure extends React.Component {
	render() {

		var styleObj = {};

		// 如果props 属性中指定了这张图片的位置，则使用
		if (this.props.arrange.pos) {
			styleObj = this.props.arrange.pos;
		}

		return (
			<figure className="img-figure" style={styleObj}>
				<img src={this.props.data.imageURL} alt={this.props.data.title}></img>
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
}

// 图片画廊组件
// 循环遍历图片库，将生成的子组件压入数组，便于插入父组件中
class GalleryByReactApp extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			imgsArrangeArr: [
				/*
					{
						pso: {
							left: '0',
							top: '0'
						}
					}
					*/
			]
		};

	}

	Constant: {
		centerPos: {
			left: 0,
			right: 0
		},
		hPosRange: {
			leftSecX: [0, 0],
			rightSecX: [0, 0],
			y: [0, 0]
		},
		vPosRange: {
			x: [0, 0],
			topY: [0, 0]
		}
	}


	/*
	 * 重新布局所有图片
	 * @param centerIndex 指定居中排布哪个图片
	 */
	rearrange(centerIndex) {
		var imgsArrangeArr = this.state.imgsArrangeArr,
			Constant = this.Constant,
			centerPos = Constant.centerPos,
			hPosRange = Constant.hPosRange,
			vPosRange = Constant.vPosRange,
			hPosRangeLeftSecX = hPosRange.leftSecX,
			hPosRangeRightSecx = hPosRange.ringhtSecx,
			hPosRangeY = hPosRange.y,
			vPosRangeTopY = vPosRange.topY,
			vPosRangeX = vPosRange.x,

			imgsArrangeTopArr = [],
			topImgNum = Math.ceil(Math.random() * 2), // 取一个或者不取
			topImgSpliceIndex = 0,

			imgsArrangeCenterArr = imgsArrangeArr.splice(centerIndex, 1);

		// 首先居中 centerIndex 的图片
		imgsArrangeCenterArr[0].pox = centerPos;

		// 取出要布局上侧的图片的状态信息
		topImgSpliceIndex = Math.ceil(Math.random() * (imgsArrangeArr.length - topImgNum));
		imgsArrangeTopArr = imgsArrangeArr.splice(topImgSpliceIndex, topImgNum);

		// 布局位于上侧的图片
		imgsArrangeTopArr.forEach(function(value, index) {
			imgsArrangeTopArr[index].pos = {
				top: getRangeRandom(vPosRangeTopY[0], vPosRangeTopY[1]),
				left: getRangeRandom(vPosRangeX[0], vPosRangeX[1])
			}
		});

		// 布局左右两侧的图片
		for (var i = 0, j = imgsArrangeArr.length, k = j / 2; i < j; i++) {
			var hPosRangeLORX = null;

			// 前半部分布局左边，后半部分布局在右边
			if (i < k) {
				hPosRangeLORX = hPosRangeLeftSecX;
			} else {
				hPosRangeLORX = hPosRangeRightSecx;
			}

			imgsArrangeArr[i].pos = {
				top: getRangeRandom(hPosRangeY[0], hPosRangeY[1]),
				left: getRangeRandom(hPosRangeLORX[0], hPosRangeLORX[1])
			}
		}

		if (imgsArrangeTopArr && imgsArrangeTopArr[0]) {
			imgsArrangeArr.splice(topImgSpliceIndex, 0, imgsArrangeTopArr[0]);
		}

		imgsArrangeArr.splice(centerIndex, 0, imgsArrangeCenterArr[0]);

		this.setState({
			imgsArrangeArr: imgsArrangeArr
		});
	}

	//组件加载之后，为每张图片计算其未知的范围,Math.ceil()->向上取整
	componentDidMount() {
		// 首先拿到舞台的大小
		var stageDOM = this.refs.stage,
			stageW = stageDOM.scrollWidth,
			stageH = stageDOM.scrollHeight,
			halfStageW = Math.ceil(stageW / 2),
			halfStageH = Math.ceil(stageH / 2);

		// 拿到一个imageFigure 的大小
		var imgFigureDOM = this.refs.imgFigure0,
			imgW = imgFigureDOM.scrollWidth,
			imgH = imgFigureDOM.scrollHeight,
			halfImgW = Math.ceil(imgW / 2),
			halfImgH = Math.ceil(imgH / 2);

		// 计算中心图片的位置点
		this.Constant.centerPos = {
			left: halfStageW - halfImgW,
			top: halfStageH - halfImgH
		}


		// 计算左侧右侧区域图片排布位置的取值范围
		this.Constant.hPosRange.leftSecX[0] = -halfImgW;
		this.Constant.hPosRange.leftSecX[1] = halfStageW - halfImgW * 3;
		this.Constant.hPosRange.rightSecX[0] = halfStageW - halfImgW;
		this.Constant.hPosRange.rightSecX[1] = stageW - halfImgW;
		this.Constant.hPosRange.y[0] = -halfImgH;
		this.Constant.hPosRange.y[1] = stageH = halfImgH;

		// 计算上侧区域图片排布位置的取值范围
		this.Constant.vPosRange.topY[0] = -halfImgH;
		this.Constant.vPosRange.topY[1] = halfStageH - halfImgH * 3;
		this.Constant.vPosRange.x[0] = halfImgW - imgW;
		this.Constant.vPosRange.x[1] = halfImgW;

		this.rearrange(0);
	}

	render() {

		var controllerUnits = [],
			imgFigures = [];

		imageDatas.forEach(function(value, index) {

			if (!this.state.imgsArrangeArr[index]) {
				this.state.imgsArrangeArr[index] = {
					pos: {
						left: 0,
						top: 0
					}
				}
			}

			imgFigures.push(<ImgFigure data={value} ref={'imgFigure' + index} key={'imgFigure' + index} arrange={this.state.imgsArrangeArr[index]}/>);
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
}

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;