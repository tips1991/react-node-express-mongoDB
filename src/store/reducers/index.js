import { combineReducers } from 'redux'; //通过解构赋值得到createStore,为store的创建做准备,combineReducers reducers的合并方法
import counterReducer from './counter_reducer'
import postReducer from './post_reducer'
import powerReducer from './power_reducer'
// 通过combineReducers吧多个reducer进行合并
const rootReducers = combineReducers({
    counter: counterReducer,
    post: postReducer,
    power: powerReducer
})
export default rootReducers;