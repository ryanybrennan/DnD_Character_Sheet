import { FETCH_SPELLS, FETCH_SPELLS_ERROR } from '../constants/types';
import baseApi from '../constants/urls';
import Axios from 'axios';

export const fetchSpells = () => {
    return (dispatch) => {
    // Axios.get(baseApi+'spells')
    Axios.get('http://www.dnd5eapi.co/api/spells')
    .then( (response) => response.data)
    .then( (responseJson) => {
        return dispatch({type: FETCH_SPELLS, payload: responseJson.results})
    })
    .catch((error)=> {return dispatch({type: FETCH_SPELLS_ERROR, payload: error })})
    }
}