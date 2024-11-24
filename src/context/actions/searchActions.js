export const SET_SEARCH_TERM = (searchTerm) => {
  return {
    type: 'SET_SEARCH_TERM',
    payload: searchTerm,
  }
}

export const SET_SEARCH_TERM_EMPTY = () => {
  return {
    type: 'SET_SEARCH_TERM_EMPTY',
  }
}
