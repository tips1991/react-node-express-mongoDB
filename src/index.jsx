// import React,{components} from 'react'; ①
import React from 'react';
import ReactDom from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter } from 'react-router-dom'; //引入路由
import App from '@/components/App/app'; //引入组件
import store from './store/store';
// redux中的三个重要不负：action reducer state(store)
// import { conutAddAction } from './store/actions/counter_action'
// import { loadPostsAction } from './store/actions/post_action'
// store.dispatch(conutAddAction)
// store.dispatch(loadPostsAction)
// 如果要改变一个reducer的值，需要使用dispatch派发一个action
// action需要两个参数
// type 通过type区分是对state做什么操作
// payload传递的数据

ReactDom.render(<Provider store={store}>
	<App></App>
</Provider>, document.getElementById('app')
)