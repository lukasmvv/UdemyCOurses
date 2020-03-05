import React, { Component } from 'react';
import classes from './App.css';
import Persons from '../components/Persons/Persons';
import Cockpit from '../components/Cockpit/Cockpit';
import WithClass from '../hoc/WithClass';
// import styled from 'styled-components';
import ErrorBoundary from '../ErrorBoundary/ErrorBoundary';
import AuthContext from '../context/auth-context';

class App extends Component {
  constructor(props) {
    super(props);
    console.log('[App.js] constructor');
    // can set state here as well with this.state = {...}
  }

  static getDerivedStateFromProps(props, state) {
    console.log('[App.js] getDerivedStateFromProps', props);
    return state;
  }

  componentDidMount(){
    console.log('[App.js] componentDidMount');
  }

  shouldComponentUpdate(nextProps, nextState) {
    console.log('[App.js] shouldComponentUpdate');
    return true;
  }

  componentDidUpdate() {
    console.log('[App.js] componentDidUpdate');
  }

  // React state object
  state = {
    persons: [
      {id: 'gsg', name: 'Max', age: 28},
      {id: '356', name: 'Manu', age: 29},
      {id: 'ett', name: 'Stephanie', age: 30}
    ],
    otherState: 'some other value',
    showPersons: false,
    showCockpit: true,
    authenticated: false
  }

  deletePersonHandler = (index) => {
    // deletes a person from state object

    // creating copy of state array
    const persons = [...this.state.persons];

    // deleting person from array copy
    persons.splice(index, 1);

    // setting new state
    this.setState({persons: persons});
  }

  namedChangedHandler = (event, id) => {
    // handles input changes

    // findIndex works like map. loops over array and returns index of element for which a condition is met
    // finding index of person to change
    const personIndex = this.state.persons.findIndex(p => {
      return p.id === id;
    });
    
    // using the spread operator on the person object to create a new copy of the object
    const person = {
      ...this.state.persons[personIndex]
    };

    // changing name in new object
    person.name = event.target.value;

    // getting a copy of the persons array and changing name in new copy
    const persons = [...this.state.persons];
    persons[personIndex] = person;

    // updating array in state
    this.setState({persons: persons});
  }

  // using the arrow function syntax for a method [ () => {}], ensures that the this keyword in the method always refers to the class
  togglePersonsHandler = () => {
    // toggles person list

    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  loginHandler = () => {
    this.setState({authenticated: !this.state.authenticated});
  }


  
  render() {

    console.log('[App.js] render()');

    // Setting up persons list
    let persons = null;    
    if (this.state.showPersons) {
      persons = (
          <Persons 
            persons={this.state.persons}
            clicked={this.deletePersonHandler}
            changed={this.namedChangedHandler}></Persons>
      );
    }    

    // Returning JSX
    return (
        <WithClass classes={classes.App}>
          <button onClick={() => {
            this.setState({showCockpit: false});
          }}>Remove Cockpit</button>
          <AuthContext.Provider value={{authenticated: this.state.authenticated, login: this.loginHandler}}>
            {this.state.showCockpit ? <Cockpit 
                title={this.props.appTitle}
                showPersons={this.state.showPersons}
                persons={this.state.persons}
                clicked={this.togglePersonsHandler}></Cockpit> : null}
            {persons}
          </AuthContext.Provider>
            
        </WithClass>
    );
  }
}

export default App;
