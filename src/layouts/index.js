import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { changePage } from '../redux/actions/Layouts'
import { logoutUser } from '../redux/actions/Users'

import firebase from '../services/FirebaseServices'
import './layouts.css'
const { SubMenu } = Menu;
const { Header, Content, Sider } = Layout;
class Layouts extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectMenu: null
        }
    }

    componentDidMount() {
        const { location } = this.props
        const { pathname } = location
        if (pathname === '/users') {
            this.setState({ selectMenu: '1' })
        } else if (pathname === '/profile') {
            this.setState({ selectMenu: '2' })
        }
    }
    onClickMenu = ({ item, key, keyPath, domEvent }) => {
        console.log('key', key);

        this.setState({ selectMenu: key })
        if (key === '1') {
            this.props.changePage('/users')
        } else if (key === '2') {
            this.props.changePage('/profile')
        } else if (key === '3') {
            this.props.logoutUser()
        }
    }

    render() {
        console.log('Users', this.props.Users);
        const { users } = this.props.Users
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu onClick={this.onClickMenu} theme="dark" mode="horizontal" selectedKeys={[this.state.selectMenu]}>
                        <Menu.Item key="1" >Users</Menu.Item>
                        <SubMenu key="sub1" icon={<UserOutlined />} title={users && users.email} style={{ float: 'right' }}>
                            <Menu.Item key="2">Profile Edit</Menu.Item>
                            <Menu.Item key="3">Logout</Menu.Item>
                        </SubMenu>
                    </Menu>

                </Header>
                <Layout>
                    <Layout style={{ padding: '0 24px 24px' }}>
                        <Breadcrumb style={{ margin: '16px 0' }}>
                        </Breadcrumb>
                        <Content
                            className="site-layout-background"
                            style={{
                                padding: 24,
                                margin: 0,
                                minHeight: 280,
                            }}
                        >
                            {this.props.children}
                        </Content>
                    </Layout>
                </Layout>
            </Layout>
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
            changePage,
            logoutUser
        }, dispatch
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layouts))