import React from 'react'
import { Layout, Menu, Breadcrumb, Icon } from 'antd';
import { Route, Link, Switch } from "react-router-dom";
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
import projectList from "@/components/project/projectList";
import projectDetail from "@/components/project/projectDetail";
// import projectDetail from './projectDetail';
export default class List extends React.Component {
	constructor() {
		super()
		this.state = {
			msg: 'list'
		}
	}
	componentWillMount() {
		console.log("zhe", window.location.hash.split('/')[2])
	}
	render() {
		return <div>
			<Layout>
				<Sider width={200} style={{ background: '#fff' }}>
					<Menu
						mode="inline"
						defaultSelectedKeys={window.location.hash.split('/')[2] ? window.location.hash.split('/')[2] : 'total'}
						defaultOpenKeys={['sub1']}
						style={{ height: '100%', borderRight: 0 }}
					>
						<SubMenu
							key="sub1"
							title={
								<span>
									<Icon type="user" />
							根据技术栈分类
						</span>
							}
						>
							<Menu.Item key="total">
								<Link to="/project/total/1">所有项目</Link>
							</Menu.Item>
							<Menu.Item key="wxAppLet">
								<Link to="/project/wxAppLet/1">小程序</Link>
							</Menu.Item>
							<Menu.Item key="vue">
								<Link to="/project/vue/1">vue</Link>
							</Menu.Item>
							<Menu.Item key="react">
								<Link to="/project/react/1">react</Link>
							</Menu.Item>
							<Menu.Item key="all">
								<Link to="/project/all/1">全栈</Link>
							</Menu.Item>
						</SubMenu>

					</Menu>
				</Sider>
				<Layout style={{ padding: '0 24px 24px' }}>
					<Breadcrumb style={{ margin: '16px 0' }}>
						<Breadcrumb.Item>首页</Breadcrumb.Item>
						<Breadcrumb.Item>项目展示</Breadcrumb.Item>
					</Breadcrumb>
					<Content
						style={{
							background: '#fff',
							padding: 24,
							margin: 0,
							minHeight: 280,
						}}
					>
						项目展示<hr />
						{/* 在匹配路由规则实话，提供了2个参数 */}
						{/* 如果想要从路由规则中，提取参数，需要使用this.props.match.params获取 */}
						<Switch>
							<Route path="/project/" component={projectList} exact></Route>
							<Route path="/project/:type/:page" component={projectList}></Route>
							<Route path="/project/detail" component={projectDetail}></Route>
						</Switch>
					</Content>
				</Layout>
			</Layout>
		</div >
	}
}