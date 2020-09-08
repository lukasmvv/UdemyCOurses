import {put, delay, call} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
// import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import axios from 'axios';

export function* logoutSaga(action) {
    yield localStorage.removeItem('token');
    yield localStorage.removeItem('expirationDate');
    yield localStorage.removeItem('userID');
    // yield call([localStorage,'removeItem'],'token');
    yield put(actions.logoutSucceed); //put dispatches the action
}

export function* checkAuthTimeoutSaga(action) {
    yield delay(action.expirationtime*1000);
    yield put(actions.authLogout());
}

export function* authUserSaga(action) {
    yield put(actions.authStart);
    const authData = {
        email: action.email,
        password: action.password,
        returnSecureToken: true
    }
    let url = 'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBraZg8twyC69JmKJzr0VrxI-N9snYkVJU';
    if (!action.isSignup) {
        url = 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBraZg8twyC69JmKJzr0VrxI-N9snYkVJU'
    }
    try {
        const res = yield axios.post(url,authData);
        const expirationDate = yield new Date(new Date().getTime() + 60*60*1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userID', res.data.localId);
        yield put(actions.authSuccess(res.data));
        yield put(actions.checkAuthTimeout(60*60*1000));
    } catch(err) {
        yield put(actions.authFail(err.response.data.error));
    }
}

export function authCheckStateSaga(action) {
    const token = yield localStorage.getItem('token');
    if (!token) {
        yield get(actions.authLogout());
    } else {
        const expDate = yield new Date(localStorage.getItem('expirationDate'));
        if (expDate > new Date()) {
            const userID = yield localStorage.getItem('userID');
            put(actions.authSuccess({idToken: token, userId: userID}));
            put(actions.checkAuthTimeout((expDate.getTime() - new Date().getTime())));// getTime() returns value in milliseconds
        } else {
            put(authLogout());
        }            
    } 
}