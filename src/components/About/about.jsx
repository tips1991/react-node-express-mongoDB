import React from 'react'
import echarts from 'echarts';
import styles from "./about.scss";
export default class About extends React.Component {
	constructor() {
		super()
		this.state = {
			msg: '我是Home',
			content: 'Home'
		}
	}
	componentDidMount() {
		// 基于准备好的dom，初始化echarts实例
		var myChart = echarts.init(document.getElementById('main'));
		// 绘制图表
		myChart.setOption({
			title: {
				text: '我的技术栈',
				subtext: '以下所列都是线上项目实际使用过'
			},
			tooltip: {
				trigger: 'item',
				formatter: '{a} <br/>{b}: {c} ({d}%)'
			},
			legend: {
				orient: 'vertical',
				left: 10,
				data: ['直达', '营销广告', '搜索引擎', '邮件营销', '联盟广告', '视频广告', '百度', '谷歌', '必应', '其他']
			},
			series: [
				{
					name: 'JS框架',
					type: 'pie',
					selectedMode: 'single',
					radius: [0, '30%'],

					label: {
						position: 'inner'
					},
					labelLine: {
						show: false
					},
					data: [
						{ value: 335, name: 'CSS', selected: true },
						{ value: 679, name: 'HTML5' },
						{ value: 1348, name: 'JavaScript' },
						{ value: 600, name: 'Node' },
						{ value: 200, name: 'MongoDB' },
					]
				},
				{
					name: 'JS相关技术',
					type: 'pie',
					radius: ['40%', '55%'],
					label: {
						formatter: '{a|{a}}{abg|}\n{hr|}\n  {b|{b}：}{c}  {per|{d}%}  ',
						backgroundColor: '#eee',
						borderColor: '#aaa',
						borderWidth: 1,
						borderRadius: 4,
						// shadowBlur:3,
						// shadowOffsetX: 2,
						// shadowOffsetY: 2,
						// shadowColor: '#999',
						// padding: [0, 7],
						rich: {
							a: {
								color: '#999',
								lineHeight: 22,
								align: 'center'
							},
							// abg: {
							//     backgroundColor: '#333',
							//     width: '100%',
							//     align: 'right',
							//     height: 22,
							//     borderRadius: [4, 4, 0, 0]
							// },
							hr: {
								borderColor: '#aaa',
								width: '100%',
								borderWidth: 0.5,
								height: 0
							},
							b: {
								fontSize: 16,
								lineHeight: 33
							},
							per: {
								color: '#eee',
								backgroundColor: '#334455',
								padding: [2, 4],
								borderRadius: 2
							}
						}
					},
					data: [
						{ value: 535, name: 'ES6' },
						{ value: 234, name: 'Webpack' },
						{ value: 135, name: 'Glup' },
						{ value: 135, name: 'MongoDB' },
						{ value: 1048, name: 'Vue' },
						{ value: 251, name: 'React' },
						{ value: 151, name: 'MySql' },
					]
				}
			]
		});
	}
	render() {
		return <div>
			<div id="main" className={styles.marginAuto} style={{ width: 1000, height: 800 }}></div>
		</div>
	}
	exchangeInput = (e) => {
		console.log(e)
		this.setState({
			msg: e.target.value
		})
	}
	show = () => {
		this.setState({ //setState方法是异步的,要想及时拿到更新后的值，需要用回调函数打印
			msg: 'hahah'
		}, function () {//回调函数
			console.log(this.state.msg)
		})
	}
}