import React from 'react'
const Notification = ({ message, success }) => {

  const notificationStyle = {
    color: success ? 'green': 'red',
    fontStyle: 'italic',
    fontSize: 16,
    background: 'lightgrey',
    borderSstyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10
  }

  if (message === null) {
    return null
  }

  return (
    <div style={notificationStyle}>
      {message}
    </div>
  )
}

export default Notification