import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUsers, fetchUsers } from '../../features/users/usersSlice'
import { Link } from 'react-router-dom'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

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
              <td>
                <Link to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </td>
              <td>{user.blogs.length}</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  </>
}

export default UserList