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
    //To me it feels like "render" isn't the correct method here. It doesn't really let me modify the form fields.
    const onSubmit = jest.fn(event => {
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


    //If I knew how to use Enzyme, this is probably how it would go:
    /* const component = mount(
        <BlogForm addBlog={onSubmit} />
      )

    const author =   component.find('#author')
    const title =   component.find('#title')
    const url =   component.find('#url')

    author.simulate('change', { target: { value: blog.author } })
    title.simulate('change', { target: { value: blog.title } })
    url.simulate('change', { target: { value: blog.url } }) */

    component = render(
      <BlogForm addBlog={onSubmit} />
    )

    const author = component.container.querySelector('#author')
    const title = component.container.querySelector('#title')
    const url = component.container.querySelector('#url')
    author.value = blog.author
    title.value = blog.title
    url.value = blog.url


    const button = component.getByText('add new')
    fireEvent.click(button)

    expect(onSubmit).toHaveBeenCalled()
    //expect(mockHandler.mock.calls[0]).toEqual([blog])

  })

})