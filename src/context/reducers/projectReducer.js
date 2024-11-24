const projectsReducer = (state = [], action) => {
  switch (action.type) {
    case 'SET_PROJECTS':
      return {
        ...state,
        projects: action.payload,
      }
    case 'SET_PROJECTS_NULL':
      return {
        ...state,
        projects: null,
      }
    default:
      return state
  }
}

export default projectsReducer
