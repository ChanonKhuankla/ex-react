import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { getUserList, getUsers, createUser, createEmailUser } from "../../redux/actions/Users";
import './TableUser.css'
import { Form, Input, Button, Radio, InputNumber } from 'antd';
import queryString from 'query-string';

class TableUserCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
        }
    }

    async componentDidMount() {
        await this.props.getUsers()
        // const { usersList } = this.props.Users
        // const { id } = queryString.parse(this.props.location.search)
        // const user = usersList.find( f => f.id === id)
        // if(id &&) {

        // }
    }

    onFinish = async values => {
        await this.props.createEmailUser(values)
    };

    render() {
        const { isLoading, usersList } = this.props.Users
        const validateMessages = {
            required: 'Please input your ${label}',
            types: {
                number: '${label} is not a validate number!',
            },
            number: {
                range: '${label} must be between ${min} and ${max}',
            },
        };
        return (
            <>
                <div className="table-user">
                    <h3>Create Users</h3>
                </div>
                <Form
                    layout={'vertical'}
                    onFinish={this.onFinish}
                    validateMessages={validateMessages}
                >
                    {/* <Form.Item label="Email" name="username" rules={[{ required: true, type: 'email' }]}>
                        <Input placeholder="Email" />
                    </Form.Item>
                    <Form.Item label="Password" name="password" rules={[{ required: true }]}>
                        <Input.Password placeholder="Password" />
                    </Form.Item>
                    <Form.Item
                        name="confirm"
                        label="Confirm Password"
                        dependencies={['password']}
                        hasFeedback
                        rules={[
                            {
                                required: true,
                                message: 'Please confirm your password!',
                            },
                            ({ getFieldValue }) => ({
                                validator(rule, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject('The two passwords that you entered do not match!');
                                },
                            }),
                        ]}
                    >
                        <Input.Password />
                    </Form.Item> */}
                    <Form.Item label="First Name" name="firstName" rules={[{ required: true }]}>
                        <Input placeholder="First Name" />
                    </Form.Item>
                    <Form.Item label="Last Name" name="lastName" rules={[{ required: true }]}>
                        <Input placeholder="Last Name" />
                    </Form.Item>
                    <Form.Item label="Age" name="age" rules={[
                        {
                            required: true,
                            type: 'number',
                            min: 0,
                            max: 99,
                        }]} >
                        <InputNumber placeholder="Age" style={{ width: '100%' }} />
                    </Form.Item>
                    <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
                        <Input placeholder="Phone" />
                    </Form.Item>
                    <Form.Item name="address" label="ddress" rules={[{ required: true }]}>
                        <Input.TextArea />
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
            createEmailUser
        }, dispatch
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableUserCreate))