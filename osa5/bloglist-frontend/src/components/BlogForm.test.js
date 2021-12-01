import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import BlogForm from './BlogForm'


describe('<BlogDetails />', () => {

  test('after submitting, the callback receives the correct blog', () => {

    //doesn't work? for some reason event target is null? I don't think jest supports HTML form submissions?
    //tried debugging this for the longest time, but it seems testing my form implementation isn't the easiest job
    //followed the documentation at https://jestjs.io/docs/mock-functions
    const mockHandler = jest.fn(event => {
      event.preventDefault()
      let target = event.target

      const blogObject = {
        title: target.title.value,
        author: target.author.value,
        url: target.url.value,
      }
      return blogObject
    })

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

    component = render(
      <BlogForm addBlog={mockHandler} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    author.value = blog.author
    title.value = blog.title
    url.value = blog.url


    const button = component.getByText('add new')
    fireEvent.click(button)

    expect(mockHandler.mock.calls[0]).toEqual([blog])
  })

})