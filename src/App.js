import { useState, useEffect } from "react"

import { CharacterList } from "./components/CharacterList"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [characterList, setCharacterList] = useState([])
  const [filteredCharacters, setFilteredCharacters] = useState([])
  const [filterValue, setFilterValue] = useState("")

  const fetchCharacters = async (url) => {
    try {
      const response = await fetch(url)
      const { results, next } = await response.json()
      return { results, next }
    } catch (err) {
      console.warn("Error", err)
    }
  }
  const fetchAllCharacters = async (url, allCharacters = []) => {
    setIsLoading(true)
    try {
      const { results, next } = await fetchCharacters(url)
      allCharacters = [...allCharacters, ...results]
      if (next !== null) {
        return fetchAllCharacters(next, allCharacters)
      }
      setCharacterList(allCharacters)
      setIsLoading(false)
    } catch (err) {
      console.warn(err)
      setIsLoading(false)
    }
  }

  const handleSearchInput = (e) => {
    setFilterValue(e.target.value)
  }

  useEffect(() => {
    const filteredArray = characterList.filter((character) =>
      character.name.toLowerCase().includes(filterValue.toLowerCase())
    )
    setFilteredCharacters(filteredArray)
  }, [filterValue, characterList])

  useEffect(() => {
    fetchAllCharacters("https://swapi.dev/api/people/")
  }, [])

  return (
    <div className="App">
      {isLoading && <h1>Loading...</h1>}
      {!isLoading && characterList.length > 0 && (
        <>
          <input type="text" onChange={handleSearchInput} />
          <CharacterList characters={filteredCharacters} />
        </>
      )}
    </div>
  )
}

export default App
