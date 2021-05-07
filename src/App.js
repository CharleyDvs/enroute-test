import { useState, useEffect } from "react"
import { connect } from "react-redux"

import { CharacterList } from "./components/CharacterList"
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
    const filteredArray = characters.filter((character) =>
      character.name.toLowerCase().includes(filterValue.toLowerCase())
    )

    setFilteredCharacters(filteredArray)
  }, [filterValue, characters])

  useEffect(() => {
    addCharacterList("https://swapi.dev/api/people/")
  }, [])

  return (
    <div className="App">
      <input
        className="search-input"
        type="text"
        onChange={handleSearchInput}
        placeholder="Search people"
      />
      {charactersLoading && <h1>Loading...</h1>}
      {!charactersLoading && characters.length > 0 && (
        <CharacterList characters={filteredCharacters} />
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
