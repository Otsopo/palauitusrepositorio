import React from 'react'

const BlogForm = ({ addBlog }) => {

  //Partially related to 5.6:
  //I didn't like the way the guide handles form state, I think it's unnecessary.
  //As long as the state isn't related to what's shown on screen (like the search functionality),
  //I don't think it should be tracked? Sure it's the React way but I'd like to know if there's any
  //other reason to do it.

  return (
    <form onSubmit={addBlog}>
      <div>
          title
        <input id="title" type="text" name="title" />
      </div>
      <div>
          author
        <input id="author" type="text" name="author" />
      </div>
      <div>
          url
        <input id="url" type="text" name="url" />
      </div>
      <button type="submit">add new</button>
    </form>
  )
}


export default BlogForm