import React, { useEffect } from 'react'
import { Link as ReactRouterLink } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { fetchBlogs, selectAllBlogs } from '../../features/blogs/blogsSlice'
import { BlogTitle, BlogBody, BlogCard } from './Blog'
import {
  LinkOverlay,
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
          <BlogCard key={blog.id}>
            <LinkBox >
              <LinkOverlay as={ReactRouterLink} to={`/blogs/${blog.id}`}>
                <BlogTitle title={blog.title}/>
              </LinkOverlay>
              <BlogBody blog={blog} />
            </LinkBox>
          </BlogCard>
        )}
      </Stack>
    </Container>
  )
}

export default BlogsList