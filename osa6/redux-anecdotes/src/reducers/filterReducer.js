  
   const initialState = ""
  
   export const updateFilterAction = (content) => ({
   type: 'UPDATE_FILTER',
   data: content})
 
   export const zeroFilterAction = () => ({
     type: 'ZERO_FILTER'})
   
   const filterReducer = (state = initialState, action) => {
     console.log('state now: ', state)
     console.log('action', action)
     if (action.type === 'UPDATE_FILTER') {
       let data = action.data
       return data
     }else if (action.type === "ZERO_FILTER"){
       return initialState
     }
     return state
   }
   
   export default filterReducer