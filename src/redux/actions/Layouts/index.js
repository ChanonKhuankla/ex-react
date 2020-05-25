import React from 'react';
import { push, goBack } from 'react-router-redux';
import firebase from '../../../services/FirebaseServices'
import swal from 'sweetalert';

export const CHANGE_PAGE = 'CHANGE_PAGE';


const initialState = {
    isLoading: false,
  
}

export default function (state = initialState, data) {
    switch (data.type) {
        case CHANGE_PAGE:
            return {
                ...state,
                isLoading: data.value
            }
        default: return state;
    }
}
export const changePage = (page) => async (dispatch) => {
    return dispatch(push(page))
}

export const goBackPage = () => async (dispatch) => {
    return dispatch(goBack())
}