import { LOAD_CATEGORIES } from '../actions'

const initialState = {
  categories: {}
}

function categories(state = initialState, action) {  
  switch (action.type) {
    case LOAD_CATEGORIES :
      return state
    default :
      return state
  }
}

export default categories