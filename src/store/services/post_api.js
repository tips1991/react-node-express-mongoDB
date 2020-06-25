import { post } from 'axios'

// 发送api请求 获取数据
export function getPosts() {
    return post('https://api.apiopen.top/musicRankings');
}
