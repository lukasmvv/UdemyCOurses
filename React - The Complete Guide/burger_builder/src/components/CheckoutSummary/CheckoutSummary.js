import React from 'react';
import classes from './CheckoutSummary.module.css';
import Burger from '../Burger/Burger';
import Button from '../UI/Button/Button';

const checkoutSummary = (props) => {
    return (
        <div className={classes.CheckoutSummary}>
            <h1>We hope it tastes good!</h1>
            <div style={{width: '100%', margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>
            </div>
            <Button 
                buttonType="Danger"
                clicked={props.onCheckoutCancelled}>CANCEL</Button>
            <Button 
                buttonType="Success"
                clicked={props.onCheckoutContinued}>CONTINUE</Button>
        </div>
    );
};

export default checkoutSummary;