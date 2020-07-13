export const updateObject = (oldObject, updatedValues) => {
    return {
        ...oldObject,
        ...updatedValues
    }
};

// note here immutability
// changing something immutabilly, means not mutating the original source
// spreading an array will returns a new array, but if the values are objects, the objects are still references to original
// removing a whole object from array is OK, but mutating a value in an object in an array is a problem
// the object must be spread when added to new array
// Immutable Update Patterns on reduxjs.org: https://redux.js.org/recipes/structuring-reducers/immutable-update-patterns/