import React from 'react'
import axios from 'axios';
import '@/css/userlist.scss';
import { Card } from 'antd';
import PostList from '@/components/store_test/users'
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
	//当组件输出到 DOM 后会执行 componentDidMount()
	componentDidMount() {

	}
	render() {
		const self = this
		return <div>
			<PostList></PostList>
		</div>
	}
}