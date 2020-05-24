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
import { loginUser, getUsers } from "../../redux/actions/Users";
import { Spin } from 'antd';
class Profile extends Component {

    constructor(props) {
        super(props);
        this.state = {

        }
    }

    async componentDidMount() {
        await this.props.getUsers()
    }

    render() {
        
        return (
            <>
            </>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Profile))