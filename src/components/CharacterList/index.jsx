import { useEffect, useState } from "react"

export const CharacterList = ({ characters }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentCharacters, setCurrentCharacters] = useState([])

  const advancePage = () => {
    if (characters.length - 4 > currentPage * 4) {
      setCurrentPage(currentPage + 1)
    }
  }
  const returnPage = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect(() => {
    setCurrentCharacters(
      characters.length > 4
        ? characters.slice(currentPage * 4, currentPage * 4 + 4)
        : characters
    )
  }, [characters, currentPage])

  return (
    <>
      <ul>
        {currentCharacters.map((character) => (
          <li key={character.name + character.birthyear}>{character.name}</li>
        ))}
      </ul>
      <div>
        <span onClick={returnPage}>Back</span>
        <span onClick={advancePage}>Next</span>
      </div>
    </>
  )
}
