import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUsers, fetchUsers } from '../../features/users/usersSlice'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  console.log(users)

  if (!users.length) return <h4>No results</h4>

  return <>
    <h2>User</h2>
    <div>
      {}
      <table>
        <thead>
          <tr>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.username}>
              <td>{user.username}</td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>

      </table>
    </div>
  </>
}

export default UserList