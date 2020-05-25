import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import React, { Component, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { getUserList, getUsers, createUser, editUser, deleteUser } from "../../redux/actions/Users";
import { Table, Tag, Space } from 'antd';
import { Spin } from 'antd';
import Container from 'react-bootstrap/Container'
import { Button } from 'antd';
import './TableUser.css'
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

    onClickCreateUser = () => {
        this.props.createUser()
    }

    editUser = (id) => {
        this.props.editUser(id)
    }

    deleteUser = (id) => {
        this.props.deleteUser(id)
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
                render: (text, record) => {
                    console.log('record', record.id);

                    return (<Space size="middle">
                        <Button onClick={(e) => this.editUser(record.id)}>Edit</Button>
                        <Button onClick={(e) => this.deleteUser(record.id)}>Delete</Button>
                    </Space>)
                },
            },
        ];

        const { isLoading, usersList, users } = this.props.Users
        console.log('users',users);
        
        const filterUser = users && usersList.filter( f => f.uid !== users.uid )
        return (
            <>
                <div className="table-user">
                    <h3>Users</h3>
                    <Button onClick={this.onClickCreateUser} type="primary">Create</Button>
                </div>
                <Table loading={isLoading} columns={columns} dataSource={filterUser} />
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
            editUser,
            deleteUser
        }, dispatch
    )
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(TableUser))