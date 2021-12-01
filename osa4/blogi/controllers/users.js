const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('notes')
  response.json(users.map(u => u.toJSON()))
})

usersRouter.post('/', async (request, response) => {
  const body = request.body
  if(body.password.length < 3){
    response.status(400)
    response.end()
  }
  else{
    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username.toLowerCase(),
      name: body.name.toLowerCase(),
      passwordHash,
    })

    //For some reason the unique username error isn't caught by the express-async-errors?
    try {
      const savedUser = await user.save()
      response.json(savedUser)
    } catch (error) {
      response.status(400)
      response.json(error)
    }
  }
})

module.exports = usersRouter