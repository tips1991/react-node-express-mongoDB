import React from 'react'
import axios from 'axios';
import '@/css/userlist.scss';

export default class BingClick extends React.Component {
	constructor() {
		super()
		this.state = {
			msg: '我是Home',
			content: 'Home',
			users: [
				{ name: '小小', age: '11', sex: '女' }
			]
		}
	}

	render() {
		const self = this
		return <div>
			<h1>我是USERS，</h1>
			<ShowTable sendData={self.state.users}></ShowTable>
		</div>
	}
	//当组件输出到 DOM 后会执行 componentDidMount()
	componentDidMount() {
		this.getData();
	}
	getData() {
		const _this = this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
		axios.get('/api/v1/lists')
			.then(function (response) {
				console.log(response)
				_this.setState({
					users: response.data,
					// isLoaded:true
				});
			})
			.catch(function (error) {
				console.log(error);
				_this.setState({
					// isLoaded:false,
					// error:error
				})
			})
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