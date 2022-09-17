import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('Blog', () => {

  const validUser = {
    username: '@Test',
    name: 'Test Name',
    id: '62e72a6b5c7e15ac4063b081'
  }

  const invalidUser = {
    username: '@Test2',
    name: 'Test Name 2',
    id: '999999999999'
  }

  const blog = {
    title: 'Test title',
    author: 'Test Author',
    url: 'Test URL',
    likes: 4,
    user: {
      username: '@Test',
      name: 'Test Name',
      id: '62e72a6b5c7e15ac4063b081'
    },
    id: '62f462c0c449384f0074505f'
  }



  test('renders content with valid user', () => {

    const component = render(
      <Blog blog={blog} user={validUser}/>
    )

    expect(component.container).toHaveTextContent(
      'Test title'
    )

    const title = component.getByText('Test title')
    expect(title).toBeDefined()
    expect(title).toBeVisible()

    const author = component.getByText('Author: Test Author')
    expect(author).not.toBeVisible()

    const removeButton = component.getByText('remove')
    expect(removeButton).toBeDefined()
  })

  test('renders content with invalid user', () => {

    const component = render(
      <Blog blog={blog} user={invalidUser}/>
    )

    const removeButton = component.queryByText('remove')
    expect(removeButton).toBeNull()
  })

  test('renders url and likes after click view button', () => {

    const component = render(
      <Blog blog={blog} user={validUser}/>
    )

    const author = component.getByText('Author', { selector: 'span', exact: false })
    const likes = component.getByText('Likes', { selector: 'span', exact: false })
    expect(author).not.toBeVisible()
    expect(likes).not.toBeVisible()

    const button = component.getByText('view')
    fireEvent.click(button)

    expect(author).toBeVisible()
    expect(likes).toBeVisible()
  })

  test('likes button called', () => {

    //i don't know how resolve this exercise.
    //The information that i've found on internet says that i can't bind the
    //'mock Function' with my internal function 'incrementLikes' in my component Blog.
    //https://stackoverflow.com/questions/69044787/react-testing-library-mocking-a-function

  })
})