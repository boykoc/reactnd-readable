import { combineReducers } from 'redux'
import { SELECT_CATEGORY, REQUEST_POSTS, RECEIVE_POSTS } from '../actions'
import { SELECT_POST, REQUEST_POST, RECEIVE_POST } from '../actions'
import { REQUEST_COMMENTS, RECEIVE_COMMENTS } from '../actions'

function selectedCategory(state = 'all', action) {
  switch (action.type) {
    case SELECT_CATEGORY:
      return action.category
    default:
      return state
  }
}

function posts( state = { isFetching: false, items: []}, action) {
  switch (action.type) {
    case REQUEST_POSTS:
      return {...state, 
      	isFetching: true
      }
    case RECEIVE_POSTS:
      return {...state, 
        isFetching: false,
        items: action.posts,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}

function postsByCategory(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POSTS:
    case REQUEST_POSTS:
      return {...state, 
        [action.category]: posts(state[action.category], action)
      }
    default: 
      return state
  }
}





function selectedPost(state = {}, action) {
  switch (action.type) {
    case SELECT_POST:
      return action.post
    default:
      return state
  }
}

function post( state = { isFetching: false}, action) {
  switch (action.type) {
    case REQUEST_POST:
      return {...state, 
      	isFetching: true,
        post: {}
      }
    case RECEIVE_POST:
      return {...state, 
        isFetching: false,
        post: action.post,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}

function postDetails(state = {}, action) {
  switch (action.type) {
    case RECEIVE_POST:
    case REQUEST_POST:
      return {...state, 
        post: post(action.post, action)
      }
    default: 
      return state
  }
}





function comments( state = { isFetching: false, comments: []}, action) {
  switch (action.type) {
    case REQUEST_COMMENTS:
      return {...state, 
      	isFetching: true
      }
    case RECEIVE_COMMENTS:
      return {...state, 
        isFetching: false,
        comments: action.comments,
        lastUpdated: action.recievedAt
      }
    default:
      return state
  }
}

function commentsByPost(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENTS:
    case REQUEST_COMMENTS:
      return {...state, 
        [action.post]: comments(state[action.post], action)
      }
    default: 
      return state
  }
}





const rootReducer = combineReducers({
  postsByCategory,
  selectedCategory, 
  postDetails,
  selectedPost, 
  commentsByPost
})

export default rootReducer