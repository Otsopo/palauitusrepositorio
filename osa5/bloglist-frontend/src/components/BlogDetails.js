import React from 'react'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'


//TODO: Merge with Blog :D
//IDK why I created a separate component for this???

const BlogDetails = ({ blog, token, setBlogs, blogs, currentUser }) => {
  const { author, title, likes, url, user, id } = blog

  const handleLike = () => {
    let newBlog = {
      user: user.id,
      likes: likes + 1,
      author,
      title,
      url
    }
    blogService.putLike(newBlog, token, id)
      .then(response => {
        let newBlogs = blogs.filter(blog => blog.id !== response.id)
        newBlogs.push(response)
        setBlogs(newBlogs)
      })
  }

  const handleRemove = () => {
    if (window.confirm(`Delete ${title} by ${author}?`))
      blogService.removeBlog(token,id)
        .then(response => {
          let newBlogs = blogs.filter(blog => id !== blog.id)
          setBlogs(newBlogs)
        })
  }

  let response = [(
    <div key={id + 'detailBlock'}>
      <p>{url}</p>
      <p>likes {likes}<button onClick={handleLike} >like</button></p>
      <p>{author}</p>
      <p>{user.username}</p>
    </div>
  )]
  if (user.id === currentUser.id)
    response.push(
      (<div key={id+'remove'}>
        <button onClick={handleRemove} >remove</button>
      </div>))
  return response
}

BlogDetails.propTypes = {
  blog: PropTypes.object.isRequired,
  token: PropTypes.string.isRequired,
  setBlogs: PropTypes.func.isRequired,
  blogs: PropTypes.array.isRequired,
  currentUser: PropTypes.object.isRequired
}

export default BlogDetails