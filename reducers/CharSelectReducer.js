import { SELECT_CHARACTER } from "../constants/types";
import data from './CharacterList.json';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    switch (action.type) {
        case SELECT_CHARACTER:
            return {character: action.payload}
        default:
            return state;
    }
};