import React from 'react';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient';
import classes from './Burger.module.css';

const burger = (props) => {
    
    //console.log(props.ingredients);
    // returns array of keys in object, [meat, cheese, bacon, salad] and then looping over keys
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {

        // create a new array of length of keys value, looping over and adding a BurgerIngredient for each spot in array
        return [...Array(props.ingredients[igKey])].map((_,i) => {
            return <BurgerIngredient key={igKey+i} type={igKey}/>
        });
    }).reduce((arr, el) => {  // reduce takes [ [], [], [], [] ] and makes it one array []. concat adds an element to an array
        return arr.concat(el);
    }, []);
    // end result should look like this: 
    // [<BurgerIngredient type='cheese'/>, <BurgerIngredient type='cheese'/>, <BurgerIngredient type='meat'/>, <BurgerIngredient type='salad'/>, ...]

    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please start adding ingredients.</p>;
    }

    return (
        <div className={classes.Burger}>
            <BurgerIngredient type='bread-top'/>
            {transformedIngredients}
            <BurgerIngredient type='bread-bottom'/>
        </div>
    );
};

export default burger;