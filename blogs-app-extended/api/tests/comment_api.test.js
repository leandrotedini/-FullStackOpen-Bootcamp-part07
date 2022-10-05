const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const User = require('../models/user')
// const Comment = require('../models/comment')

const {
  getValidToken,
  // blogsInDb,
  initializeDB } = require('../utils/test_helper')

beforeEach(async () => {
  await initializeDB()
})

describe('Create Comment', () => {
  test('a valid blog can be added', async () => {
    const blog = await Blog.findOne()
    const initialComments = blog.comments
    const user = await User.findOne()

    const newComment = {
      text: 'This is a comment test',
      blog: blog.id,
      user: user.id
    }

    const validUserToken = await getValidToken()

    const response = await api
      .post(`/api/blogs/${blog.id}/comments`)
      .set('Authorization', validUserToken)
      .send(newComment)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const blogCommented = response.body
    const contents = blogCommented.comments.map(c => c.text)

    expect(blogCommented.comments).toHaveLength(initialComments.length + 1)
    expect(contents).toContain('This is a comment test')
  })
})

afterAll(() => {
  mongoose.connection.close()
})