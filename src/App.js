import { useState, useEffect } from "react"
import { connect } from "react-redux"

import { CharacterList } from "./components/CharacterList"
import { Spinner } from "./components/Spinner"
import { Message } from "./components/Message"
import { addCharacterList } from "./store/characters/characterActions"

function App({
  characters,
  addCharacterList,
  charactersLoading,
  charactersError,
}) {
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [filterValue, setFilterValue] = useState("")

  const handleSearchInput = (e) => {
    setFilterValue(e.target.value)
  }

  useEffect(() => {
    if (characters) {
      const filteredArray = characters.filter((character) =>
        character.name.toLowerCase().includes(filterValue.toLowerCase())
      )
      setFilteredCharacters(filteredArray)
    }
  }, [filterValue, characters])

  useEffect(() => {
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

const mapStateToProps = (store) => ({
  characters: store.characters.characterList,
  charactersLoading: store.characters.loading,
  charactersError: store.characters.error,
})

const mapDispatchToProps = (dispatch) => ({
  addCharacterList: (url) => dispatch(addCharacterList(url)),
})

export default connect(mapStateToProps, mapDispatchToProps)(App)
