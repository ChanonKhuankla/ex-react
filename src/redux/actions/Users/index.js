import React from 'react';
import { push, goBack } from 'react-router-redux';
import firebase from '../../../services/FirebaseServices'
import swal from 'sweetalert';

export const GET_USER = 'GET_USER';
export const LOADDING_USER = 'LOADDING_USER';
export const STORE_USER_LIST = 'STORE_USER_LIST';

const initialState = {
    isLoading: false,
    users: null,
    usersList: []
}

export default function (state = initialState, data) {
    switch (data.type) {
        case LOADDING_USER:
            return {
                ...state,
                isLoading: data.value
            }
        case GET_USER:
            return {
                ...state,
                users: data.value
            }
        case STORE_USER_LIST:
            return {
                ...state,
                usersList: data.value
            }
        default: return state;
    }
}
export const loginUser = (usersname, password) => async (dispatch) => {
    dispatch({ type: LOADDING_USER, value: true })
    const users = await firebase.getAuth().login(usersname, password)
    dispatch({ type: LOADDING_USER, value: false })
    if (users) {
        await swal({
            title: "Login success",
            icon: "success",
        });
        dispatch({ type: GET_USER, value: users })
        dispatch(push('/users'))
    } else {
        swal({
            title: "Please try agian",
            icon: "error",
        });
    }

}

export const getUsers = () => async (dispatch) => {
    let users = await firebase.getAuth().onAuthStateChanged()
    if (users) {
        return dispatch({ type: GET_USER, value: users })
    }
}

export const getUserList = () => async (dispatch) => {
    console.log('getUserList');
    let users = []
    dispatch({ type: LOADDING_USER, value: true })

    const usersList = await firebase.getDatabase().getUser()
    try {
        usersList.forEach(doc => {
            console.log(doc.id, '=>', doc.data().firstName);
            users.push({
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                phone: doc.data().Phone,
                address: doc.data().Address,
                age: doc.data().age,
                id: doc.id
            })
        })

        dispatch({ type: STORE_USER_LIST, value: users })

        dispatch({ type: LOADDING_USER, value: false })

    } catch (error) {
        console.log('Error getting documents', error);
    }

}
