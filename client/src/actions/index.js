import axios from 'axios';
import { AUTH_USER } from './types';

export const signup = (formProps) => /*return*/ dispatch => { // we use redux thunk (control over the dispatch process)
    //dispatch({ type: AUTH_USER });
    //dispatch({ type: AUTH_USER }); // we could dispatch severals action
    /*request.then(() => { // and/or handle asynchronous request
        dispatch({ type: AUTH_USER });
    });*/

    //handle asynchronous request
    axios.post('http://localhost:3090/signup', formProps);
};