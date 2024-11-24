const searchReducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_SEARCH_TERM':
      return {
        ...state,
        searchterm: action.payload,
      }
    case 'SET_SEARCH_TERM_EMPTY':
      return {
        ...state,
        projects: '',
      }
    default:
      return state
  }
}

export default searchReducer
