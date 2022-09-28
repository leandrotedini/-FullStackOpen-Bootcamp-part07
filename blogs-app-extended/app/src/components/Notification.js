import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { cleanNotification, selectNotification } from '../features/notification/notificationSlice'


const Notification = () => {

  const dispatch = useDispatch()
  const { notification, success } = useSelector(selectNotification)

  useEffect(() => {
    if (notification !== ''){
      setTimeout(() => {
        dispatch(cleanNotification())
      }, 5000)
    }
  }, [notification])

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

  if (notification === '') return null

  return (
    <div style={notificationStyle}>
      {notification}
    </div>
  )
}

export default Notification