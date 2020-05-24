import React, { Component, Fragment } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Layout, Menu, Breadcrumb } from 'antd';
import { UserOutlined, LaptopOutlined, NotificationOutlined } from '@ant-design/icons';
import { withRouter } from 'react-router-dom';
import { changePage } from '../redux/actions/Layouts'

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
        console.log('key',typeof key);
        
        this.setState({ selectMenu: key })
        if (key === '1') {
            this.props.changePage('/users')
        } else if (key === '2') {
            this.props.changePage('/profile')
        }
    }

    render() {
        return (
            <Layout>
                <Header className="header">
                    <div className="logo" />
                    <Menu onClick={this.onClickMenu} theme="dark" mode="horizontal" selectedKeys={[this.state.selectMenu]}>
                        <Menu.Item key="1" >Users</Menu.Item>
                        <Menu.Item key="2">Profile</Menu.Item>
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
        history: state.history
    }
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators(
        {
            changePage
        }, dispatch
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Layouts))