import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import Togglable from './Togglable'
import BlogDetails from './BlogDetails'


describe('<BlogForm />', () => {
  const mockHandler = jest.fn()

  let component
  const blog = {
    title: 'Test blog',
    author: 'Test Author',
    url: 'testurl',
    likes: 0,
    user:{
      username:'mockname',
      id:'123'
    }
  }
  const token = 'mocktoken'
  const blogs = []
  const user = {
    username:'mockname',
    id:'123'
  }

  beforeEach(() => {
    component = render(
      <Togglable buttonLabel="view" >
        <BlogDetails class="testBlogDetails" blog={blog} token={token} setBlogs={() => null} blogs={blogs} currentUser={user} likeHandler={mockHandler} />
      </Togglable>
    )
  })


  //Don't know why this fails, I followed the togglable testing guide
  test('at start the children are not displayed', () => {
    const div = component.container.querySelector('.togglableContent')
    expect(div).toHaveStyle('display: none')
  })

  test('after clicking the button, children are displayed', () => {
    const button = component.getByText('view')
    fireEvent.click(button)
    expect(component.container).toHaveTextContent(
      'testurl'
    )

    expect(component.container).toHaveTextContent(
      '0'
    )
  })

  //5.15: How do I actually test this? The component doesnt get the handler as a prop?
  //Like logic is handled internally in BlogDetails.
  //Edit: I added an optional external handler for it
  test('after clicking the like button, likes have increased', () => {
    const button = component.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
  })

})