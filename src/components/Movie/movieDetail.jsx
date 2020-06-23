import React from 'react';
import { Button, Icon } from 'antd';
export default class MovieDetail extends React.Component{
    constructor(props){
        super(props)
        this.state={

        }
    }
    render(){
        return <div>
            <Button type="primary" onClick={this.goBack}>
                <Icon type="left" />
                返回用户列表
            </Button>
            <h1>用户详情</h1>
        </div>
    }
    goBack=()=>{
        this.props.history.go(-1)
    }
}