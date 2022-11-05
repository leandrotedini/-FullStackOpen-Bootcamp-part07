import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectUserLogged } from '../../features/users/userLoggedSlice'
import { useParams } from 'react-router-dom'
import { deleteBlogs, fetchBlogsComments, selectBlogById } from '../../features/blogs/blogsSlice'
import Blog from './Blog'
import CommentList from '../Comments/CommentList'
import {
  Box,
  Center,
  Text,
  Link,
  VStack,
  HStack,
  IconButton,
  useColorModeValue,
  Divider,
} from '@chakra-ui/react'
import { DeleteIcon, ExternalLinkIcon } from '@chakra-ui/icons'



const BlogDetails = () => {

  const dispatch = useDispatch()
  const id = useParams().id
  const blog = useSelector(state => selectBlogById(state, id))
  const user = useSelector(selectUserLogged)
  const bgColor = useColorModeValue('white', 'gray.900')

  useEffect(() => {
    dispatch(fetchBlogsComments(id))
  }, [])

  const deleteBlog = () => {
    if (window.confirm(`Remove ${blog.title}`)) {
      dispatch(deleteBlogs(id))
    }
  }

  return (
    <Center>
      <VStack>
        <Box
          key={blog.id}
          w={'full'}
          bg={bgColor}
          boxShadow={'2xl'}
          rounded={'md'}
          p={6}
          overflow={'hidden'}>
          <Blog blog={blog}/>
          <HStack
            align={'end'}
            verticalAlign
            justify={'space-between'}
            pt={8}>
            <Text color={'gray.500'}>
              More info: <Link href="#" isExternal>
                {blog.url} <ExternalLinkIcon mx='2px' />
              </Link>
            </Text>
            { blog.user.username === user.username
              && <IconButton
                size='sm'
                bg='red.500'
                _hover={{ bg: 'red.400' }}
                color='white'
                icon={<DeleteIcon />}
                onClick={deleteBlog} /> }
          </HStack>
          <Divider my={6} color={'gray.900'}/>
          <Box >
            <CommentList comments={blog.comments}/>
          </Box>
        </Box>
      </VStack>
    </Center>
  )
}

export default BlogDetails