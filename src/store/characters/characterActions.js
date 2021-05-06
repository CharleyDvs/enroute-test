import { characterActionTypes } from "./charactersActionTypes"

export const addCharacterList = (characterList) => ({
  type: characterActionTypes.ADD_CHARACTERS,
  payload: characterList,
})
