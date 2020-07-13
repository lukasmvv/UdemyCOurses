import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../utility';

const initialState = {
    results: []
}

const deleteResult = (state, action) => {
    // filter returns a new array - returning true in arrow function returns that element
    const updatedArray = state.results.filter(result => result.id!==action.resultElementId);
    return updateObject(state,{results: updatedArray});
}

const resultReducer = (state=initialState, action) => {
    switch(action.type) {
        case actionTypes.STORE_RESULT:
            return updateObject(state,{results: state.results.concat({id: new Date(), val: action.result})}); // concat is like push but returns a new array
        case actionTypes.DELETE_RESULT:
            return deleteResult(state, action);
    }
    return {...state};
};

export default resultReducer;