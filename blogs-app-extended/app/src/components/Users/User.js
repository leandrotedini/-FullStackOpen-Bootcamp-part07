import React from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { selectUserById } from '../../features/users/usersSlice'
import { selectBlogByUserId } from '../../features/blogs/blogsSlice'
import { BlogTitle, BlogLikes, BlogCard } from '../Blogs/Blog'
import {
  Heading,
  Text,
  Stack,
  useColorModeValue,
  Spacer,
  LinkBox,
  LinkOverlay
} from '@chakra-ui/react'



const User = () => {
  const id = useParams().id
  const user = useSelector(state => selectUserById(state, id))
  const blogs = useSelector(state => selectBlogByUserId(state, user.id))

  console.log(blogs)

  return(
    <Stack>
      <Heading
        color={useColorModeValue('gray.700', 'white')}
        fontSize={'2xl'}
        fontFamily={'body'}>
        {user.username}
      </Heading>

      {blogs.map(blog =>
        <BlogCard key={blog.id}>
          <LinkBox>
            <LinkOverlay as={ReactRouterLink} to={`/blogs/${blog.id}`}>
              <BlogTitle title={blog.title}/>
            </LinkOverlay>
            <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
              <Text color={'gray.500'}>{blog.createdAt}</Text>
              <Spacer />
              <BlogLikes blog={blog} />
            </Stack>
          </LinkBox>
        </BlogCard>
      )}
    </Stack>


  )
}

export default User