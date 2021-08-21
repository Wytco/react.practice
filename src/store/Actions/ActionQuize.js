import Axios from "../../axios/axios-db";
import {
    FETCH_QUIZE_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, QUIZE_ACTIVE_QUESTION, QUIZE_IS_FINISHED,
    QUIZE_SET_STATE, RETRY_QUIZE_HANDLER
} from "./ActionTypes";


export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const response = await Axios.get('/quizes.json');

            const quizes = [];

            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Test # ${index + 1}`
                })
            });
            dispatch(fetchQuizesSuccess(quizes));
            // console.log(response.data)
        } catch (e) {
            // console.log(e)
            dispatch(fetchQuizesError(e));
        }
    }
}

export function fetchQuizeById(quizeId) {
    return async dispatch => {
        dispatch(fetchQuizesStart());
        try {
            const response = await Axios.get(`/quizes/${quizeId}.json`);
            const quize = response.data;
            dispatch(fetchQuizeSuccess(quize));
            // console.log(response.data)
        } catch (e) {
            dispatch(fetchQuizesError(e));
            //console.log(e)
        }

    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }
}

export function fetchQuizeSuccess(quize) {
    return {
        type: FETCH_QUIZE_SUCCESS,
        quize: quize
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR
    }
}

export function answerQuizeClick(AnswerId) {
    return (dispatch, getState) => {

        const state = getState().quize;

        if (state.answerState) {
            const key = Object.keys(state.answerState)[0];
            if (state.answerState[key] === 'success') {
                return
            }
        }

        const question = state.quize[state.activeQuestion];

        const results = state.results;

        if (question.rightAnswerId === AnswerId) {

            if (!results[question.id]) {
                results[question.id] = 'success';
            }

            dispatch(qiuzeSetState({[AnswerId]: 'success'}, results));

            const timeout = window.setTimeout(() => {
                if (isQuizeFinished(state)) {
                    dispatch(quizeIsFinished(true));
                } else {
                    dispatch(quizeActiveQuestion(state.activeQuestion + 1, null));
                }

                window.clearTimeout(timeout)
            }, 1000)
        } else {
            results[question.id] = 'error';
            dispatch(qiuzeSetState({[AnswerId]: 'error'}, results));
        }
    }
}

export function qiuzeSetState(answerState, results) {
    return {
        type: QUIZE_SET_STATE,
        answerState,
        results
    }
}

export function quizeIsFinished(isFinished) {
    return {
        type: QUIZE_IS_FINISHED,
        isFinished: isFinished
    }
}

export function quizeActiveQuestion(activeQuestion, answerState) {
    return {
        type: QUIZE_ACTIVE_QUESTION,
        activeQuestion: activeQuestion,
        answerState: answerState
    }
}

function isQuizeFinished(state) {
    return state.activeQuestion + 1 === state.quize.length
}

export function retryQuizeHandler() {
    return {
        type:  RETRY_QUIZE_HANDLER
    }
}