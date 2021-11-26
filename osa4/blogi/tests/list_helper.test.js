const listHelper = require('../utils/list_helper')

const bigBlogList = [
  {
    _id: '5a422a851b54a676234d17f7',
    title: 'React patterns',
    author: 'Michael Chan',
    url: 'https://reactpatterns.com/',
    likes: 7,
    __v: 0
  },
  {
    _id: '5a422aa71b54a676234d17f8',
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    __v: 0
  },
  {
    _id: '5a422b3a1b54a676234d17f9',
    title: 'Canonical string reduction',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
    likes: 12,
    __v: 0
  },
  {
    _id: '5a422b891b54a676234d17fa',
    title: 'First class tests',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
    likes: 10,
    __v: 0
  },
  {
    _id: '5a422ba71b54a676234d17fb',
    title: 'TDD harms architecture',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
    likes: 0,
    __v: 0
  },
  {
    _id: '5a422bc61b54a676234d17fc',
    title: 'Type wars',
    author: 'Robert C. Martin',
    url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
    likes: 2,
    __v: 0
  }
]

test('dummy returns one', () => {
  const blogs = []

  const result = listHelper.dummy(blogs)
  expect(result).toBe(1)
})

describe('total likes', () => {
  const listWithOneBlog = [
    {
      _id: '5a422aa71b54a676234d17f8',
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      __v: 0
    }
  ]




  test('when list has only one blog equals the likes of that', () => {
    const result = listHelper.totalLikes(listWithOneBlog)
    expect(result).toBe(5)
  })
  test('of empty list is zero', () => {
    const result = listHelper.totalLikes([])
    expect(result).toBe(0)
  })
  test('of bigger list is calculated right', () => {
    const result = listHelper.totalLikes(bigBlogList)
    expect(result).toBe(36)
  })
})

describe('favorite blog', () => {

  test('when list is big', () => {
    const result = listHelper.favoriteBlog(bigBlogList)
    expect(result).toEqual(  {
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })

  test('when two has same amount of likes is either one', () => {
    const result = listHelper.favoriteBlog([...bigBlogList,{
      _id: '23422b3a1b54a676234d1723',
      title: 'Extra blog',
      author: 'Extra author',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    }])

    expect(result).toEqual(  {
      _id: '23422b3a1b54a676234d1723',
      title: 'Extra blog',
      author: 'Extra author',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    })
  })

  test('when list is empty is {}', () => {
    const result = listHelper.favoriteBlog([])
    expect(result).toEqual({})
  })

})


describe('most blogs', () => {

  test('when list is big', () => {
    const result = listHelper.mostBlogs(bigBlogList)
    expect(result).toEqual({
      author:'Robert C. Martin',
      blogs:3
    })
  })

  test('when two has same amount of blogs', () => {
    const result = listHelper.mostBlogs([...bigBlogList,{
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 12,
      __v: 0
    },])

    expect(result).toEqual(  {
      author:'Edsger W. Dijkstra',
      blogs:3
    },)
  })

  test('when list is empty', () => {
    const result = listHelper.mostBlogs([])
    expect(result).toEqual({})
  })

})


describe('most likes', () => {

  test('when list is big', () => {
    const result = listHelper.mostLikes(bigBlogList)
    expect(result).toEqual({
      author:'Edsger W. Dijkstra',
      likes:17
    })
  })

  test('when two has same amount of blogs', () => {
    const result = listHelper.mostLikes([...bigBlogList,{
      _id: '5a422b3a1b54a676234d17f9',
      title: 'Canonical string reduction',
      author: 'Robert C. Martin',
      url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
      likes: 5,
      __v: 0
    },])

    expect(result).toEqual(  {
      author:'Robert C. Martin',
      likes:17
    },)
  })

  test('when list is empty', () => {
    const result = listHelper.mostLikes([])
    expect(result).toEqual({})
  })

})