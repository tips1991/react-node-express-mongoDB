# webpack4-react
*github地址：https://github.com/tips1991/webpack4-react.git*<br> 
## webpack4配置 我装的都是2020.1.4号最新的...<br> 
1. 新进目录（名字自己起）<br> 
2. 顺序执行以下代码(window和mac命令有略微出入，请注意)<br> 
```DOS
npm init -y
cnpm i webpack webpack-cli -D // 针对webpack4的安装 
mkdir src && cd src && touch index.html index.js    //webpack4约定大于配置，创建默认的入口文件src/index.js
cd ../ && mkdir dist && mkdir static
touch webpack.config.js               //webpack配置文件
npm i webpack-dev-server --save-dev   //热更新server，但是要手动刷新浏览器。请安装下面依赖，自动更新
cnpm i html-webpack-plugin@latest -D  //生成内存html的插件  --自动热更新反应到浏览器
cnpm i babel-core@latest babel-loader@latest babel-plugin-transform-runtime@latest -D
cnpm i babel-preset-env babel-preset-stage-0 -D
cnpm i babel-preset-react -D  	      //支持react标签转换
cnpm i style-loader css-loader -D     //安装样式相关loader
cnpm i bootstrap@3.3.7 -S             //安装bootstrapUI框架
cnpm i clean-webpack-plugin -D		  //自动删除旧包（dist）等文件的插件
```
3. 配置 package.json文件<br>
```javascript
//package.json
{
  "name": "webpack4",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "build": "webpack --mode production",
    "dev": "webpack-dev-server --open --hot",
    "prd": "webpack --config webpack.pub.config.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "babel-core": "^6.26.3",
    "babel-loader": "^7.1.5",
    "babel-plugin-transform-runtime": "^6.23.0",
    "babel-preset-env": "^1.7.0",
    "babel-preset-react": "^6.24.1",
    "babel-preset-stage-0": "^6.24.1",
    "clean-webpack-plugin": "^3.0.0",
    "css-loader": "^3.4.1",
    "file-loader": "^5.0.2",
    "html-webpack-plugin": "^3.2.0",
    "node-sass": "^4.13.0",
    "sass-loader": "^8.0.0",
    "style-loader": "^1.1.2",
    "url-loader": "^3.0.0",
    "webpack": "^4.41.5",
    "webpack-cli": "^3.3.10",
    "webpack-dev-server": "^3.10.1"
  },
  "dependencies": {
    "bootstrap": "^3.3.7",
    "react": "^16.12.0",
    "react-dom": "^16.12.0"
  }
}
```
4. 配置webpack.config.js<br> 
```javascript
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// 创建一个插件的实例化对象
const htmlPlugin = new HtmlWebpackPlugin({
	template:path.join(__dirname,'./src/index.html'),//源文件
	filename:'index.html'
});
// 向外暴露一个打包的配置对象，因为webpack是基于node构建的，所以webpack支持所有node api和语法
module.exports = {
	mode:'development',// 在webpack4中，约定大于配置，约定入口为src/index.js
	plugins:[
		htmlPlugin
	],
	module:{ //所有第三方 模块的配置规则
		rules:[ //第三方匹配规则
			{test:/\.js|jsx$/,use:'babel-loader',exclude:/node_modules/}, //匹配js/jsx后缀的使用babel-loader转译，exclude除了node_modules此目录
			{
                test: /\.css$/,
                use: [
                    {loader: "style-loader"}, 
                    {loader: "css-loader"}
                ],//打包处理css样式表的第三方loader
            },//打包处理css样式的第三方loader,?modules:表示为普通css样式表，启用模块化
			{test:/\.ttf|woff|woff2|eot|svg$/,use:'url-loader'},//打包处理 字体文件 的loader
			{
				test:/\.scss/,
				use:[
                    {loader: "style-loader"}, 
                    {loader: "css-loader",
	                    options: {
	                        modules: {
	                            localIdentName: "[path][name]-[local]-[hash:5]"
	                        }
	                    }
                    },
                    {loader:"sass-loader"}
                ],
			}, //打包处理scss文件loader
			{
				test:/\.(png|jpg|gif|bmp)$/,use:'url-loader?limit=5000' //转图片，小于5000kb的转base64
			},
		]
	},
	resolve:{
		extensions:['.js','.jsx','json'], //表示这几种文件后缀名会默认补全。import时可以省略后缀
		alias:{ //别名，定义全局目录变量之类的作用
			'@':path.join(__dirname,'./src') //@定义为根目录下的src文件
		}
	}
}
```

# react配置

*react：用于创建组件和虚拟DOM，同时组件的生命周期都在这个包中*<br> 
*react-dom：进行dom操作，主要场景：ReactDOM.render()*<br> 
1. 安装react和react-dom<br> 
```DOM
cnpm i react react-dom -S  //-S开发环境和生产环境安装  -D只在开发环境安装 
```

