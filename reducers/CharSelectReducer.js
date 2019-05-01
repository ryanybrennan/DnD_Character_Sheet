import { SELECT_CHARACTER } from "../constants/types";

export default (state = null, action) => {
    switch (action.type) {
        case SELECT_CHARACTER:
            return {...state, id: action.payload}
        default:
            return state;
    }
};