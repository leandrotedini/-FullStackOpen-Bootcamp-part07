import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { selectUsers, fetchUsers } from '../../features/users/usersSlice'
import { Link as ReactRouterLink } from 'react-router-dom'
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
  Link
} from '@chakra-ui/react'

const UserList = () => {
  const dispatch = useDispatch()
  const users = useSelector(selectUsers)

  useEffect(() => {
    dispatch(fetchUsers())
  }, [])

  return (
    <TableContainer w='40%'>
      <Table variant='simple'>
        <TableCaption>Blogs created by User</TableCaption>
        <Thead>
          <Tr>
            <Th>User</Th>
            <Th isNumeric>Blogs</Th>
          </Tr>
        </Thead>
        <Tbody>
          {users.map(user =>
            <Tr key={user.username}>
              <Td>
                <Link as={ReactRouterLink} to={`/users/${user.id}`}>
                  {user.username}
                </Link>
              </Td>
              <Td isNumeric>{user.blogs.length}</Td>
            </Tr>
          )}
        </Tbody>
      </Table>
    </TableContainer>
  )
}

export default UserList