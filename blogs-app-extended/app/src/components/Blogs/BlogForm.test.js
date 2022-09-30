import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { waitFor } from '@testing-library/dom'
import BlogForm from './BlogForm'
import loginUser from '../utils/test_helper'

describe('<BlogForm /> ', () => {
  beforeEach( async () => {
    await loginUser()
  })

  test('updates parent state and calls onSubmit', async () => {

    const createBlog = jest.fn()

    const component = render(
      <BlogForm addBlog={createBlog} />
    )

    const inputTitle = component.getByLabelText('Title', { exact: false })
    const inputAuthor = component.getByLabelText('Author', { exact: false })
    const inputURL = component.getByLabelText('URL', { exact: false })

    const form = component.container.querySelector('form')

    fireEvent.change(inputTitle, {
      target: { value: 'Test title' }
    })
    fireEvent.change(inputAuthor, {
      target: { value: 'Test author' }
    })
    fireEvent.change(inputURL, {
      target: { value: 'www.testpage.com' }
    })

    console.log(createBlog.mock.calls)

    fireEvent.submit(form)
    await waitFor(() => expect(createBlog.mock.calls).toHaveLength(1))
  })
})