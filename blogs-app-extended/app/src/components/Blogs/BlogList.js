import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBlogs, selectAllBlogs } from '../../features/blogs/blogsSlice'
import Blog from './Blog'
import {
  Heading,
  StackDivider,
  LinkBox,
  Stack,
  Container,
} from '@chakra-ui/react'

const BlogsList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectAllBlogs)

  useEffect(() => {
    dispatch(fetchBlogs())
  }, [])

  return (
    <Container>
      <Heading as='h2' size='2xl' my={4}>
        Blogs
      </Heading>
      <Stack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={4}
        align='stretch'
        direction={'column'}
      >
        {blogs.map(blog =>
          <LinkBox key={blog.id}>
            <Blog blog={blog} />
          </LinkBox>
        )}
      </Stack>
    </Container>
  )
}

export default BlogsList