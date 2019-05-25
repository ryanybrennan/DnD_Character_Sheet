import { FETCH_SPELLS, FETCH_SPELLS_ERROR } from "../constants/types";

const INITIAL_STATE = []

export default (state = INITIAL_STATE, action)=>{
    switch(action.type){
        case FETCH_SPELLS:
            return {spells: action.payload};
        case FETCH_SPELLS_ERROR:
            return {error: action.payload};
        default:
            return state;
    }
}