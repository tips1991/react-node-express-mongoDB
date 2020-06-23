// import React,{components} from 'react'; ①
import React from 'react';
import ReactDom from 'react-dom';
//HashRouter 表示一个路由的根容器，所有的路由相关东西都包裹在HashRouter里面，一个网站中只需要使用一次HashRouter就好了

import { HashRouter, Route, Link } from "react-router-dom";
import styles from '@/css/app.scss'
import { Layout, Menu } from 'antd';
import Home from '@/components/Home/home';
import About from '@/components/About/about';
import Project from '@/components/Project/project';
import PostList from '@/components/store_test/users'
// import Movie from '@/components/Movie/movie';
const { Header, Content, Footer } = Layout;
export default class App extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			msg: '我是App'
		}
	}
	componentWillMount() {
		console.log(window.location.hash.split("/")[1]) //自动匹配当前域名，给antd组件渲染选中的tab
	}
	render() {
		//当用HashRouter把App根组件包裹起来之后，网站就已经启用路由了
		return <div>
			<HashRouter>
				<Layout className="layout">
					<Header>
						<div className={styles.logo} />
						<Menu
							theme="dark"
							mode="horizontal"
							defaultSelectedKeys={window.location.hash.split("/")[1] ? window.location.hash.split("/")[1] : "home"}
							style={{ lineHeight: '64px' }}
						>
							<Menu.Item key="home">
								<Link to="/home">工作经历</Link>
							</Menu.Item>
							<Menu.Item key="project">
								<Link to="/project">项目展示</Link>
							</Menu.Item>
							{/* <Menu.Item key="movie">
						<Link to="/movie">人员列表</Link>
					</Menu.Item> */}
							<Menu.Item key="about">
								<Link to="/about">个人履历</Link>
							</Menu.Item>
						</Menu>
					</Header>
					<Content style={{ padding: '0 50px' }}>
						<div style={{ background: '#fff', padding: 24, minHeight: 280 }}>
							<Route path="/" component={Home} exact />
							<Route path="/home" component={Home}></Route>
							<Route path="/project" component={Project}></Route>
							<Route path="/about" component={About}></Route>
						</div>
					</Content>
					<Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
				</Layout>
			</HashRouter>
			<PostList></PostList>
		</div>
	}
}
