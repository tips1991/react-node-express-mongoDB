import React from 'react'
// import { Modal, Button } from 'antd';
import axios from 'axios';
import { Modal, Form, Icon, Input, Button, Checkbox, DatePicker, message } from 'antd';
import styles from './modal.scss'
import FormWork from '@/components/common/addProjectModal/form'
import Qs from 'qs'


class AddProjectModal extends React.Component {
    constructor(props) {
        super()
        this.state = {
            msg: '我是modal框',
            content: 'Modal',
            formData: {
                companyName: 'compny name',
                postion: 'position',
                startTime: 'start time',
                endTime: 'end time',
                honor: 'honorhonor'
            }
        }
        this.handleOk = this.handleOk.bind(this)
    }
    state = { visible: false };

    showModal = () => {
        this.setState({
            visible: true,
        });
    };
    componentDidMount() {
        console.log("modalprops", this.props)
        // this.addWorkExperience();
    }
    MakeMoney = e => {
        this.setState({
            visible: false,
        });
        this.props.sendGetData()
    }
    sendTimeTreePar = () => {

    }
    handleOk = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    titleTips = (e) => {
        return this.props.showFormData ? "修改此条数据" : "新增工作经验"
    }

    handleCancel = e => {
        console.log(e);
        this.setState({
            visible: false,
        });
    };
    render() {

        return <div className={styles.displayInb}>
            <Button type="primary" onClick={this.showModal}>
                {this.props.titles}
            </Button>
            <Modal
                title="Basic Modal"
                visible={this.state.visible}
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <FormWork showFormData={this.props.showFormData} MakeMoney={this.MakeMoney}></FormWork>
            </Modal>
        </div>
    }
}

export default AddProjectModal;