import {
    FETCH_QUIZE_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS, QUIZE_ACTIVE_QUESTION, QUIZE_IS_FINISHED, QUIZE_SET_STATE, RETRY_QUIZE_HANDLER
} from "../Actions/ActionTypes";

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    results: {},
    isFinished: false,
    activeQuestion: 0,
    answerState: null,
    quize: null,
};

export default function QuizeReducer(state = initialState, action) {

    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            };
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state,
                loading: false,
                quizes: action.quizes
            };
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            };
        case FETCH_QUIZE_SUCCESS:
            return {
                ...state,
                loading: false,
                quize: action.quize
            };

        case QUIZE_SET_STATE:
            return {
                ...state,
                answerState: action.answerState,
                results: action.results
            };
        case QUIZE_IS_FINISHED:
            return {
                ...state,
                isFinished: action.isFinished
            };
        case QUIZE_ACTIVE_QUESTION:
            return {
                ...state,
                activeQuestion: action.activeQuestion,
                answerState: action.answerState
            };
        case  RETRY_QUIZE_HANDLER:
            return {
                ...state,
                results: {},
                isFinished: false,
                activeQuestion: 0,
                answerState: null
            };
        default:
            return state;
    }
}