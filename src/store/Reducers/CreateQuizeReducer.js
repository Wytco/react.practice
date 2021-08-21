
import {
    CREATE_QUIZE, CREATE_QUIZE_FINISHE,
} from "../Actions/ActionTypes";

const initialState = {
    quize: [],
};

export default function CreateQuizeReducer(state = initialState, action) {

    switch (action.type) {
        case CREATE_QUIZE:
            return {
                ...state,
                quize: [
                    ...state.quize,
                    action.item
                ]
            };
        case CREATE_QUIZE_FINISHE:
            return {
                ...state,
                quize: []
            };
        default:
            return state;
    }
}