// 获取当前用户权限
function getUrlParse(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    if (r != null) {
        return decodeURI(r[2]);
    } else {
        return null;
    }
}

let getPower = getUrlParse("power")
let power = "other"
if (getPower == "zhangjiwen") {
    power = "admin"
}

const powerReducer = (state = { power: { id: power } }, action) => {
    switch (action.type) {
        case "POWER":
            return {
                ...state, power: action.payload
            }
        default:
            return state
    }
}
export default powerReducer