export const SET_PROJECTS = (projects) => {
  return {
    type: 'SET_PROJECTS',
    payload: projects,
  }
}

export const SET_PROJECTS_NULL = () => {
  return {
    type: 'SET_PROJECTS_NULL',
  }
}
