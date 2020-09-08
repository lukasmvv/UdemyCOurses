import {logoutSaga, checkAuthTimeoutSaga, authUserSaga, authCheckStateSaga} from './auth';
import {initIngredientSaga} from '../sagas/burgerBuilder';
import {takeEvery, take, actionChannel, all, takeLatest} from 'redux-saga/effects';
import {purchaseBurgerSaga, fetchOrdersSaga} from '../sagas/orders';
import * as actionTypes from '../actions/actionTypes';

export function* watchAuth() {
    // yield all([
    //     takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga),
    //     takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga),
    //     takeEvery(actionTypes.AUTH_USER, authUserSaga),
    //     takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga)
    // ]);
    yield takeEvery(actionTypes.AUTH_INITIATE_LOGOUT, logoutSaga); // setting up listener for auth_initiate_logout actions
    yield takeEvery(actionTypes.AUTH_CHECK_TIMEOUT, checkAuthTimeoutSaga);
    yield takeEvery(actionTypes.AUTH_USER, authUserSaga);
    yield takeEvery(actionTypes.AUTH_CHECK_STATE, authCheckStateSaga);
}

export function* watchBugerBuilder() {
    yield takeEvery(actionTypes.INIT_INGREDIENTS,initIngredientSaga);
}

export function* watchOrder() {
    yield takeEvery(actionTypes.PURCHASE_BURGER,purchaseBurgerSaga);
    // yield takeLatest(actionTypes.PURCHASE_BURGER,purchaseBurgerSaga); cancels all actions besides latest
    yield takeEvery(actionTypes.FETCH_ORDERS,fetchOrdersSaga);
}