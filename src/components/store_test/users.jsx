import React from 'react'
import axios from 'axios';
import '@/css/userlist.scss';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { Tabs, Card } from 'antd';
import { loadPostsAction } from '@/store/actions/post_action'
class PostList extends React.Component {
	constructor(props) {
		super(props)
		console.log("props", this.props)
		this.state = {
			msg: '我是Home',
			list: []
		}
	}
	//当组件输出到 DOM 后会执行 componentDidMount()
	async componentDidMount() {
		let self = this
		this.props.dispatch(loadPostsAction).then(function () {
			console.log("jajah")
			self.setState({
				list: self.props.post.list.result
			}, function () {
				console.log("11", self.state.list)
			})
		});//加载远程数据
	}
	callback(key) {
		console.log(key);
	}
	listNode = () => {
		const { Meta } = Card;
		const { TabPane } = Tabs;
		if (this.state.list && this.state.list.length > 0) {
			return <Tabs defaultActiveKey="1" onChange={this.callback}>
				{
					this.state.list.map((item, index) => {
						return <TabPane tab={item.name} key={index} style={{ textAlign: "center" }}>
							{
								item.content.map((kidItem, kidIndex) => {
									return <Card
										key={kidIndex}
										hoverable
										style={{ width: 240, display: "inline-block", margin: 15 }}
										cover={<img alt="example" src={kidItem.pic_big} />}
									>
										<Meta title={"名称：" + kidItem.title} description={"作者：" + kidItem.author} />
									</Card>
								})
							}
						</TabPane>

					})
				}
			</Tabs>
		} else {
			return <div>加载中</div>
		}
	}
	render() {
		const self = this
		return <div>
			<div>此处接口为redux测试接口</div>
			{this.listNode()}
		</div>
	}
}
// 通过connect链接组件和redux数据
const mapStateToProps = (state, ownProps) => {
	return {
		post: state.post
	}
}
// const mapDispatchToProps = (dispatch, ownProps) => {
// 	return {
// 		dispatch1: () => {
// 			dispatch(bindActionCreator)
// 		}
// 	}
// }
export default connect(mapStateToProps)(PostList)