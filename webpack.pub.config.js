//我是生产环境的配置，压缩，转码，提取公共包等操作
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require("clean-webpack-plugin");//导入自动删除dist文件的插件，打包前自动删除
// 创建一个插件的实例化对象，生成内存的html，及时预览
const htmlPlugin = new HtmlWebpackPlugin({
	template:path.join(__dirname,'./src/index.html'),//源文件
	filename:'index.html'
});
// 向外暴露一个打包的配置对象，因为webpack是基于node构建的，所以webpack支持所有node api和语法
module.exports = {
	mode:'production',// 在webpack4中，约定大于配置，约定入口为src/index.js
	plugins:[
		htmlPlugin,
		new CleanWebpackPlugin()
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
				test:/\.(png|jpg|gif|bmp)$/,use:'url-loader?limit=5000&name=images/[hash:8]-[name].[ext]' //转图片，小于5000kb的转base64,放到images文件,获取8位hash等取名字排重清缓存
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