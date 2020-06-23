const postReducer = (state = { list: [{ title: '你好a!' }] }, action) => {
    switch (action.type) {
        case "LOAD_POSTS":
            return {
                ...state, list: action.payload
            }
        default:
            return state
    }
}
export default postReducer