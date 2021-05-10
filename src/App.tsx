import React, { useState, useEffect } from "react"
import { connect } from "react-redux"

import { CharacterList } from "./components/CharacterList"
import { Spinner } from "./components/Spinner"
import { Message } from "./components/Message"
import { addCharacterList } from "./store/characters/characterActions"

import type { Character } from "./components/CharacterList/"

interface AppProps {
  characters: Character[]
  addCharacterList: (url: string) => {}
  charactersLoading: boolean
  charactersError: Error
}

function App({
  characters,
  addCharacterList,
  charactersLoading,
  charactersError,
}: AppProps): JSX.Element {
  const [filteredCharacters, setFilteredCharacters] = useState<Character[]>([])
  const [filterValue, setFilterValue] = useState<string>("")

  const handleSearchInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFilterValue(e.target.value)
  }

  useEffect((): void => {
    if (characters) {
      const filteredArray = characters.filter((character) =>
        character.name.toLowerCase().includes(filterValue.toLowerCase())
      )
      setFilteredCharacters(filteredArray)
    }
  }, [filterValue, characters])

  useEffect((): void => {
    addCharacterList("https://swapi.dev/api/people/")
  }, [addCharacterList])

  return (
    <div className="App">
      <input
        className="search-input"
        type="text"
        onChange={handleSearchInput}
        placeholder="Search people..."
      />
      {charactersLoading && <Spinner />}
      {!charactersLoading && characters && (
        <CharacterList characters={filteredCharacters} />
      )}
      {!charactersLoading && charactersError && (
        <Message messageText=" I felt a great disturbance in the Force, try again later..." />
      )}
    </div>
  )
}

interface CharactersStore {
  characters: Character[]
  charactersLoading: boolean
  charactersError: Error
}

interface Store {
  characters: {
    characterList: Character[]
    loading: boolean
    error: Error
  }
}

const mapStateToProps = (store: Store): CharactersStore => ({
  characters: store.characters.characterList,
  charactersLoading: store.characters.loading,
  charactersError: store.characters.error,
})

const mapDispatchToProps = (dispatch: any) => ({
  addCharacterList: (url: string) => dispatch(addCharacterList(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
