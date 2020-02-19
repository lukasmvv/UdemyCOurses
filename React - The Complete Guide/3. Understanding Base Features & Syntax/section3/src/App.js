import React, { Component } from 'react';
import './App.css';
import Person from './Person/Person';

class App extends Component {

  state = {
    persons: [
      {id: 'gsg', name: 'Max', age: 28},
      {id: '356', name: 'Manu', age: 29},
      {id: 'ett', name: 'Stephanie', age: 30}
    ],
    otherState: 'some other value',
    showPersons: false
  }

  deletePersonHandler = (index) => {
    // creating copy of state array
    const persons = [...this.state.persons];

    // deleting person from array copy
    persons.splice(index, 1);

    // setting new state
    this.setState({persons: persons});
  }

  namedChangedHandler = (event, id) => {
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

  // using this syntax for a methos, ensures that the this keyword in the method always refers to the class
  togglePersonsHandler = () => {
    const doesShow = this.state.showPersons;
    this.setState({showPersons: !doesShow});
  }

  render() {

    const style = {
      backgroundColor: 'white',
      font: 'inherit',
      border: '1px solid blue',
      padding: '8px',
      cursor: 'pointer'
    }

    let persons = null;

    if (this.state.showPersons) {
      persons = (
        <div>
          {this.state.persons.map((person, i, arr) => {
            return <Person 
                    name={person.name}
                    age={person.age}
                    click={() => this.deletePersonHandler(i)}
                    key={person.id}
                    changed={(event) => this.namedChangedHandler(event, person.id)}>
                   </Person>
          })}
        </div>
      );
    }

    return (
      <div className="App">
        <h1>I am a React Component!!!</h1>
        <p>This is really working.</p>
        <button 
          style={style}
          onClick={this.togglePersonsHandler}>Toggles Persons</button>
          {persons}
      </div>
    );
  }
}

export default App;
