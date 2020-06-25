import React from 'react'
import axios from 'axios';
import { useState } from 'react';
import { Timeline, Radio, Button } from 'antd';


// console.log("login", login)
// import { PageHeader, Tag, Button, Statistic, Descriptions, Row } from 'antd';

import TimeTree from "@/components/common/timeTree/timeTree";
import ModalDiog from "@/components/common/modal/modal";


export default class Home extends React.Component {
	constructor() {
		super()
		this.state = {
			msg: '我是Home',
			content: 'Home',
			workExperienceData: '',
			// store: login
		}
	}
	exchangeInput = (e) => {
		console.log(e)
		this.setState({
			msg: e.target.value
		})
	}
	componentDidMount() {
		// console.log('login');
	}
	addWorkExperience = () => {//新增工作经历
		console.log('新增工作经历')
	}
	show = () => {
		this.setState({ //setState方法是异步的,要想及时拿到更新后的值，需要用回调函数打印
			msg: 'hahah'
		}, function () {//回调函数
			console.log(this.state.msg)
		})
	}
	render() {
		return <div>
			<TimeTree></TimeTree>
			{/* <button onClick={() => this.show()}>点击</button>
			<div>{this.state.msg}</div>
			<input type="text" value={this.state.msg} onChange={(e) => this.exchangeInput(e)} /> */}
		</div>
	}
}