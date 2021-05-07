import axios from "axios"

export const fetchCharacters = async (url) => {
  try {
    const response = await axios.get(url)
    const { results, next } = response.data
    return { results, next }
  } catch (err) {
    console.warn("Error", err)
  }
}

export const fetchAllCharacters = async (url, allCharacters = []) => {
  try {
    const { results, next } = await fetchCharacters(url)
    allCharacters = [...allCharacters, ...results]
    if (next !== null) {
      return fetchAllCharacters(next, allCharacters)
    }
    return allCharacters
  } catch (err) {
    console.warn(err)
  }
}
