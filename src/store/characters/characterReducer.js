import { characterActionTypes } from "./charactersActionTypes"

const initialState = {
  characterList: [],
  error: null,
  loading: false,
}

export const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case characterActionTypes.ADD_CHARACTERS: {
      return {
        ...state,
        characterList: action.payload,
      }
    }
    default:
      return state
  }
}
