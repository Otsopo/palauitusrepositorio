  
   const initialState = ""
  
  export const createNotificationAction = (content) => ({
  type: 'NEW_NOTIFICATION',
  data: content})

  export const zeroNotificationAction = () => ({
    type: 'ZERO_NOTIFICATIONS'})
  
  const notificationReducer = (state = initialState, action) => {
    console.log('state now: ', state)
    console.log('action', action)
    if (action.type === 'NEW_NOTIFICATION') {
      let data = action.data
      return data
    }else if (action.type === "ZERO_NOTIFICATIONS"){
      return initialState
    }
    return state
  }
  
  export default notificationReducer