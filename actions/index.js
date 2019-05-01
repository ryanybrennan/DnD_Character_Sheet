import { SELECT_CHARACTER } from "../constants/types";
export const selectChar = (charId) => {
    return {
        type: SELECT_CHARACTER,
        payload: charId
    };
};