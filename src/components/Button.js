import React from 'react';
import './Button.css';

const Button = (props) => {
    //console.log(props);
    return (
        <button type="submit"
            className={props.className}
            onClick={props.onClick}

        >{props.children}
        </button>
    )
}
export default Button;