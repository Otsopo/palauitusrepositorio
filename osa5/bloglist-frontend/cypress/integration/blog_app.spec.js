import { func } from 'prop-types'

const createBlog = (title, author) => {
  cy.contains('new blog').click()
  title ? cy.get('#title').type(title):null
  cy.get('#author').type(author)
  cy.get('#url').type('test')
  cy.contains('add new').click()

}

describe('Blog app', function() {

  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'otso',
      username: 'otso',
      password: 'salainen'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user)
    cy.visit('http://localhost:3000')

  })

  it('front page can be opened',  function() {
    cy.contains('Log in to application')
  })
  describe('Login',function(){
    it('user can log in', function() {
      cy.get('#username').type('otso')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
      cy.contains('otso logged in')  })

    it('user cant log in with wrong info', function() {
      cy.get('#username').type('otso')
      cy.get('#password').type('salainen2')
      cy.get('#login-button').click()
      cy.contains('username or password wrong')})
  })


  describe('when logged in', function() {
    beforeEach(function() {
      cy.get('#username').type('otso')
      cy.get('#password').type('salainen')
      cy.get('#login-button').click()
    })

    it('a new blog can be created', function() {
      createBlog('test','test')
      cy.contains('test, test')
    })

    it('a blog can be liked', function() {
      createBlog('test','test')
      cy.contains('view').click()
      cy.contains('like').click()
      cy.contains('1')
    })

    it('a blog can be removed', function() {
      createBlog('test','test')
      cy.contains('view').click()
      cy.wait(500)
      cy.contains('remove').click()
      cy.contains('test, test').not()
      cy.wait(500)

    })

    it('blogs are ordered by likes', function() {
      createBlog('test','test')
      cy.contains('test, test').parent().as('firstBlog')
      cy.get('@firstBlog').contains('view').click()
      cy.get('@firstBlog').contains('like').click()

      createBlog('','2')
      cy.contains('test, test2').parent().as('secondBlog')
      cy.get('@secondBlog').contains('view').click()
      cy.get('@secondBlog').contains('like').click()
      cy.wait(500)
      cy.get('@secondBlog').contains('like').click()
      cy.wait(500)
      cy.get('@secondBlog').contains('like').click()
      cy.get('#blogs').get('.blog-details').first().contains('3')
    })



  })
})