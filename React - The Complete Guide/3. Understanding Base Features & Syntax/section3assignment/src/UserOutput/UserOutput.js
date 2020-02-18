import React from 'react';
import './UserOutput.css';

const userOutput = (props) => {

    return (
        <div className="UserOutput">
            <h1 className="header">{props.username}</h1>
            <p>{props.num}</p>
            <p>{props.children}</p>
        </div>
    )
}

export default userOutput;