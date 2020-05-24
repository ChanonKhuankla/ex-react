import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { getUserList, getUsers } from "../../redux/actions/Users";
import { Table, Tag, Space } from 'antd';
import { Spin } from 'antd';
import Container from 'react-bootstrap/Container'

class TableUser extends Component {

    constructor(props) {
        super(props);
        this.state = {
            user: this.props
        }
    }

    async componentDidMount() {
        console.log('componentDidMount');
        await this.props.getUsers()
        await this.props.getUserList()

    }

    render() {
        const columns = [
            {
                title: 'Frist Name',
                dataIndex: 'firstName',
                key: 'firstName',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Last Name',
                dataIndex: 'lastName',
                key: 'lastName',
                render: text => <a>{text}</a>,
            },
            {
                title: 'Age',
                dataIndex: 'age',
                key: 'age',
            },
            {
                title: 'Address',
                dataIndex: 'address',
                key: 'address',
            },
            // {
            //     title: 'Tags',
            //     key: 'tags',
            //     dataIndex: 'tags',
            //     render: tags => (
            //         <>
            //             {tags.map(tag => {
            //                 let color = tag.length > 5 ? 'geekblue' : 'green';
            //                 if (tag === 'loser') {
            //                     color = 'volcano';
            //                 }
            //                 return (
            //                     <Tag color={color} key={tag}>
            //                         {tag.toUpperCase()}
            //                     </Tag>
            //                 );
            //             })}
            //         </>
            //     ),
            // },
            {
                title: 'Action',
                key: 'action',
                render: (text, record) => (
                    <Space size="middle">
                        <a>Edit</a>
                        <a>Delete</a>
                    </Space>
                ),
            },
        ];

        const { isLoading , usersList } = this.props.Users

        // if (isLoading) {
        //     return (
        //         <>
        //             <Container>
        //                 <div className="example">
        //                     <Spin />
        //                 </div>
        //             </Container>
        //         </>
        //     )
        // }

        return (
            <>
                <h1>Users</h1>
                <Table loading={isLoading} columns={columns} dataSource={usersList} />
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
            getUserList
        }, dispatch
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableUser))