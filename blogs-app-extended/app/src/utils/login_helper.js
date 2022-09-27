const USER_LOCAL_VARIABLE_NAME = 'loggedBlogListappUser'

export let userToken = ''

export const setUserLocalStorage = (user) => {
  window.localStorage.setItem(
    USER_LOCAL_VARIABLE_NAME, JSON.stringify(user)
  )
  userToken = `bearer ${user.token}`
}

export const getUserLocalStorage = () => {
  const loggedUserJSON = window.localStorage.getItem(USER_LOCAL_VARIABLE_NAME)
  return loggedUserJSON
    ? JSON.parse(loggedUserJSON)
    : null
}

export const removeUserLocalStorage = () => {
  window.localStorage.removeItem(USER_LOCAL_VARIABLE_NAME)
  userToken = ''
}