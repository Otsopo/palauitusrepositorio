import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = () => {
  const request = axios.get(baseUrl)
  return request.then(response => response.data)
}

const create = (newObject,token) => {
  const request = axios.post(
    baseUrl,
    newObject,
    {
      headers: {
        'Authorization': `bearer ${token}`
      } })
  return request.then(response => response.data)
}

const putLike = (newObject,token,blogId) => {
  const request = axios.put(
    baseUrl+'/'+blogId,
    newObject,
    {
      headers: {
        'Authorization': `bearer ${token}`
      } })
  return request.then(response => response.data)
}
const removeBlog = (token,blogId) => {
  const request = axios.delete(
    baseUrl+'/'+blogId,
    {
      headers: {
        'Authorization': `bearer ${token}`
      } })
  return request.then(response => response.data)
}

export default { getAll,create,putLike,removeBlog }