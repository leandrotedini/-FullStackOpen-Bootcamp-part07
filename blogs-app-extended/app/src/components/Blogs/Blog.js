import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlogs } from '../../features/blogs/blogsSlice'
import{ LikeHeartSocialShape, LikeHeartSocial } from '../../utils/custom_icons'
import {
  Heading,
  Text,
  Stack,
  Flex,
  Avatar,
  IconButton,
  useColorModeValue,
  Spacer,
  Box
} from '@chakra-ui/react'


const Blog = ({ blog }) => {
  return (
    <>
      <BlogTitle title={blog.title}/>
      <BlogBody blog={blog}/>
    </>
  )
}

export const BlogTitle = ({ title }) => {
  return(
    <Heading
      color={useColorModeValue('gray.700', 'white')}
      fontSize={'2xl'}
      fontFamily={'body'}>
      {title}
    </Heading>
  )
}

export const BlogBody = ({ blog }) => {

  return(
    <Stack mt={6} direction={'row'} spacing={4} align={'center'}>
      <Avatar
        src={'https://avatars0.githubusercontent.com/u/1164541?v=4'}
        alt={'Author'}
      />
      <Stack direction={'column'} spacing={0} fontSize={'sm'}>
        <Text fontWeight={600}>{blog.user.username}</Text>
        <Text color={'gray.500'}>{blog.createdAt}</Text>
      </Stack>
      <Spacer />
      <Flex align='end'>
        <BlogLikes blog={blog} />
      </Flex>
    </Stack>
  )
}

export const BlogLikes = ({ blog }) => {
  const dispatch = useDispatch()

  return (
    <>
      <Text px={2}>{`${blog.likes} likes`}</Text>
      <IconButton
        icon={blog.likedByUser
          ? <LikeHeartSocial />
          : <LikeHeartSocialShape />}
        onClick={() => dispatch(likeBlogs(blog.id))}
      />
    </>
  )
}

export const BlogCard = ({ children }) => {
  const bgColor = useColorModeValue('white', 'gray.900')

  return (
    <Box
      w='full'
      bg={bgColor}
      boxShadow='2xl'
      rounded='md'
      p={6}
      overflow='hidden'>
      {children}
    </Box>
  )
}

export default Blog