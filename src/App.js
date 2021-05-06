import { useState, useEffect } from "react"

function App() {
  const [isLoading, setIsLoading] = useState(false)
  const [characterList, setCharacterList] = useState([])

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

  useEffect(() => {
    fetchAllCharacters("https://swapi.dev/ap/people/")
  }, [])

  return (
    <div className="App">
      {isLoading && <h1>Loading...</h1>}
      {characterList.length > 1 && (
        <ul>
          {characterList.map((character) => (
            <li key={character.name + character.birthyear}>{character.name}</li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default App
