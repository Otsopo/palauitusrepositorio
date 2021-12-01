const blogsRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require('jsonwebtoken')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({}).populate('user')
  response.json(blogs.map(blog => blog.toJSON()))
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)
  const userDetails = request.user

  console.log('User details: ',userDetails)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  if(body.title===undefined || body.url === undefined)
    response.status(400).send({ error: 'missing content' })
  else{

    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      user: user.id
    })

    const savedBlog = await blog.save()
    user.blogs = user.blogs.concat(savedBlog.id)
    await user.save()
    response.json(savedBlog.toJSON())

  }
})

blogsRouter.delete('/:id', async (request, response) => {
  const token = request.token
  const decodedToken = jwt.verify(token, process.env.SECRET)

  const userDetails = request.user
  console.log('User details: ',userDetails)

  if (!token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  let blog = await (await Blog.findById(request.params.id))

  if(blog.user.toString() === decodedToken.id.toString())
  {
    await Blog.remove(blog)
    response.status(204).end('blog removed')
  }else{
    return response.status(401).json({ error: 'blog not owned' })
  }
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body
  const blog = {
    likes:String(body.likes)
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())

})


module.exports = blogsRouter