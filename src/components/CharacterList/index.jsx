import { useEffect, useState } from "react"

export const CharacterList = ({ characters }) => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentCharacters, setCurrentCharacters] = useState([])
  const [isPrevDisabled, setPrevDisabled] = useState(false)
  const [isNextDisabled, setNextDisabled] = useState(false)

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
    setCurrentPage(0)
  }, [characters])

  useEffect(() => {
    if (currentPage === 0) {
      setPrevDisabled(true)
    } else {
      setPrevDisabled(false)
    }
    if (currentPage + 1 === Math.ceil(characters.length / 4)) {
      setNextDisabled(true)
    } else {
      setNextDisabled(false)
    }
  }, [currentPage, characters])

  useEffect(() => {
    setCurrentCharacters(
      characters.length > 4
        ? characters.slice(currentPage * 4, currentPage * 4 + 4)
        : characters
    )
  }, [characters, currentPage])

  return (
    <div className="character-list">
      <ul>
        {currentCharacters.map((character) => (
          <li key={character.name + character.birthyear}>
            <div className="name-container">
              <h2>{character.name}</h2>
            </div>
            <p>{character.gender}</p>
          </li>
        ))}
      </ul>
      <div className="list-controls">
        <div className="controls">
          <span
            className={`${isPrevDisabled && "disabled"}`}
            onClick={returnPage}
          >
            Back
          </span>
          <span
            className={`${isNextDisabled && "disabled"}`}
            onClick={advancePage}
          >
            Next
          </span>
        </div>
        <div className="page-number-container">
          <p>Page {currentPage + 1}</p>
        </div>
      </div>
    </div>
  )
}
