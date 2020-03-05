import React, {Component} from 'react';
import Aux from '../../../hoc/Aux';
import classes from './Person.css';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import AuthContext from '../../../context/auth-context';

// styled.div already returns a react component
const StyledDiv = styled.div`
            width: 60%;
            margin: 16px auto;
            border: 1px solid #eee;
            box-shadow: 0 2px 3px #ccc;
            padding: 16px;
            text-align: center;

            @media (min-width: 500px) {
                width: 450px;
            }

            `;
class Person extends Component {

    static contextType = AuthContext;

    componentDidMount() {
        console.log('[Person.js] componentDidMount');
        console.log(this.context.authenticated);
    }

    render() {
        console.log('[Person.js] render');
        return (
            // <div className={classes.Person}>
            <Aux>
                {this.context.authenticated ? <p>Authenticated!</p> : <p>Please login</p>}

                <p onClick={this.props.click} >I'm {this.props.name} and I am {this.props.age} years old.</p>
                <p>{this.props.children}</p>
                <input type="text" onChange={this.props.changed} defaultValue={this.props.name}/>            
            </Aux>
            // </div>
        )
    }    
}

Person.propTypes = {
    click: PropTypes.func,
    name: PropTypes.string,
    age: PropTypes.number,
    changed: PropTypes.func
};

export default Person;