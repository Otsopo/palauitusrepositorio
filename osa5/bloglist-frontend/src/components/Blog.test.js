import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

test('renders content', () => {
  const blog = {
    title: 'Test blog',
    author: 'Test Author',
    url: 'testurl',
    likes: 0
  }

  const component = render(
    <Blog blog={blog} />
  )

  expect(component.container).toHaveTextContent(
    'Test blog'
  )

  expect(component.container).toHaveTextContent(
    'Test Author'
  )
})