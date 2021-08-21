import {
    AUTH_LOGOUT,
    AUTH_SUCCESS
} from "../Actions/ActionTypes";

const initialState = {
    token: null
};

export default function AuthReducer(state = initialState, action) {

    switch (action.type) {
        case AUTH_SUCCESS:
            return {
                ...state, token: action.token
            };
        case AUTH_LOGOUT:
            return {
                ...state, token: null
            };
        default:
            return state
    }
}