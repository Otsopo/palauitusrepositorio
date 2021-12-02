import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import jwt from 'jwt-decode'
import BlogForm from './components/BlogForm'
import BlogDetails from './components/BlogDetails'
import Togglable from './components/Togglable'


const Notification = ({ notification }) => {
  if (notification === null) {
    return null
  }
  if (notification.includes('Error'))
    return (
      <div className="errorRed error">
        {notification}
      </div>
    )

  return (
    <div className="error">
      {notification}
    </div>
  )
}



const App = () => {
  const [blogFormVisible, setBlogFormVisible] = useState(false)
  const [blogs, setBlogs] = useState([])
  const [user, setUser] = useState(null)
  const [token, setToken] = useState(null)
  const [notification, setNewNotification] = useState(null)
  const blogFormRef = useRef()

  const createNotification = (message) => {
    setNewNotification(message)
    setTimeout(() => { setNewNotification(null) }, 5000)
  }
  const handleLogin = event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value
    loginService.login({ username, password })
      .then(response => {
        let token = response.token
        let user = { ...jwt(token), token: token }
        setToken(token)
        setUser(user)
        window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      })
      .catch(error => createNotification('Error: username or password wrong')
      )
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
    setToken(null)
  }

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs(blogs)
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON && loggedUserJSON !== null) {
      const user = JSON.parse(loggedUserJSON)
      setToken(user.token)
      setUser(user)
    }
  }, [])


  const addBlog = (event) => {
    event.preventDefault()
    let target = event.target

    const blogObject = {
      title: target.title.value,
      author: target.author.value,
      url: target.url.value,
    }
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject, token)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        createNotification(`Blog ${target.title.value} by ${target.author.value} added`)
      })
      .catch(error => {
        console.log(error.response.data)
      })
  }


  if (user === null) {

    return (
      <div>
        <Notification notification={notification} />
        <h2>Log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input type="text" id="username" name="username" />
          </div>
          <div>password
            <input type="password" id="password" name="password" />
          </div>
          <button id="login-button" type="submit">login</button>
        </form>
      </div>
    )
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <BlogForm addBlog={addBlog} />
        </Togglable>
      </div>
    )
  }

  return (
    <div>
      <Notification notification={notification} />
      <h2>blogs</h2>
      <div>{user.username} logged in</div>
      <button onClick={handleLogout}>logout</button>
      <div style={{ height: 40 + 'px' }}></div>
      <div id="blogs">
        {blogs.sort((a,b) => b.likes-a.likes).map(blog =>
          <div key={blog.id} >
            <Blog key={blog.id +'title'} blog={blog} />
            <Togglable key={blog.id + 'button'} buttonLabel="view" ref={blogFormRef}>
              <BlogDetails key={blog.id + 'details'} blog={blog} token={token} setBlogs={setBlogs} blogs={blogs} currentUser={user} />
            </Togglable>
          </div>
        )}
      </div>
      <div style={{ height: 40 + 'px' }}></div>
      {loginForm()}
    </div>
  )
}

export default App