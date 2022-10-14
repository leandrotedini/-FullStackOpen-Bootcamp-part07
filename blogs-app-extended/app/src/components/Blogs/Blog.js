import React from 'react'
import { useDispatch } from 'react-redux'
import { likeBlogs } from '../../features/blogs/blogsSlice'
import { Link as ReactRouterLink } from 'react-router-dom'
import{ LikeHeartSocialShape } from '../../utils/custom_icons'
import {
  Heading,
  Box,
  LinkOverlay,
  Text,
  Stack,
  Flex,
  Avatar,
  IconButton,
  useColorModeValue,
  Spacer
} from '@chakra-ui/react'


const Blog = ({ blog }) => {
  const dispatch = useDispatch()

  const incrementLikes = (blog) => dispatch(likeBlogs(blog))

  return (
    <div>
      <Box
        w={'full'}
        bg={useColorModeValue('white', 'gray.900')}
        boxShadow={'2xl'}
        rounded={'md'}
        p={6}
        overflow={'hidden'}
      >
        <LinkOverlay as={ReactRouterLink} to={`/blogs/${blog.id}`}>
          <Heading
            color={useColorModeValue('gray.700', 'white')}
            fontSize={'2xl'}
            fontFamily={'body'}>
            {blog.title}
          </Heading>
        </LinkOverlay>
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
            <Text>{`${blog.likes} likes`}</Text>
            <IconButton icon={<LikeHeartSocialShape />} onClick={() => incrementLikes(blog)}/>
          </Flex>
        </Stack>
      </Box>
    </div>
  )
}

export default Blog