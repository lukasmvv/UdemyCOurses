import * as actionTypes from '../actions/actionTypes';
import {updateObject} from '../../shared/utility';

const initialState = {
    ingredients: null,
    price: 4,
    error: false,
    building: false
}

const INGREDIENTS_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
}

const reducer = (state=initialState,action) => {    
    switch(action.type) {
        case actionTypes.ADD_INGREDIENTS: // one method of updating states - using a utility update function
            const updatedIngredient = {[action.ingredientName]: state.ingredients[action.ingredientName] + 1};
            const updatedIngredients = updateObject(state.ingredients, updatedIngredient);
            const updatedState = {
                ingredients: updatedIngredients,
                price: state.price + INGREDIENTS_PRICES[action.ingredientName],
                building: true
            };
            return updateObject(state, updatedState);
        case actionTypes.REMOVE_INGREDIENTS:
            return {
                ...state,
                ingredients: {
                    ...state.ingredients,
                    [action.ingredientName]: state.ingredients[action.ingredientName] - 1
                },
                price: state.price - INGREDIENTS_PRICES[action.ingredientName],
                building: true
            }
        case actionTypes.SET_INGREDIENTS:
            return {
                ...state,
                ingredients: { // affects order. simpler would be ingredients: action.ingredients
                    salad: action.ingredients.salad,
                    bacon: action.ingredients.bacon,
                    cheese: action.ingredients.cheese,
                    meat: action.ingredients.meat
                },
                error: false,
                price: 4,
                building: false
            }
        case actionTypes.FETCH_INGREDIENTS_FAILED:
            return {
                ...state,
                error: true
            }
        default:
            return {
                ...state
            }
    }
}

export default reducer;