import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { getUserList, getUsers, createUser, createEmailUser, updateUsers } from "../../redux/actions/Users";
import { changePage } from "../../redux/actions/Layouts";

import './TableUser.css'
import { Form, Input, Button, Radio, InputNumber } from 'antd';
import queryString from 'query-string';
import Container from 'react-bootstrap/Container'
import { Spin } from 'antd';

class TableUserCreate extends Component {

    constructor(props) {
        super(props);
        this.state = null
    }

    async componentDidMount() {
        await this.props.getUsers()
        await this.props.getUserList()
        const { usersList } = this.props.Users
        const { id } = queryString.parse(this.props.location.search)
        const user = usersList.find(f => f.id === id)
        if (!id || !user) {
            this.props.changePage('/users')
        } else {
            this.setState(user)
        }
    }

    onFinish = async values => {
        await this.props.updateUsers(values,this.state.id)
    };

    render() {
        const { isLoading } = this.props.Users
        const validateMessages = {
            required: 'Please input your ${label}',
            types: {
                number: '${label} is not a validate number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };

        if (isLoading || !this.state) {
            return (
                <>
                    <Container>
                        <div className="example">
                            <Spin />
                        </div>
                    </Container>
                </>
            )
        }

        return (

            <>
                <div className="table-user">
                    <h3>Edit Users</h3>
                </div>
                <Form
                    layout={'vertical'}
                    onFinish={this.onFinish}
                    validateMessages={validateMessages}
                >
                    <Form.Item label="First Name" initialValue={this.state.firstName} name="firstName" rules={[{ required: true }]}>
                        <Input placeholder="First Name" value={this.state.firstName} defaultValue={this.state.firstName} />
                    </Form.Item>
                    <Form.Item label="Last Name" initialValue={this.state.lastName} name="lastName" rules={[{ required: true }]}>
                        <Input placeholder="Last Name" value={this.state.lastName} defaultValue={this.state.lastName} />
                    </Form.Item>
                    <Form.Item label="Age" name="age" initialValue={this.state.age} rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            max: 99,
                        }]} >
                        <InputNumber placeholder="Age" value={this.state.age} defaultValue={this.state.age} style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone" initialValue={this.state.phone} rules={[{ required: true }]}>
                        <Input placeholder="Phone" value={this.state.phone} defaultValue={this.state.phone} />
                    </Form.Item>
                    <Form.Item name="address" label="address" initialValue={this.state.address} rules={[{ required: true }]}>
                        <Input.TextArea value={this.state.address} defaultValue={this.state.address} />
                    </Form.Item>
                    <Form.Item >
                        <Button type="primary" htmlType="submit">Submit</Button>
                    </Form.Item>
                </Form>
            </>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        history: state.history,
        Users: state.Users
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            getUsers,
            getUserList,
            createUser,
            createEmailUser,
            changePage,
            updateUsers
        }, dispatch
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableUserCreate))