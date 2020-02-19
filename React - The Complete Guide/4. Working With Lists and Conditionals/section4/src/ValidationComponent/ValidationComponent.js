import React from 'react';
import './ValidationComponent.css';

const validationComponent = (props) => {
    const textLength = props.textLength;
    
    return (
        <div className="ValidationComponent">
            <p>{textLength<5 ? 'Text too short' : 'Text long enough'}</p>
        </div>
    )
}

export default validationComponent;