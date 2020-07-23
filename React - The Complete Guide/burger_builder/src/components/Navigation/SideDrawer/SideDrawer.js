import React from 'react';
import classes from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import Backdrop from '../../UI/Backdrop/Backdrop';
import Aux from '../../../hoc/Pax';

const sideDrawer = (props) => {
    
    const attachedClasses = [classes.SideDrawer, props.open ? classes.Open : classes.Closed];
    
    return (
        <Aux>
            <Backdrop show={props.open} clicked={props.closed}></Backdrop>
            <div className={attachedClasses.join(' ')} onClick={props.closed}>
                <div className={classes.Logo}>
                    <Logo/>
                </div>
                <nav>
                    <NavigationItems isAuthenticated={props.isAuth}></NavigationItems>
                </nav>
            </div>
        </Aux>
    );
}

export default sideDrawer;