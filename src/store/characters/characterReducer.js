import { characterActionTypes } from "./charactersActionTypes"

const initialState = {
  characterList: [],
  error: null,
  loading: false,
}

export const characterReducer = (state = initialState, action) => {
  switch (action.type) {
    case characterActionTypes.REQUEST_CHARACTER_START: {
      return {
        ...state,
        loading: true,
      }
    }
    case characterActionTypes.REQUEST_CHARACTER_FAIL: {
      return {
        ...state,
        error: action.payload,
        loading: false,
      }
    }
    case characterActionTypes.ADD_CHARACTERS: {
      return {
        ...state,
        characterList: action.payload,
        loading: false,
      }
    }
    default:
      return state
  }
}
