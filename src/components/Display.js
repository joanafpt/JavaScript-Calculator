import React from 'react';
import './Display.css';

const Display = (props) => {
    return (
        <div className="row calculator-display">
            <div className="display-digits">{props.children}</div>
        </div>
    )
}
export default Display;