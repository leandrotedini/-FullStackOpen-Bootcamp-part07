import React, { useEffect } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBlogs, selectAllBlogs } from '../../features/blogs/blogsSlice'
import { BlogTitle, BlogBody } from './Blog'
import {
  Box,
  LinkOverlay,
  Heading,
  StackDivider,
  LinkBox,
  Stack,
  Container,
  useColorModeValue,
} from '@chakra-ui/react'

const BlogsList = () => {
  const dispatch = useDispatch()
  const blogs = useSelector(selectAllBlogs)
  const bgColor = useColorModeValue('white', 'gray.900')

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
          <Box
            key={blog.id}
            w={'full'}
            bg={bgColor}
            boxShadow={'2xl'}
            rounded={'md'}
            p={6}
            overflow={'hidden'}>
            <LinkBox >
              <LinkOverlay as={ReactRouterLink} to={`/blogs/${blog.id}`}>
                <BlogTitle title={blog.title}/>
              </LinkOverlay>
              <BlogBody blog={blog} />
            </LinkBox>
          </Box>
        )}
      </Stack>
    </Container>
  )
}

export default BlogsList