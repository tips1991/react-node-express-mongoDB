import React from 'react'
// import { Modal, Button } from 'antd';
import axios from 'axios';
import { Modal, Form, Icon, Input, Button, Checkbox, DatePicker, message } from 'antd';
import styles from './form.scss'
import FormWork from '@/components/common/form/form'
import Qs from 'qs'



class ModalDiog extends React.Component {
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
        // this.addWorkExperience();
    }
    MakeMoney = e => {
        this.setState({
            visible: false,
        });
        this.props.MakePar();
    }
    sendTimeTreePar = () => {

    }
    handleOk = e => {
        this.setState({
            visible: false,
        });
    };
    titleTips = (e) => {
        return this.props.showFormData ? "修改此条数据" : "新增工作经验"
    }

    handleCancel = e => {
        this.setState({
            visible: false,
        });
    };
    buttonNode = e => {
        return <Button type="primary" onClick={this.showModal}>
            {this.titleTips()}
        </Button>
    }
    render() {
        return <div className={styles.displayInb}>
            {/* {this.buttonNode()} */}
            <Button type="primary" onClick={this.showModal}>
                {this.titleTips()}
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

export default ModalDiog;