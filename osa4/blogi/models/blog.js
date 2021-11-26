const mongoose = require('mongoose')

const blogSchema = mongoose.Schema({
  title: {
    type:String,
    required:true,
  },
  author: String,
  url: {
    type:String,
    required:true,
  },
  likes: Number
})

/* const personSchema = new mongoose.Schema({
    name: {
      type:String,
      required:true,
      minlength: 3,
      unique:true
    },
    number: {
      type:String,
      required:true,
      minlength: 8
    },
    id: Number,
  })
*/
//personSchema.plugin(uniqueValidator)
blogSchema.set('toJSON', {
  transform: (document, returnedObject) => {
    returnedObject.id = returnedObject._id.toString()
    if (returnedObject.likes===undefined)
      returnedObject.likes = 0
    delete returnedObject._id
    delete returnedObject.__v
  }
})

module.exports = mongoose.model('Blog', blogSchema)
