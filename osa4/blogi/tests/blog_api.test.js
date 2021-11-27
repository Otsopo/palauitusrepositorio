const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')
const helper = require('./test_helper')


beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs
  )})

describe('GET tests', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('there are six blogs', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(6)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')

    expect(response.body).toHaveLength(helper.initialBlogs.length)
  })

  test('blogs have id field', async () => {
    const response = await api.get('/api/blogs')
    let blogsWith_id = response.body.filter((r) => r.id !== undefined)

    expect(blogsWith_id.length).toBeGreaterThan(0)
  })
})

describe('POST tests', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Canonical string reduction 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 2,
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length + 1)
    const titles = blogsAtEnd.map(n => n.title)
    expect(titles).toContain(
      'Canonical string reduction 2'
    )
  })

  test('a blog with no like field is set to 0 likes', async () => {
    const newBlog = {
      title: 'Canonical string reduction 2',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.getBlogsByTitle(newBlog.title)
    expect(blogsAtEnd[0].likes).toBe(0)
  })

  test('blog without title or url is not added', async () => {
    let newBlog = {
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    newBlog = {
      title: 'Canonical string reduction 2',
      author: 'Edsger W. Dijkstra',
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd).toHaveLength(helper.initialBlogs.length)
  })
})

describe('DELETE tests', () => {
  test('succeeds with status code 204 if id is valid', async () => {
    const blogs = await helper.blogsInDb()
    const blog = blogs[0]

    await api
      .delete(`/api/blogs/${blog.id}`)
      .expect(204)

    const finalBlogs = await helper.blogsInDb()

    expect(finalBlogs).toHaveLength(
      helper.initialBlogs.length - 1
    )
  })
})


describe('PUT tests', () => {
  test('succeeds when updating likes and the id is valid', async () => {

    const response = await api.get('/api/blogs')
    const currentBlog = response.body[0]

    let newBlog = {
      ...currentBlog,
      likes:100
    }
    await api
      .put(`/api/blogs/${newBlog.id}`)
      .send(newBlog)
      .expect(200)

    const updatedBlog = await helper.getBlogsById(newBlog.id)

    expect(updatedBlog[0].likes).toBe(newBlog.likes)
  })
})

afterAll(() => {
  mongoose.connection.close()
})