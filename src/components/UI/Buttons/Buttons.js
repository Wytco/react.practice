import React from 'react';
import classes from './Buttons.css';


const Buttons = (props) => {

    const cls = [
        classes.Buttons,
        classes[props.type]
    ];

    return (
        <button
            className={cls.join(' ')}
            onClick={props.onClick}
            disabled={props.disable}
        >
            {props.children}
        </button>
    );
};

export default Buttons;
