import React from 'react'
import { useState } from 'react';
import axios from 'axios';
import Qs from 'qs'
// import { Timeline } from 'antd';
// import { useState } from 'react';
import { Timeline, Icon, message, Button, PageHeader } from 'antd';
import timeTreeData from '@/middleware/workExperience.js';
import { connect } from 'react-redux';

import ModalDiog from "@/components/common/modal/modal";



class TimeTree extends React.Component {
	constructor() {
		super()
		this.state = {
			msg: '我是时间树',
			content: 'Time',
			position: 'left',
			workExperienceData: '',
			power: ""
		}
		this.MakePar = this.MakePar.bind(this)


	}
	onChange = (e) => {
		// setMode(e.target.value);
	}
	exchangeInput = (e) => {
		this.setState({
			msg: e.target.value
		})
	}
	show = () => {
		this.setState({ //setState方法是异步的,要想及时拿到更新后的值，需要用回调函数打印
			msg: 'hahah'
		}, function () {//回调函数
		})
	}
	componentDidMount() {
		let self = this
		this.getData();
		this.setState({
			power: self.props.power.power.id
		})
	}
	MakePar = (e) => {
		this.getData();
	}
	getData() {
		const self = this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
		const key = 'updatable';
		const hide = message.loading('Loading..', 0);
		// message.loading({ content: 'Loading...', key });
		axios.get('api/workExperience')
			.then(function (res) {
				if (res.data.code == "0") {
					self.setState({
						workExperienceData: res.data.data.reverse()
					});
					setTimeout(hide, 100);
				}
			})
			.catch(function (err) {
				console.log(err);
			})
	}
	delete = (item) => {
		const key = 'updatable';
		const hide = message.loading('Loading..', 0);
		const self = this
		axios({
			url: 'api/workExperienceDelete',
			method: 'post',
			transformRequest: [function (data) {
				return Qs.stringify(data)
			}],
			data: { id: item }
		}).then(function (res) {
			if (res.data.code == '0') {
				setTimeout(hide, 100);
				setTimeout(() => {
					message.success({ content: res.data.message, key, duration: 2 });
				}, 1000);

				self.getData()
			}
		})
			.catch(function (err) {
				console.log(err);
			})
	}
	isPower = () => {
		if (this.state.power && this.state.power == "admin") {
			return <ModalDiog showFormData='' key="1" ref='sendChid' MakePar={this.MakePar}></ModalDiog>
		}
	}
	timeDataShow = () => {
		if (this.state.workExperienceData && this.state.power && this.state.power == "admin") {
			// return timeTreeData.map((items,index)=>{
			return this.state.workExperienceData.map((items, index) => {
				return <Timeline.Item key={index}>
					<h3>单位：{items.companyName}</h3>
					<p>职位：{items.postion}</p>
					<p>时间：{items.startTime} ~~ {items.endTime}</p>
					<p>荣誉：{items.honor}</p>
					<div>
						<ModalDiog showFormData={items} MakePar={this.MakePar}></ModalDiog>
						<Button onClick={() => this.delete(items.id)} type="primary">删除</Button>
					</div>
				</Timeline.Item>
			})
		} else if (this.state.workExperienceData) {
			console.log(this.state.power)
			return this.state.workExperienceData.map((items, index) => {
				return <Timeline.Item key={index}>
					<h3>单位：{items.companyName}</h3>
					<p>职位：{items.postion}</p>
					<p>时间：{items.startTime} ~~ {items.endTime}</p>
					<p>荣誉：{items.honor}</p>
				</Timeline.Item>
			})
		}

	}
	render() {
		return <div>
			<PageHeader
				style={{
					border: '1px solid rgb(235, 237, 240)',
					margin: '0 0 25px 0'
				}}
				onBack={() => null}
				title="工作经历时间树"
				subTitle="This is a subtitle"
				extra={[
					this.isPower()
				]}
			/>
			<Timeline mode="alternate">
				{this.timeDataShow()}
			</Timeline>
		</div>
	}
}
// export default TimeTree;
// 通过connect链接组件和redux数据
const mapStateToProps = (state, ownProps) => {
	return {
		power: state.power
	}
}
export default connect(mapStateToProps)(TimeTree)