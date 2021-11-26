const dummy = (blogs) => {
  return 1
}

const totalLikes = (blogs) =>
  blogs.reduce((total,blog) => total+blog.likes,0)

const favoriteBlog = (blogs) =>
  blogs.reduce((max, blog) => max.likes > blog.likes ? max : blog,{})

const mostBlogs = (blogs) => {

  if(blogs.length===0)
    return {}

  let authors = []
  blogs.map((blog) => {
    authors.push(blog.author)
  })

  const bestAuthor = ((arr) => {
    return arr.sort((a,b) =>
      arr.filter(v => v===a).length
        - arr.filter(v => v===b).length
    ).pop()
  })(authors)

  return {
    author:bestAuthor,
    blogs:authors.reduce((max, author) => author === bestAuthor? max+1 : max,1)
  }
}

const mostLikes = (blogs) => {
  if(blogs.length===0)
    return {}

  let authorsByLikes =[]

  blogs.map((blog) => {
    let authorObj = {
      author:blog.author,
      likes:0
    }
    if(!authorsByLikes.includes(authorObj)){
      authorsByLikes.push(authorObj)
    }
  })

  authorsByLikes.forEach(
    (authorObj) => blogs.forEach((
      blog) => {
      if (blog.author===authorObj.author)
        authorObj.likes+=blog.likes
    }
    ))

  return authorsByLikes.reduce((max, authorObj) => max.likes > authorObj.likes ? max : authorObj,{})
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}