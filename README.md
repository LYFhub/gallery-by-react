# gallery-by-react
one photo gallery project based on react (from imooc)

## 一、使用 yeoman 中的插件 react-webpack 创建项目
使用yeoman react-webpack创建项目后(yo react-webapack projectName)，
原来在webpack.config.js中loader 等配置，现在在cfg/default.js 中，默认提供了css,less,sass,各种图片格式以及视频格式等。很多配置都在cfg目录下。
后续添加的loader,在default.js中添加即可。

### react 相关
1. react 中的数据绑定直接绑定数组的话，会直接将数组中的元素插入生成的组件中。如果有多个相同的子组件要插入父组件中，可以将所有的子组件都push到一个空的数组中，然后在父组件中直接绑定这个数组即可。类似Angular 中 ng-repeat 的效果。
2. 在父组件中获取子组件的dom元素，可以在子组件中设置ref属性，然后通过this.refs.ref属性值来获得dom元素。如果直接得到的不是dom节点，可以使用React.findD  OMNode(this.refs.ref值)进行转换。
3. 设置state的初始值在constructor方法中，this.state = {...},不用getInitialState()方法了。
4. 对于组件的key属性：React是根据组件上设定的key属性来生成该组件唯一的标识，只有key改变了，React才会更新组件，否则重用该组件。如果想要更新组件内容，请保证每次的key都不一样。（有待继续深入了解）
