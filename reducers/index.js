import {combineReducers} from 'redux';
import CharacterReducer from './CharacterReducer';
import CharSelectReducer from './CharSelectReducer';

export default combineReducers({
    characters: CharacterReducer,
    charSelect: CharSelectReducer
});