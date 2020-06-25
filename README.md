# 全栈项目
*node express react（spa） redux antd（ui） 在线免费mongoDB（国外，有点慢，能接受）*<br> 
## 装逼神器：www.ladshow.com 有需要可以联系作者，提供有偿装逼（支持：上传个人的工作经历，项目经验）有钱老板可以提需求，程序猿tips1991提供专业1对1服务,可包月面试使用。<br> 
1. 依赖安装：cnpm install（或者yarn,自己选择，目前没有稀有资源，都是常用的）<br> 
2. 项目运行：npm run dev<br> 
3. 项目打包：npm run prd（其它环境自己配置完善，装逼1个包就够用了）<br> 
4. 服务开启：nodemon app<br> 
```DOS

```
3. 配置 package.json，webpack.confgi.js等文件<br>
```javascript
//package.json
{
  ……这里真的没必要写了，clone下来都有了
}
```
4. 配置代理<br> 
```javascript
  devServer: {
		proxy: {
			"/api": {
				// "target": "https://5b5e71c98e9f160014b88cc9.mockapi.io",
				"target": "http://localhost:3000/",
				"changeOrigin": true,
				"pathRewrite": { "^/api": "/api" }
			}
		}
	},
```

# 练手项目，优雅的地方不多，先把面子搞起来。后面会抽空不定时维护更新加需求。
# 纯手敲代码，转前请点start，感谢各位老铁，有钱的捧个钱场，没钱的欢迎点星星星星星……！

