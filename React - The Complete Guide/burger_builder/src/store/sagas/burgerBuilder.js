import {put, delay} from 'redux-saga/effects';
// import {delay} from 'redux-saga';
// import * as actionTypes from '../actions/actionTypes';
import * as actions from '../actions/index';
import axios from '../../Axios-order';

export function* initIngredientSaga(action) {
    try {
        const res = yield axios.get('/ingredients.json');
        yield put(actions.setIngredients(res.data));
    } catch (err) {
        yield put(actions.fetchIngredientsFailed());
    }    
}