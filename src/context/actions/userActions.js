export const SET_USER = (user) => {
  return {
    type: 'SET_USER',
    payload: user,
  }
}

export const SET_USER_NULL = () => {
  return {
    type: 'SET_USER_NULL',
  }
}
