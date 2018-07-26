import axios from 'axios';
import { AUTH_USER, AUTH_ERROR } from './types';

export const signup = (formProps, callback) => /*return*/ async dispatch => { // we use redux thunk (control over the dispatch process)
    //dispatch({ type: AUTH_USER });
    //dispatch({ type: AUTH_USER }); // we could dispatch severals action
    /*request.then(() => { // and/or handle asynchronous request
        dispatch({ type: AUTH_USER });
    });*/

    //handle asynchronous request
    try {
    const response = await axios.post('http://localhost:3090/signup', formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Email in use'});
    }
};

export const signin = (formProps, callback) => async dispatch => {
    try {
    const response = await axios.post('http://localhost:3090/signin', formProps);

    dispatch({ type: AUTH_USER, payload: response.data.token });
    localStorage.setItem('token', response.data.token);
    callback();
    } catch(e) {
        dispatch({ type: AUTH_ERROR, payload: 'Invalid login'});
    }
};

export const signout = () => {
    localStorage.removeItem('token');

    return {
        type: AUTH_USER,
        payload: ''
    }
};