import { SELECT_CHARACTER } from "../constants/types";
import data from "../reducers/CharacterList.json";

export const selectChar = (charId) => {
    const character = data.find(x=>x.id === charId);
    return {type: SELECT_CHARACTER, payload: character};
};
