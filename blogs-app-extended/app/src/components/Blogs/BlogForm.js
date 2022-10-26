import React, { useState, useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { createBlogs } from '../../features/blogs/blogsSlice'
import { setNotification } from '../../features/notification/notificationSlice'
import { useField } from '../../hooks/index'
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Heading,
  Box,
  FormControl,
  FormLabel,
  Input,
} from '@chakra-ui/react'

const BlogForm = ({ isOpen, onClose }) => {
  const { reset: resetTitle, ...title } = useField('text')
  const { reset: resetAuthor, ...author } = useField('text')
  const { reset: resetUrl, ...url } = useField('text')
  const [ buttonDisabled, setButtonDisabled ] = useState(true)

  useEffect(() => {
    setButtonDisabled(title.value === ''
      || author.value === ''
      || url.value === '')
  }, [title, author, url])

  const dispatch = useDispatch()

  const closeModal = () => {
    resetTitle()
    resetAuthor()
    resetUrl()
    onClose()
  }

  const handleCreateBlog = async (event) => {
    event.preventDefault()

    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }

    try {
      dispatch(createBlogs(newBlog))
      dispatch(setNotification({
        notification: 'new blog created',
        success: true
      }))

      closeModal()
    } catch (exception) {
      dispatch(setNotification(exception))
    }
  }

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <form data-test-id="blog-form" onSubmit={handleCreateBlog}>
          <ModalHeader>
            <Heading>Create New</Heading>
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Box>
              <FormControl id="title" isRequired>
                <FormLabel>Title</FormLabel>
                <Input { ...title } />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="author" isRequired>
                <FormLabel>Author</FormLabel>
                <Input { ...author } />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="url" isRequired>
                <FormLabel>URL</FormLabel>
                <Input { ...url } />
              </FormControl>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button
              bg='gray.400'
              color={'white'}
              _hover={{
                bg: 'gray.500',
              }}
              mr={3}
              onClick={closeModal}>
              Close
            </Button>
            <Button
              type="submit"
              bg='blue.400'
              color={'white'}
              _hover={{
                bg: 'blue.500',
              }}
              isDisabled={buttonDisabled}>
                Create
            </Button>
          </ModalFooter>
        </form>
      </ModalContent>
    </Modal>
  )
}

export default BlogForm