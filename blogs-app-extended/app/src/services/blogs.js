import axios from 'axios'
import { userToken } from '../utils/login_helper'
const baseUrl = '/api/blogs/'

const getAll = () => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios.get(baseUrl, config)
  return request.then(response => response.data)
}

const create = (newBlog) => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios.post(baseUrl, newBlog, config)
  return request.then(response => response.data)
}

const update = (blog) => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios
    .put(baseUrl+blog.id, blog, config)
  return request.then(response => response.data)
}

const likeBlog = (blogId) => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios
    .put(`${baseUrl}/${blogId}/like`, { blogId }, config)
  return request.then(response => response.data)
}

const deleteBlog = (id) => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios
    .delete(baseUrl+id, config)
  return request.then(response => response.data)
}

const getAllComments = (blogId) => {
  const request = axios.get(`${baseUrl}/${blogId}/comments`)
  return request.then(response => response.data)
}

const createComment = (newComment) => {
  const config = {
    headers: { Authorization: userToken },
  }
  const request = axios.post(`${baseUrl}/${newComment.blogId}/comments`, newComment, config)
  return request.then(response => response.data)
}

export default {
  getAll,
  create,
  update,
  deleteBlog,
  getAllComments,
  likeBlog,
  createComment
}