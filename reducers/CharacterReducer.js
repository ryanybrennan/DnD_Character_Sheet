import data from './CharacterList.json';
import { SELECT_CHARACTER } from '../constants/types.js';

const INITIAL_STATE = {};

export default (state = INITIAL_STATE, action) => {
    return data;
    // switch (action.type) {
    //     case SELECT_CHARACTER:
    //       return action.payload;
    //     default:
    //       return state;
    //   }
      
}