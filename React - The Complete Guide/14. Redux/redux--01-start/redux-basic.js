const redux = require('redux'); // node js syntax
const createStore = redux.createStore;

const initialState = {
    counter: 0
}

// Reducer
// the reducer takes in the old state and some action, and returns a new state
const rootReducer = (state=initialState, action) => {
    if (action.type==='INC_COUNTER') {
        return {
            ...state,
            counter: state.counter + 1
        }
    }
    if (action.type==='ADD_COUNTER') {
        return {
            ...state,
            counter: state.counter + action.value
        }
    }
    return state;
}

// Store
const store = createStore(rootReducer);
console.log(store.getState());

// Subscription
store.subscribe(() => {
    console.log('[subscription]',store.getState());
});

// Dispatching Action - type is required in object
store.dispatch({type: 'INC_COUNTER'}); // convention is all uppercase
store.dispatch({type: 'ADD_COUNTER', value: 10});
console.log(store.getState());

