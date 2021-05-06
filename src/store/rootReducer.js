import { combineReducers } from "redux"
import { characterReducer } from "./characters/characterReducer"

export const rootReducer = combineReducers({
  characters: characterReducer,
})
