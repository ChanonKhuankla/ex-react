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

export const logoutUser = () => async (dispatch) => {
    dispatch({ type: LOADDING_USER, value: true })
    const users = await firebase.getAuth().logout()
    dispatch(push('/'))
    dispatch({ type: LOADDING_USER, value: false })
}

export const editProfile = (password) => async (dispatch) => {
    const users = await firebase.getAuth().newPassword(password)
    console.log('editProfile',users);
    
}

export const loginUser = (usersname, password) => async (dispatch) => {
    dispatch({ type: LOADDING_USER, value: true })
    const users = await firebase.getAuth().login(usersname, password)
    console.log('loginUser', users);

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

export const createUser = () => async (dispatch) => {
    dispatch(push('/users/create'))
}

export const editUser = (query) => async (dispatch) => {
    console.log('query', query);
    dispatch(push('/users/edit?id=' + query))
}


export const createEmailUser = (data) => async (dispatch) => {
    // const users = await firebase.getAuth().createNewUser(data.username, data.password)
    const respon = {
        // uid : users.uid,
        firstName: data.firstName,
        lastName: data.lastName,
        age: data.age,
        phone: data.phone,
        address: data.address,
    }
    const profileUser = await firebase.getDatabase().addUser(respon)
    if (profileUser) {
        dispatch(push('/users'))

    }

}

export const getUsers = () => async (dispatch) => {
    let users = await firebase.getAuth().onAuthStateChanged()
    if (users) {
        return dispatch({ type: GET_USER, value: users })
    }
}

export const updateUsers = (data, id) => async (dispatch) => {
    
    const result = await firebase.getDatabase().updateUser(id, data)
    if (result) {
        dispatch(push('/users'))
    }

}
export const deleteUser = (id) => async (dispatch) => {
    const result = await firebase.getDatabase().deleteUser(id)
    dispatch(getUserList())
}

export const getUserList = () => async (dispatch, getState) => {
    let users = []
    dispatch({ type: LOADDING_USER, value: true })
    const user = getState().Users.users
    console.log('user',user);
    
    const usersList = await firebase.getDatabase().getUser()
    try {
        usersList.forEach(doc => {
            // if(user.uid === doc.data().uid) return
            users.push({
                firstName: doc.data().firstName,
                lastName: doc.data().lastName,
                phone: doc.data().phone,
                address: doc.data().address,
                age: doc.data().age,
                id: doc.id,
                uid: doc.data().uid,
            })
        })

        dispatch({ type: STORE_USER_LIST, value: users })

        dispatch({ type: LOADDING_USER, value: false })

    } catch (error) {
        console.log('Error getting documents', error);
    }

}
