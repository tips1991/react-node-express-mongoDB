import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route,Link,Switch } from "react-router-dom";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import MovieList from "@/components/Movie/movieList";
import movieDetail from "@/components/Movie/movieDetail";
import MovieDetail from './movieDetail';
export default class List extends React.Component{
	constructor(){
		super()
		this.state = {
			msg:'list'
		}
	}
	render(){
		return <div>
			<Layout>
				<Sider width={200} style={{ background: '#fff' }}>
					<Menu
					mode="inline"
					defaultSelectedKeys={window.location.hash.split('/')[2]}
					defaultOpenKeys={['sub1']}
					style={{ height: '100%', borderRight: 0 }}
					>
					<SubMenu
						key="sub1"
						title={
						<span>
							<Icon type="user" />
							电影/抗肺炎秘籍
						</span>
						}
					>
						<Menu.Item key="hot">
							<Link to="/movie/hot/1">正在热映</Link>
						</Menu.Item>
						<Menu.Item key="new">
							<Link to="/movie/new/1">即将上映</Link>
						</Menu.Item>
						<Menu.Item key="top">
							<Link to="/movie/top/1">Top25</Link>
						</Menu.Item>
					</SubMenu>
					
					</Menu>
				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
					<Breadcrumb.Item>Home</Breadcrumb.Item>
					<Breadcrumb.Item>List</Breadcrumb.Item>
					<Breadcrumb.Item>App</Breadcrumb.Item>
					</Breadcrumb>
					<Content
					style={{
						background: '#fff',
						padding: 24,
						margin: 0,
						minHeight: 280,
					}}
					>
						电影页面<hr />
						<h3>请选择左侧列表导航切换查看不同页面</h3>
						{/* 在匹配路由规则实话，提供了2个参数 */}
						{/* 如果想要从路由规则中，提取参数，需要使用this.props.match.params获取 */}
						<Switch>
							<Route path="/movie/:type/:page" component={MovieList}></Route>
							<Route path="/movie/detail" component={MovieDetail}></Route>
						</Switch>
					</Content>
				</Layout>
			</Layout>
		</div>
	}
}