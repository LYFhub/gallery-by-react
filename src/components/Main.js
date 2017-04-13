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

// 单个图片组件，做子组件，由父组件 GalleryByReactApp 调用
// 使用props获取父组件中自定义的属性:data
class ImgFigure extends React.Component {
	render() {
		return (
			<figure className="img-figure">
				<img src={this.props.data.imageURL} alt={this.props.data.title}></img> 
				<figcaption>
					<h2 className="img-title">{this.props.data.title}</h2>
				</figcaption>
			</figure>
		);
	}
};

// 图片画廊组件
// 循环遍历图片库，将生成的子组件压入数组，便于插入父组件中
class GalleryByReactApp extends React.Component {

	render() {

		var controllerUnits = [],
			imgFigures = [];

		imageDatas.forEach(function(value) {
			imgFigures.push(<ImgFigure data={value}/>);
		});

		return (
			<section className="stage">
				<section className="img-sec">
					{imgFigures}
				</section>
				<nav className="controller-nav">
					{controllerUnits}
				</nav>
			</section>
		);
	}
};

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;