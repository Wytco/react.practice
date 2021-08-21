import React from 'react';
import classes from './Input.css';

function isInvaalid({valid,touched,shouldValidate}) {
    return !valid && shouldValidate && touched
}

const Input = (props) => {

    const inputType = props.type || 'text';
    const cls = [classes.Input];
    const htmlFor = `${inputType}-${Math.random()}`;

    if (isInvaalid(props)) {
        cls.push(classes.invalid);
    }

    return (
        <div className={cls.join(' ')}>
            <label
                htmlFor={htmlFor}
            >{props.label}</label>
            <input
                id={htmlFor}
                type={inputType}
                value={props.value}
                onChange={props.onChange}
            />
            {isInvaalid(props) ? <span>{props.errorMessage || 'Введите верное значение'}</span> : null}
        </div>
    );
};

export default Input;
