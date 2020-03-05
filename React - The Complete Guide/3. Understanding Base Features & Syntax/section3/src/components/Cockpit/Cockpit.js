import React, {useEffect} from 'react';
import classes from './Cockpit.css';
// import styled from 'styled-components';
import AuthContext from '../../context/auth-context';

// props will contain an array of persons
const cockpit = (props) => {

      useEffect(() => {
        console.log('[Cockpit.js] useEffect');

        // http request...
        setTimeout(() => {
          alert('Saved data to cloud');
        },1000);
        return () => {
          console.log('[Cokcpit.js] cleanUp work in useEffect');
        }
      }, [props.persons]);

    const assignedClasses = [];
    let btnClass = '';
    if (props.showPersons) {
        btnClass = classes.Red;
    }    

    if (props.persons.length<=2) {
      assignedClasses.push(classes.red);
    }

    if (props.persons.length<=1) {
      assignedClasses.push(classes.bold);
    }


    return (
        <div className={classes.Cockpit}>
            <h1>{props.title}</h1>
            <p className={assignedClasses.join(' ')}>This is really working.</p>
            <button
            className={btnClass}
            onClick={props.clicked}>Toggles Persons</button>
            <AuthContext.Consumer>{
              (context) => <button onClick={context.login}>Login</button>}
            </AuthContext.Consumer>
            
        </div>
    )
}

export default React.memo(cockpit);