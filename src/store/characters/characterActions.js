import { characterActionTypes } from "./charactersActionTypes"
import { fetchAllCharacters } from "../../api/api"

export const addCharacterList = (url) => {
  return async (dispatch) => {
    dispatch({ type: characterActionTypes.REQUEST_CHARACTER_START })
    try {
      const allCharacters = await fetchAllCharacters(url)
      dispatch({
        type: characterActionTypes.ADD_CHARACTERS,
        payload: allCharacters,
      })
    } catch (err) {
      dispatch({
        type: characterActionTypes.REQUEST_CHARACTER_FAIL,
        payload: err,
      })
    }
  }
}
