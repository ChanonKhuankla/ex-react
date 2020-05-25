import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Fragment, Component } from 'react';
import { withRouter } from 'react-router-dom';
// import { Input } from 'antd';
import { Form, Input, Button, Checkbox } from 'antd';
import Container from 'react-bootstrap/Container'
// import Button from 'react-bootstrap/Button'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import './home.css'
import { loginUser, getUsers } from "../../redux/actions/Users";
import { Spin } from 'antd';
class Home extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        await this.props.getUsers()
    }

    onFinish = async values => {
        await this.props.loginUser(values.username, values.password)
    };

    onFinishFailed = errorInfo => {
        console.log('Failed:', errorInfo);
    };

    render() {
        const { isLoading } = this.props.Users
        console.log('isLoading', isLoading);

        if (isLoading) {
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
            <Fragment>
                <Container>
                    <div style={{ paddingTop: '22vh' }}>
                        <Row>
                            <Col md={{ span: 6, offset: 3 }}>
                                <Form
                                    name="basic"
                                    onFinish={this.onFinish}
                                    onFinishFailed={this.onFinishFailed}
                                >
                                    <div className="header-auth">
                                        <h4>Sign In</h4>
                                    </div>
                                    <label className="label-email">Email</label>
                                    <Form.Item
                                        // label="Username"
                                        name="username"
                                        rules={[{ required: true, message: 'Please input your email!', type: 'email' }]}
                                    >
                                        <Input placeholder="Email" />
                                    </Form.Item>
                                    <label className="label-password">Password</label>
                                    <Form.Item
                                        // label="Password"
                                        name="password"
                                        rules={[{ required: true, message: 'Please input your password!' }]}
                                    >
                                        <Input.Password placeholder="Password" />

                                    </Form.Item>

                                    <div className="login-button">
                                        <Form.Item>
                                            <Button variant="primary" size="lg" block htmlType="submit">
                                                Login
                                            </Button>
                                        </Form.Item>
                                    </div>
                                </Form>
                            </Col>
                        </Row>

                    </div>

                </Container>
            </Fragment >
        )
    }
}

const mapStateToProps = (state) => {
    return {
        Users: state.Users
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            loginUser,
            getUsers
        }, dispatch
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Home))