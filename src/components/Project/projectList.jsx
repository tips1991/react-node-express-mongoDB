import React from 'react';
import axios from 'axios';
import fetchJSONP from 'fetch-jsonp';
import { Layout, Menu, Breadcrumb, Icon, Pagination, Card, Avatar, message } from 'antd';
import { Spin, Alert } from 'antd';
import { Route, Link } from "react-router-dom";
import cssstyles from '@/css/userlist.scss';
import AddProjectModal from "@/components/common/addProjectModal/modal";
import styles from "./project.scss"

import Qs from 'qs'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
const { Meta } = Card;
class List extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			msg: 'list',
			movies: [],
			isLoading: true,
			movieType: props.match.params.type,
			moviePage: props.match.params.page,
			mainData: "",
			pageSize: 10,
			page: 1,
			total: "",
		}
	}
	componentWillReceiveProps(nextProps) {
		console.log(nextProps.match);
		this.setState({
			isLoading: true,
			movieType: nextProps.match.params.type
		}, function () {
			this.getData()
		})
	}
	sendGetData = (e) => {
		this.getData()
	}
	cardModal = (e) => {
		if (this.state.mainData) {
			console.log("ressss")
			return this.state.mainData.map((item, index) => {
				return <Card
					key={index}
					style={{ width: 300 }}
					className={styles.imgSize}
					cover={
						<img
							alt="example"
							className={styles.imgSizeimg}
							// src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
							src={item.url}
						/>
					}
					actions={[
						<AddProjectModal titles="编辑" showFormData={item} sendGetData={this.sendGetData}></AddProjectModal>,
						<Icon type="delete" key="delete" onClick={() => this.delete(item)} />
					]}
				>
					<Meta
						className={styles.textLeft}
						avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
						title={item.projectName}
						description={item.descibe}
					/>
				</Card>

			})
		}
	}
	componentWillMount() {
		this.getData()
		// this.getDataJsonp() //使用fetch-jsonp实现跨域请求接口
	}
	getData() {
		const key = 'updatable';
		const hide = message.loading('Loading..', 0);
		const self = this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
		console.log("分页也码数", self.state.pageSize)
		axios({
			url: 'api/projectList',
			method: 'post',
			transformRequest: [function (data) {
				// 对 data 进行任意转换处理
				return Qs.stringify(data)
			}],
			data: {
				projectType: this.props.match.params.type ? this.props.match.params.type : "total",
				page: self.state.page - 0 ? self.state.page - 0 : 1,
				pageSize: self.state.pageSize - 0 ? self.state.pageSize - 0 : 10
			}
		}).then(function (res) {
			console.log('axios', res)
			if (res.data.code == "0") {
				// message.success({ content:res.data.message, key, duration: 2 });
				setTimeout(hide, 100);
				self.setState({
					mainData: res.data.data,
					isLoading: false,
					total: res.data.other.length
				})
			} else {
				message.success({ content: res.data.message, key, duration: 2 });
			}

		}).catch(function (error) {
			console.log(error);
		})
	}
	delete(item) {
		const key = 'updatable';
		const hide = message.loading('Loading..', 0);
		const self = this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
		axios({
			url: 'api/projectListDelete',
			method: 'post',
			transformRequest: [function (data) {
				// 对 data 进行任意转换处理
				return Qs.stringify(data)
			}],
			data: { id: item.id }
		}).then(function (res) {
			console.log('axios', res)
			if (res.data.code == "0") {
				// message.success({ content:res.data.message, key, duration: 2 });
				self.getData()
				message.success({ content: res.data.message, key, duration: 2 });
				setTimeout(hide, 100);
			} else {
				message.success({ content: res.data.message, key, duration: 2 });
			}

		}).catch(function (error) {
			console.log(error);
		})
	}
	loadingObj = () => {
		if (this.state.isLoading) {
			return <Spin tip="Loading...">
				<Alert
					message="正在请求用户列表"
					description="精彩内容，马上呈现"
					type="info"
				/>
			</Spin>
		}
	}
	getDataJsonp = () => {
		fetchJSONP('https://api.douban.com/v2/movie/in_theaters')
			.then(response => response.json())
			.then(data => {
				console.log(data)
			})
	}
	listPage = (page) => {
		console.log(page)
		// this.props.history.push('/movie/'+this.state.movieType+'/'+page);
		window.location.href = '/#/movie/' + this.state.movieType + '/' + page;
	}
	goDetail = () => {
		console.log(this.props)
		this.props.history.push('/movie/detail/' + this.props.id)
	}
	onShowSizeChange = (current, pageSize) => {
		this.setState({
			pageSize: pageSize,
			page: current
		}, () => {
			this.getData()
		})
		console.log(current, pageSize);
	}
	chagePage = (page, pageSize) => {
		this.setState({
			pageSize: pageSize,
			page: page
		}, () => {
			this.getData()
		})
		console.log("ddddasdfasf")
		console.log(page, pageSize)

	}

	render() {
		return <div>
			{/* Project --- {this.props.match.params.type} - {this.props.match.params.page} */}
			{this.loadingObj()}
			<div className={styles.marginTB15}>
				<AddProjectModal titles="增加项目" showFormData={""} sendGetData={this.sendGetData}></AddProjectModal>
			</div>
			{this.cardModal()}
			{/* 分页 */}
			<div className={cssstyles.marginTop20}>
				<Pagination
					showSizeChanger
					onShowSizeChange={this.onShowSizeChange}
					defaultCurrent={1}
					current={this.state.page}
					onChange={this.chagePage}
					total={this.state.total - 0}
				/>
				{/* <Pagination defaultCurrent={1} total={this.state.mainData.length - 0} onChange={this.listPage} /> */}
			</div>
		</div>
	}
}
export default List;
//在react中，可使用fetch api来获取数据，fetch api是基于promise封装的