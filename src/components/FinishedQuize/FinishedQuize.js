import React from 'react';
import {Link} from 'react-router-dom'
import classes from './FinishedQuize.css';
import Buttons from "../UI/Buttons/Buttons";

const FinishedQuize = (props) => {

    const successCount = Object.keys(props.results).reduce((total, key) => {
        if (props.results[key] === 'success') {
            total++
        }
        return total;
    }, 0);

    return (
        <div className={classes.FinishedQuize}>
            <ul>
                {props.quize.map((quizeItem, index) => {

                        const cls = [
                            'fa',
                            props.results[quizeItem.id] === 'error' ? 'fa-times' : 'fa-check',
                            classes[props.results[quizeItem.id]]
                        ];

                        return (
                            <li key={index}>
                                <strong>{index + 1}.</strong>&nbsp;
                                {quizeItem.question}
                                <i className={cls.join(' ')}/>
                            </li>
                        )
                    }
                )}
            </ul>
            <p>Правильно {successCount} из {props.quize.length}</p>
            <div>
                <Buttons
                    type='primary'
                    onClick={props.onRetry}
                >Повторить</Buttons>
                <Link to={'/'}>
                    <Buttons
                        type='success'
                        //onClick={props.onRetry}
                    >Перейти в список тестов</Buttons>
                </Link>
            </div>
        </div>
    );
}

export default FinishedQuize;


