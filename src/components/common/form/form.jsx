import React from 'react'
import { useState } from 'react';
import { Modal, Form, Icon, Input, Button, Checkbox, DatePicker,message } from 'antd';
import styles from './form.scss'
import axios from 'axios';
import Qs from 'qs'
import moment from 'moment';
const { MonthPicker, RangePicker } = DatePicker;

const dateFormat = 'YYYY/MM/DD';
const monthFormat = 'YYYY/MM';

const dateFormatList = ['DD/MM/YYYY', 'DD/MM/YY'];


class WorkForm extends React.Component{
	constructor(props){
		super()
		this.state = {
			msg:'我是注册新工作经历',
			content:'Form',
			defaultVal:'',
			fields: {
				companyName: {
				  	value: 'benjycui',
				},
			},
		}
	}
	StudyMakeMoney=()=>{ // 学习挣钱，调用父组件方法
		this.props.MakeMoney();
	}
	handleSubmit = e => {
        e.preventDefault();
        this.props.form.validateFields((err, fieldsValue) => {
          if (!err) {
            
			if(this.props.showFormData){
				const values = {
					...fieldsValue,
					'startTime': fieldsValue['startTime'].format('YYYY-MM-DD'),
					'endTime': fieldsValue['endTime'].format('YYYY-MM-DD'),
					'id':this.props.showFormData.id
				};
				this.edit(values)
			}else{
				const values = {
					...fieldsValue,
					'startTime': fieldsValue['startTime'].format('YYYY-MM-DD'),
					'endTime': fieldsValue['endTime'].format('YYYY-MM-DD'),
					'id':(new Date()).valueOf()
				};
				this.addWorkExperience(values)
			}
            
            console.log('Received values of form: ', values);
          }
        });
    }
	addWorkExperience = ((values)=>{
		const key = 'updatable';
        const self =this    //先存一下this，以防使用箭头函数this会指向我们不希望它所指向的对象。
        const hide = message.loading('Loading..', 0);
        axios({
            url: 'api/addWorkExperience',
            method: 'post',
            transformRequest: [function (data) {
                // 对 data 进行任意转换处理
                return Qs.stringify(data)
            }],
            data: {...values}
        }).then(function (res) {
            console.log(res)
            if(res.data.code == '0'){
                self.setState({
                    workExperienceData:res.data
				});
				console.log("chenggongjinrudaozheli")
				self.StudyMakeMoney()
				setTimeout(hide, 100);
                setTimeout(() => {
                    message.success({ content:res.data.message, key, duration: 2 });
                }, 1000);
            }else{
                message.success({ content:res.data.message, key, duration: 2 });
            }
		})
		.catch(function (err) {
			console.log(err);
        })
	})
	edit = (item)=>{
		const key = 'updatable';
		const self =this
		const hide = message.loading('Loading..', 0);
		axios({
            url: 'api/workExperienceEdit',
            method: 'post',
            transformRequest: [function (data) {
                return Qs.stringify(data)
            }],
            data: {
				id:item.id,
				item:item
			}
        }).then(function (res) {
            console.log(res)
            if(res.data.code == '0'){
				self.StudyMakeMoney()
				setTimeout(hide, 100);
                setTimeout(() => {
                    message.success({ content:res.data.message, key, duration: 2 });
                }, 1000);
            }
		})
		.catch(function (err) {
			console.log(err);
        })
	}
	componentWillMount(){
		const self = this
		console.log("props",this.props)
		// console.log("timeTreeData",this.defaultVal)
	}
	render(){
		const { getFieldDecorator } = this.props.form;
		const config = {
            rules: [{ type: 'object', required: true, message: 'Please select time!' }],
		};
		return <div>
            <Form onSubmit={this.handleSubmit} className="login-form">
				<Form.Item label="公司名称">
				{getFieldDecorator('companyName', {
					rules: [{ required: true, message: 'Please input your companyName!' }],
					initialValue:this.props.showFormData?this.props.showFormData.companyName:''
				})(
					// <Input className = {styles.antinput}
					<Input 
					prefix={<Icon type="home" style={{ color: 'rgba(0,0,0,.25)' }} />}
					placeholder="company name"
					/>,
				)}
				</Form.Item>
				<Form.Item label="任职岗位">
				{getFieldDecorator('postion', {
					rules: [{ required: true, message: 'Please input your position!' }],
					initialValue:this.props.showFormData?this.props.showFormData.postion:''
				})(
					<Input
					prefix={<Icon type="user-delete" style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="text"
					placeholder="position"
					/>,
				)}
				</Form.Item>
				<Form.Item label="开始时间">
				{getFieldDecorator('startTime', {
					rules: [{ required: true, message: 'Please input your start time!' }],
					initialValue:this.props.showFormData?moment(this.props.showFormData.startTime, dateFormat):null
				})(
					<DatePicker />
				)}
				</Form.Item>
				<Form.Item label="结束时间">
				{getFieldDecorator('endTime', {
					rules: [{ required: true, message: 'Please input your end time!' }],
					initialValue:this.props.showFormData?moment(this.props.showFormData.endTime, dateFormat):null
				})(<DatePicker />)}
				</Form.Item>
				<Form.Item label="获得荣誉">
				{getFieldDecorator('honor', {
					rules: [{ required: true, message: 'Please input your honor!' }],
					initialValue:this.props.showFormData?this.props.showFormData.honor:''
				})(
					<Input
					prefix={<Icon type="user-delete" style={{ color: 'rgba(0,0,0,.25)' }} />}
					type="text"
					placeholder="position"
					/>,
				)}
				</Form.Item>
				<Form.Item>
				<p>
				{getFieldDecorator('remember', {
					valuePropName: 'checked',
					initialValue: true,
				})(<Checkbox>Remember me</Checkbox>)}
				<a className="login-form-forgot" href="">
					Forgot password
				</a>
				</p>
				<Button type="primary" htmlType="submit" className="login-form-button" className = {styles.marginR10}>
					Log in
				</Button>
				Or <span>register now!</span>
				</Form.Item>
			</Form>
		</div>
	}
}
const WrappedNormalLoginForm = Form.create({ name: 'normal_login' })(WorkForm);
export default WrappedNormalLoginForm;