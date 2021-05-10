import React from "react"
import { useEffect, useState } from "react"

export interface Character {
  name: string
  gender: string
  birth_year: string
}

export type CharacterListProps = {
  characters: Character[]
}

export const CharacterList = ({
  characters,
}: CharacterListProps): JSX.Element => {
  const [currentPage, setCurrentPage] = useState(0)
  const [currentCharacters, setCurrentCharacters] = useState<Character[]>([])
  const [isPrevDisabled, setPrevDisabled] = useState(false)
  const [isNextDisabled, setNextDisabled] = useState(false)

  const advancePage = (): void => {
    if (characters.length - 4 > currentPage * 4) {
      setCurrentPage(currentPage + 1)
    }
  }
  const returnPage = (): void => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1)
    }
  }

  useEffect((): void => {
    setCurrentPage(0)
  }, [characters])

  useEffect((): void => {
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

  useEffect((): void => {
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
          <li key={character.name + character.birth_year}>
            <div className="name-container">
              <h2>{character.name}</h2>
            </div>
            <p>{character.gender}</p>
          </li>
        ))}
      </ul>
      <div className="list-controls">
        <div className="controls">
          <button
            className={`${isPrevDisabled ? "disabled" : ""}`}
            onClick={returnPage}
          >
            Back
          </button>
          <button
            className={`${isNextDisabled ? "disabled" : ""}`}
            onClick={advancePage}
          >
            Next
          </button>
        </div>
        <div className="page-number-container">
          <p>Page {currentPage + 1}</p>
        </div>
      </div>
    </div>
  )
}
