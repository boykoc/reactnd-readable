import { combineReducers } from 'redux'
import { SELECT_CATEGORY, REQUEST_POSTS, RECEIVE_POSTS } from '../actions'
import { SELECT_POST, REQUEST_POST, RECEIVE_POST } from '../actions'
import { REQUEST_COMMENTS, RECEIVE_COMMENTS } from '../actions'
import { REQUEST_COMMENT, RECEIVE_COMMENT } from '../actions'
import { SEND_POST_VOTE, COMPLETE_POST_VOTE } from '../actions'
import { SEND_COMMENT_VOTE, COMPLETE_COMMENT_VOTE } from '../actions'
import { SEND_DELETE_POST, COMPLETE_DELETE_POST } from '../actions'
import { CREATE_POST, EDIT_POST } from '../actions'
import { SEND_DELETE_COMMENT, COMPLETE_DELETE_COMMENT } from '../actions'
import { CREATE_COMMENT, EDIT_COMMENT } from '../actions'

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
    case SEND_DELETE_POST:
      //TODO: Update state.
    case COMPLETE_DELETE_POST:
    case REQUEST_POSTS:
      return {...state, 
        [action.category]: posts(state[action.category], action)
      }
    case CREATE_POST:
      return {...state,
        [action.post.category]: [...posts, action.post]
      }
    case EDIT_POST:
      return {...state,
        [action.post.category]: [...posts, action.post]
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
	case SEND_POST_VOTE:
    case COMPLETE_POST_VOTE:  
     /* return {
        ...state,
        post: {
          ...state.post,
          voteScore: state.post.voteScore
        }      
      }*/
    default: 
      return state
  }
}


function commentDetails(state = {}, action) {
  switch (action.type) {
    case RECEIVE_COMMENT:
    case REQUEST_COMMENT:
      return {...state, 
        post: comment(action.post, action)
      }
    default: 
      return state
  }
}

function comment( state = { isFetching: false}, action) {
  switch (action.type) {
    case REQUEST_POST:
      return {...state, 
      	isFetching: true,
        comment: {}
      }
    case RECEIVE_POST:
      return {...state, 
        isFetching: false,
        comment: action.comment,
        lastUpdated: action.recievedAt
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
	case SEND_DELETE_POST:
      //TODO: Update state.
    case COMPLETE_DELETE_POST:  
    case CREATE_COMMENT:
    case EDIT_COMMENT:
    default: 
      return state
  }
}



const rootReducer = combineReducers({
  postsByCategory,
  selectedCategory, 
  postDetails,
  selectedPost, 
  commentsByPost,
  commentDetails
})

export default rootReducer