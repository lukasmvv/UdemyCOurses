import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        idToken: authData.idToken,
        userId: authData.userId
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const authLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expirationDate');
    localStorage.removeItem('userID');
    return {
        type: actionTypes.AUTH_LOGOUT
    };
};

export const checkAuthTimeout = (expirationTime) => {
    return dispatch => {
        // expects milliseconds
        setTimeout(() => {
            dispatch(authLogout());
        },expirationTime);
    };
};

export const auth = (email,password,isSignup) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
            email: email,
            password: password,
            returnSecureToken: true
        }
        
        let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBraZg8twyC69JmKJzr0VrxI-N9snYkVJU';
        if (!isSignup) {
            url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBraZg8twyC69JmKJzr0VrxI-N9snYkVJU'
        }
        axios.post(url,authData)
        .then(res => {
            const expirationDate = new Date(new Date().getTime() + 60*60*1000);
            localStorage.setItem('token', res.data.idToken);
            localStorage.setItem('expirationDate', expirationDate);
            localStorage.setItem('userID', res.data.localId);
            dispatch(authSuccess(res.data));
            dispatch(checkAuthTimeout(60*60*1000));
        })
        .catch(err => {
            dispatch(authFail(err.response.data.error));
        });
    };
};

export const setAuthRedirect = (path) => {
    return {
        type: actionTypes.SET_AUTH_REDIRECT_PATH,
        path: path
    }
}

export const authCheckState = () => {
    return dispatch => {
        const token = localStorage.getItem('token');
        if (!token) {
            dispatch(authLogout());
        } else {
            const expDate = new Date(localStorage.getItem('expirationDate'));
            if (expDate > new Date()) {
                const userID = localStorage.getItem('userID');
                dispatch(authSuccess({idToken: token, userId: userID}));
                dispatch(checkAuthTimeout((expDate.getTime() - new Date().getTime())));// getTime() returns value in milliseconds
            } else {
                dispatch(authLogout());
            }            
        }        
    };
};