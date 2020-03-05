import React, {Component} from 'react';
import Person from './Person/Person';
// import classes from './Person.css';
// import styled from 'styled-components';

// props will contain an array of persons
class Persons extends Component {

    // static getDerivedStateFromProps(props, state) {
    //     console.log('[Persons.js] getDerivedStateFromProps');
    //     return state;
    // }

    // componentWillReceiveProps(props) {
    //     console.log('[Persons.js] componentWillReceiveProps', props);
    // }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('[Persons.js] shouldComponentUpdate');
        if (nextProps.persons !== this.props.persons) {
            return true;
        } else {
            return false;
        }
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        console.log('[Persons.js] getSnapshotBeforeUpdate');
        return {message: 'Snapshot!'};
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        console.log(snapshot);
        console.log('[Persons.js] componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('[Persons.js] componentWillUnmount');
    }

    render() {
        console.log('[Persons.js] rendering...');
        return (
            this.props.persons.map((person, i, arr) => {
                return <Person 
                        key={person.id}
                        name={person.name}
                        age={person.age}
                        click={() => this.props.clicked(i)}                    
                        changed={(event) => this.props.changed(event, person.id)}>
                       </Person>
              })
        )
    }    
}

export default Persons;