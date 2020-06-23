import React from 'react';
import axios from 'axios';
import fetchJSONP from 'fetch-jsonp';
import { Layout, Menu, Breadcrumb, Icon, Pagination } from 'antd';
import { Spin, Alert } from 'antd';
import { Route,Link } from "react-router-dom";
import cssstyles from '@/css/userlist.scss';
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
export default class List extends React.Component{
	constructor(props){
		super(props)
		this.state = {
			msg:'list',
			movies:[],
			isLoading:true,
			movieType:props.match.params.type,
			moviePage:props.match.params.page
		}
	}
	componentWillReceiveProps(nextProps){
		console.log(nextProps.match);
		this.setState({
			isLoading:true,
			movieType:nextProps.match.params.type
		},function(){
			this.getData()
		})
	}
	componentWillMount(){
		this.getData()
		// this.getDataJsonp() //使用fetch-jsonp实现跨域请求接口
	}
	render(){
		return <div>
			MovieList --- {this.props.match.params.type} - {this.props.match.params.page}
			<hr />
			{this.state.movieType} ---- {this.state.moviePage}
			{this.loadingObj()}
			<table>
				<tbody>
					<tr>
						<td>观影人</td>
						<td>年龄</td>
						<td>性别</td>
						<td>操作</td>
					</tr>
					{this.state.movies.map((item,index)=>{
						return <tr key={index}>
							<td>{item.name}</td>
							<td>{item.age}</td>
							<td>{item.sex}</td>
							<td style={{cursor:"pointer",color:"blue"}} onClick={this.goDetail}>查看资料</td>
						</tr>
					})}
				</tbody>
			</table>
			{/* 此处分页暂无真实数据，后面会通过express补上 */}

			<div className={cssstyles.marginTop20}><Pagination defaultCurrent={6} total={500} onChange={this.listPage} /></div>
		</div>
	}
	getData(){
		const _this=this;    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
		axios.get('/api/v1/lists',{
			params:{
				page:window.location.hash.split('/')[3],
				type:this.state.movieType
			}
		})
		.then(function (res) {
			console.log('axios',res)
			_this.setState({
				movies:res.data,
				isLoading:false
			});
		})
		.catch(function (error) {
			console.log(error);
		})
	}
	loadingObj = ()=>{
		if(this.state.isLoading){
			return <Spin tip="Loading...">
				<Alert
				message="正在请求用户列表"
				description="精彩内容，马上呈现"
				type="info"
				/>
			</Spin>
		}else{
			return <div>
				已经加载完成
			</div>
		}
	}
	getDataJsonp=()=>{
		fetchJSONP('https://api.douban.com/v2/movie/in_theaters')
		.then(response => response.json())
		.then(data=>{
			console.log(data)
		})
	}
	listPage =(page)=>{
		console.log(page)
		// this.props.history.push('/movie/'+this.state.movieType+'/'+page);
		window.location.href='/#/movie/'+this.state.movieType+'/'+page;
	}
	goDetail = ()=>{
		console.log(this.props)
		this.props.history.push('/movie/detail/'+this.props.id)
	}
}

//在react中，可使用fetch api来获取数据，fetch api是基于promise封装的