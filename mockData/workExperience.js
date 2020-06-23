

// 获取当前时间 start 
let getNowTime = new Date();
// 格式化时间 YY-MM--DD
function getFormatDate() {
	var date = new Date();
	var seperator = "-";
	var year = date.getFullYear();
	var month = date.getMonth() + 1;
	var nowDate = date.getDate();
	if(month >=1 && month <=9) {
		month = "0" + month;
	}
	if(nowDate >=0 && nowDate <=9) {
		nowDate = "0" + nowDate;
	}
	var newDate = year + seperator + month + seperator + nowDate;
	return newDate;
}
let nowTime = getFormatDate(getNowTime);
console.log("时间",nowTime)
// 获取当前时间 end
const workExpress = [
    {
        companyName:'北京致趣科技股份有限公司',
        postion:'WEB前端开发工程师',
        startTime:'2018-9-30',
        endTime:nowTime,
        honor:'无'
    },
    {
        companyName:'北京环球广茂科技有限公司',
        postion:'WEB前端开发工程师',
        startTime:'2016-09-20',
        endTime:'2018-09-30',
        honor:'无'
    },
    {
        companyName:'北京盛典新华科技有限公司',
        postion:'WEB前端开发工程师',
        startTime:'2013-03-05',
        endTime:'2016-09-20',
        honor:'2014年度优秀员工证书及现金奖励'
    },
    
]
module.exports = workExpress;