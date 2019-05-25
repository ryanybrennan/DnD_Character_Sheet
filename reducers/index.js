import {combineReducers} from 'redux';
import CharacterReducer from './CharacterReducer';
import CharSelectReducer from './CharSelectReducer';
import FetchSpellsReducer from './FetchSpellsReducer';

export default combineReducers({
    characters: CharacterReducer,
    charSelect: CharSelectReducer,
    spells: FetchSpellsReducer
});