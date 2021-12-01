import React from 'react'
const Blog = ({ blog }) => (
  <div className="blogtitle">
    {blog.title}, {blog.author}
  </div>
)

export default Blog