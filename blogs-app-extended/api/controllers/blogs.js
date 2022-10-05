const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')
const tokenExtractor = require('../middleware/tokenExtractor')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({})
    .populate('user', { username: 1, name: 1 })
  response.json(blogs)
})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) response.json(blog)
  response.status(404).end()

})

blogsRouter.post('/', tokenExtractor, async (request, response) => {
  const body = request.body

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    comments: [],
    user: request.userId
  })

  await blog.save()
  const user = await User.findById(request.userId)
  if (user) {
    user.blogs.push(blog)
    await user.save()
  }
  const savedBlog = await blog.populate('user', { username: 1, name: 1 })
  response.status(201).json(savedBlog)
})

blogsRouter.delete('/:id', tokenExtractor, async (request, response) => {

  const blog = await Blog.findById(request.params.id)

  if ( blog.user.toString() === request.userId.toString() ) {
    await Blog.findByIdAndRemove(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).end()
  }

})

blogsRouter.put('/:id', tokenExtractor, async (request, response) => {

  const body = request.body
  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog)
})

blogsRouter.get('/:id/comments', async (request, response) => {
  console.log(request.params)
  const blog = await Blog.findById(request.params.id).populate('comments')
  if (blog) response.json(blog.comments)
  response.status(404).end()

})

blogsRouter.post('/:id/comments', tokenExtractor, async (request, response) => {

  const body = request.body
  const comment = new Comment({
    text: body.text,
    blog: body.blog,
    user: body.user
  })

  await comment.save()
  const updatedBlog = await Blog.findById(body.blog).populate('comments')

  updatedBlog.comments.push(comment)
  await updatedBlog.save()

  response.status(201).json(updatedBlog)
})
module.exports = blogsRouter