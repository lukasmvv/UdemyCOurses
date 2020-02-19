import React, { Component } from 'react';
import './App.css';
import ValidationComponent from './ValidationComponent/ValidationComponent';
import CharComponent from './CharComponent/CharComponent';

class App extends Component {

  state = {
    text: ''
  }

  textChangeListener = (event) => {
    this.setState({
      text: event.target.value
    });
  }

  removeCharFromText = (index) => {
    const text = [...this.state.text]; 
    text.splice(index,1); 
    this.setState({text: text.join('')});
  }

  render() {

    const text = [...this.state.text];
    let chars = null;

    if (this.state.text!=='') {
      chars = (
        <div>
          {
            text.map((char,i) => {
              return (
                <CharComponent key={`${char}-${i}`} char={char} click={() => this.removeCharFromText(i)}></CharComponent>
              )
            })
          }
        </div>
      );
    }

    return (
      <div className="App">
        <input 
          type="text" 
          onChange={(event) => this.textChangeListener(event)} 
          value={this.state.text}></input>
        <p>{this.state.text.length}</p>
        <ValidationComponent textLength={this.state.text.length}></ValidationComponent>
        {chars}
      </div>
    );
  }
}

export default App;
