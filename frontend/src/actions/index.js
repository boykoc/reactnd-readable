/* Following Redux Documentation structure to fetch async data. */

/* Standard Actions */

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
 
export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

/**
 * Getting Posts
 */

export const REQUEST_POSTS = 'REQUEST_POSTS'

export function requestPosts(category) {
  return {
    type: REQUEST_POSTS,
    category
  }
}

export const RECEIVE_POSTS = 'RECEIVE_POSTS'

export function receivePosts(category, json) {
  return {
    type: RECEIVE_POSTS,
    category,
    posts: json.map(post => post),
    receivedAt: Date.now()
  }
}

/**
 * Getting a Post
 */

export const SELECT_POST = 'SELECT_POST'
 
export function selectPost(post) {
  return {
    type: SELECT_POST,
    post
  }
}

export const REQUEST_POST = 'REQUEST_POST'

export function requestPost(post) {
  return {
    type: REQUEST_POST,
    post
  }
}

export const RECEIVE_POST = 'RECEIVE_POST'

export function receivePost(post, json) {
  return {
    type: RECEIVE_POST,
    post: json,
    receivedAt: Date.now()
  }
}

/**
 * Getting Comments
 */

export const REQUEST_COMMENTS = 'REQUEST_COMMENTS'

export function requestComments(post) {
  return {
    type: REQUEST_COMMENTS,
    post
  }
}

export const RECEIVE_COMMENTS = 'RECEIVE_COMMENTS'

export function receiveComments(post, json) {
  return {
    type: RECEIVE_COMMENTS,
    post,
    comments: json.map(comment => comment),
    receivedAt: Date.now()
  }
}

/**
 * Voting
 */

export const SEND_POST_VOTE = 'SEND_POST_VOTE'

export function sendPostVote(post_id, vote) {
  return {
    type: SEND_POST_VOTE,
    post_id,
    vote    
  }
}

export const COMPLETE_POST_VOTE = 'COMPLETE_POST_VOTE'

export function completePostVote(post_id, json) {
  return {
    type: COMPLETE_POST_VOTE,
    post_id
  }
}

export const SEND_COMMENT_VOTE = 'SEND_COMMENT_VOTE'

export function sendCommentVote(comment_id, vote) {
  return {
    type: SEND_COMMENT_VOTE,
    comment_id,
    vote    
  }
}

export const COMPLETE_COMMENT_VOTE = 'COMPLETE_COMMENT_VOTE'

export function completeCommentVote(comment_id, json) {
  return {
    type: COMPLETE_COMMENT_VOTE,
    comment_id
  }
}



/* Thunk Actions for async calls */  

export function fetchPosts(category) {
  let url = `${process.env.REACT_APP_BACKEND}/${category}/posts`
  if (category === 'all') {
    url = `${process.env.REACT_APP_BACKEND}/posts`
  }
  return function (dispatch) {
    dispatch(requestPosts(category))
    return fetch(url, 
                 { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>             
        dispatch(receivePosts(category, json)) 
      )
  }
}

export function fetchPost(post) {
  return function (dispatch) {
    dispatch(requestPost(post))
    return fetch(`${process.env.REACT_APP_BACKEND}/posts/${post}`, 
                 { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>             
        dispatch(receivePost(post, json)) 
      )
  }
}

export function fetchComments(post) {
  return function (dispatch) {
    dispatch(requestComments(post))
    return fetch(`${process.env.REACT_APP_BACKEND}/posts/${post}/comments`, 
                 { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>             
        dispatch(receiveComments(post, json)) 
      )
  }
}

export function pushPostVote(post_id, vote) {
  return function (dispatch) {
    dispatch(sendPostVote(post_id, vote))
    return fetch(`${process.env.REACT_APP_BACKEND}/posts/${post_id}`,            
                 { headers: { 'Authorization': 'whatever-you-want', 
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'},
                   credentials: 'include',
                   method: 'post',
                   body: JSON.stringify( {'option': vote} ) } )
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>             
        dispatch(completePostVote(post_id, json)) 
      )
  }
}

export function pushCommentVote(comment_id, vote) {
  return function (dispatch) {
    dispatch(sendCommentVote(comment_id, vote))
    return fetch(`${process.env.REACT_APP_BACKEND}/comments/${comment_id}`,            
                 { headers: { 'Authorization': 'whatever-you-want', 
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'},
                   credentials: 'include',
                   method: 'post',
                   body: JSON.stringify( {'option': vote} ) } )
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>             
        dispatch(completeCommentVote(comment_id, json)) 
      )
  }
}