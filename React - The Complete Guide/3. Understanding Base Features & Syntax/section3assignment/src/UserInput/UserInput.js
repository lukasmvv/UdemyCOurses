import React from 'react';
// import './Person.css';

const userInput = (props) => {
    return (
        <div className="UserInput">
            <input style={props.style} type="text" onChange={props.changed} defaultValue={props.def}/>
        </div>
    )
}

export default userInput;