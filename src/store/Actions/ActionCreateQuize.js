import Axios from "../../axios/axios-db";
import {
    CREATE_QUIZE, CREATE_QUIZE_FINISHE,
} from "./ActionTypes";

export function createQuize(item) {
    return {
        type: CREATE_QUIZE,
        item:item
    }
}

export function finisheCreateQuize() {
    return async (dispatch,getState) => {
       await Axios.post('/quizes.json', getState().create.quize);
        dispatch(resetCreateQuize())
    }
}

export function resetCreateQuize() {
    return {
        type: CREATE_QUIZE_FINISHE
    }
}