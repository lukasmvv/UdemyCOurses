import React from 'react';
import './ValidationComponent.css';

const validationComponent = (props) => {    

    let valMes = 'Text long enough';

    if (props.textLength<5) {
        valMes = 'Text too short';
    }
    return (
        <div className="ValidationComponent">
            <p>{valMes}</p>
        </div>
    )
}

export default validationComponent;