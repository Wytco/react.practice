import React, {Component} from 'react';
import classes from './Quize.css';
import ActiveQuize from "../../components/ActiveQuize/ActiveQuize";
import FinishedQuize from "../../components/FinishedQuize/FinishedQuize";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from 'react-redux';
import {answerQuizeClick, fetchQuizeById, retryQuizeHandler} from "../../store/Actions/ActionQuize";

class Quize extends Component {

    componentDidMount() {
        this.props.fetchQuizeById(this.props.match.params.id);
    }

    componentWillUnmount() {
        this.props.retryQuizeHandler();
    }

    render() {
        return (
            <div className={classes.Quize}>
                <div className={classes.QuizeWprapper}>
                    <h1>Ответьте на все вопросы</h1>
                    {
                        this.props.loading || !this.props.quize
                            ? <Loader/>
                            : this.props.isFinished
                            ? <FinishedQuize
                                results={this.props.results}
                                quize={this.props.quize}
                                onRetry={this.props.retryQuizeHandler}
                            />
                            : <ActiveQuize
                                answers={this.props.quize[this.props.activeQuestion].answers}
                                question={this.props.quize[this.props.activeQuestion].question}
                                onAnswerClick={this.props.answerQuizeClick}
                                quizeLenght={this.props.quize.length}
                                answerNumber={this.props.activeQuestion + 1}
                                state={this.props.answerState}
                            />
                    }
                </div>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        results: state.quize.results,
        isFinished: state.quize.isFinished,
        activeQuestion: state.quize.activeQuestion,
        answerState: state.quize.answerState,
        quize: state.quize.quize,
        loading: state.quize.loading
    }
}


function mapDispatchToProps(dispatch) {
    return {
        fetchQuizeById: (id) => dispatch(fetchQuizeById(id)),
        answerQuizeClick: (id) => dispatch(answerQuizeClick(id)),
        retryQuizeHandler: () => dispatch(retryQuizeHandler())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quize)
