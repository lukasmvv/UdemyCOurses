import React, { Component } from 'react';
import './App.css';
import UserInput from './UserInput/UserInput';
import UserOutput from './UserOutput/UserOutput';

class App extends Component {

  state = {
    username: 'Darth Maul'
  }

  changeUsernameHandler = (event) => {
    this.setState({username: event.target.value});
  }

  render() {

    const style = {
      backgroundColor: 'red',
      font: 'inherit',
      border: '2px solid black',
      padding: '8px',
      textAlign: 'center'
    }


    return (
      <div className="App">
        <UserOutput num="1." username={this.state.username}>Peace is a lie. There is only Passion.</UserOutput>
        <UserOutput num="2.">Through Passion I gain Strength.</UserOutput>
        <UserOutput num="3.">Through Strength I gain Power.</UserOutput>
        <UserOutput num="4.">Through Power I gain Victory.</UserOutput>
        <UserOutput num="5.">Through Victory my chains are Broken.</UserOutput>
        <UserOutput num="6.">The Force shall free me.</UserOutput>
        <UserInput style={style} changed={this.changeUsernameHandler} def={this.state.username}></UserInput>
      </div>
    );
  }
}

export default App;
