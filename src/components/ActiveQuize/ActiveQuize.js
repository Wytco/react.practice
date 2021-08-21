import React from 'react';
import classes from './ActiveQuize.css';
import AnswersList from "./AnswersList/AnswersList";

const ActiveQuize = (props) => {
    return (
        <div className={classes.ActiveQuize}>
            <p className={classes.Question}>
            <span>
                <strong>{props.answerNumber}.</strong>&nbsp;
                {props.question}
            </span>
                <small>{props.answerNumber} из {props.quizeLenght}</small>
            </p>
            <AnswersList
                answers={props.answers}
                onAnswerClick={props.onAnswerClick}
                state={props.state}
            />
        </div>
    );
}
export default ActiveQuize;
