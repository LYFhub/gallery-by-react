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

class GalleryByReactApp extends React.Component {
	render() {
		return (
			<section className="stage">
				<section className="img-sec">
				</section>
				<nav className="controller-nav">
				</nav>
			</section>
		);
	}
}

GalleryByReactApp.defaultProps = {};

export default GalleryByReactApp;