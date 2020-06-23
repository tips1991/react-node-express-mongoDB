import { createStore, compose, applyMiddleware } from 'redux'; //通过解构赋值得到createStore,为store的创建做准备,combineReducers reducers的合并方法
import thunk from 'redux-thunk'
import rootReducers from './reducers'
const store = createStore(
    rootReducers,
    compose(
        applyMiddleware(...[thunk]),//需要使用的中间价数组
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    )
) //创建一个store
export default store