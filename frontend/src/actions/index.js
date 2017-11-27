import uuid from 'uuid'

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
 * Get Comment
 */

export const REQUEST_COMMENT = 'REQUEST_COMMENT'

export function requestComment(comment) {
  return {
    type: REQUEST_COMMENT,
    comment
  }
}

export const RECEIVE_COMMENT = 'RECEIVE_COMMENT'

export function receiveComment(comment, json) {
  return {
    type: RECEIVE_COMMENT,
    comment: json,
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

/**
 * Delete Post
 */

export const SEND_DELETE_POST = 'SEND_DELETE_POST'

export function sendDeletePost(post_id) {
  return {
    type: SEND_DELETE_POST,
    post_id   
  }
}

export const COMPLETE_DELETE_POST = 'COMPLETE_DELETE_POST'

export function completeDeletePost(post_id, posts, category, json) {
  return {
    type: COMPLETE_DELETE_POST,
    post_id,
    posts,
    category
  }
}

/**
 * Create Post
 */

export const CREATE_POST = 'CREATE_POST'

export function createPost(post) {
  return {
    type: CREATE_POST,
    post
  }
}

/**
 * Edit Post
 */

export const EDIT_POST = 'EDIT_POST'

export function editPost(post) {
  return {
    type: EDIT_POST,
    post
  }
}




/**
 * Delete Comment
 */

export const SEND_DELETE_COMMENT = 'SEND_DELETE_COMMENT'

export function sendDeleteComment(comment_id) {
  return {
    type: SEND_DELETE_COMMENT,
    comment_id   
  }
}

export const COMPLETE_DELETE_COMMENT = 'COMPLETE_DELETE_COMMENT'

export function completeDeleteComment(post, comment_id, comments, json) {
  return {
    type: COMPLETE_DELETE_COMMENT,
    comment_id,
    post,
    comments
  }
}

/**
 * Create Comment
 */

export const CREATE_COMMENT = 'CREATE_COMMENT'

export function createComment(comment) {
  return {
    type: CREATE_COMMENT,
    comment
  }
}

/**
 * Edit Comment
 */

export const EDIT_COMMENT = 'EDIT_COMMENT'

export function editComment(comment) {
  return {
    type: EDIT_COMMENT,
    comment
  }
}

/**
 * Set post sort filter.
 */

export const SET_SORT_FILTER = 'SET_SORT_FILTER'

export function setSortFilter(filter) {
  return {
    type: SET_SORT_FILTER,
    filter
  }
}

export const SORT_BY_DATE = 'SORT_BY_DATE'

export function sortByDate(posts, category) {
  return {
  	type: SORT_BY_DATE,
    posts,
    category
  }
}

export const SORT_BY_VOTE = 'SORT_BY_VOTE'

export function sortByVote(posts, category) {
  return {
    type: SORT_BY_VOTE,
    posts,
    category
  }
}


/* Thunk Actions for async calls */  

const url = process.env.REACT_APP_BACKEND || 'http://localhost:3001'
const credentials = process.env.REACT_APP_BACKEND ? 'include' : 'omit'

export function fetchPosts(category) {  
  let fullurl = `${url}/${category}/posts`
  if (category === 'all') {
    fullurl = `${url}/posts`
  }
  return function (dispatch) {
    dispatch(requestPosts(category))
    return fetch(fullurl, 
                 { headers: { 'Authorization': 'whatever-you-want' }, 
                 credentials: credentials } )
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
    return fetch(`${url}/posts/${post}`, 
                 { headers: { 'Authorization': 'whatever-you-want' }, 
                 credentials: credentials} )
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
    return fetch(`${url}/posts/${post}/comments`, 
                 { headers: { 'Authorization': 'whatever-you-want' }, 
                 credentials: credentials} )
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>             
        dispatch(receiveComments(post, json)) 
      )
  }
}

export function fetchComment(comment) {
  return function (dispatch) {
    dispatch(requestComment(comment))
    return fetch(`${url}/comments/${comment}`, 
                 { headers: { 'Authorization': 'whatever-you-want' }, 
                 credentials: credentials} )
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>             
        dispatch(receiveComment(comment, json)) 
      )
  }
}

export function pushPostVote(post_id, vote) {
  return function (dispatch) {
    dispatch(sendPostVote(post_id, vote))
    return fetch(`${url}/posts/${post_id}`,            
                 { headers: { 'Authorization': 'whatever-you-want', 
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'}, 
                   credentials: credentials,
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
    return fetch(`${url}/comments/${comment_id}`,            
                 { headers: { 'Authorization': 'whatever-you-want', 
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'}, 
                   credentials: credentials,
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

export function pushPostDelete(post_id, posts, category) {
  return function (dispatch) {
    dispatch(sendDeletePost(post_id))
    return fetch(`${url}/posts/${post_id}`,            
                 { headers: { 'Authorization': 'whatever-you-want', 
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'}, 
                   credentials: credentials,
                   method: 'delete' } )
      .then(
        response => response,
        error => console.log('An error occured.', error)
      )
      .then(response =>             
        dispatch(completeDeletePost(post_id, posts, category, response)) 
      )
  }
}

export function pushPostCreate(post, category) {
  return function (dispatch) {
    return fetch(`${url}/posts`,            
                 { headers: { 'Authorization': 'whatever-you-want', 
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'}, 
                   credentials: credentials,
                   method: 'post',
                   body: JSON.stringify( {...post, 
                                          'id': uuid(),
                                          timestamp: Date.now(),
                                          category: category} ) } )
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>             
        dispatch(createPost(json)) 
      )
  }
}

export function pushPostEdit(post, post_id) {
  return function (dispatch) {
    return fetch(`${url}/posts/${post_id}`,            
                 { headers: { 'Authorization': 'whatever-you-want', 
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'}, 
                   credentials: credentials,
                   method: 'put',
                   body: JSON.stringify( {title: post.title,
                                          body: post.body} ) } )
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>             
        dispatch(editPost(json)) 
      )
  }
}

export function pushCommentDelete(post, comment_id, comments) {
  return function (dispatch) {
    dispatch(sendDeleteComment(comment_id))
    return fetch(`${url}/comments/${comment_id}`,            
                 { headers: { 'Authorization': 'whatever-you-want', 
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'}, 
                   credentials: credentials,
                   method: 'delete' } )
      .then(
        response => response,
        error => console.log('An error occured.', error)
      )
      .then(response =>             
        dispatch(completeDeleteComment(post, comment_id, comments, response)) 
      )
  }
}

export function pushCommentCreate(comment, post_id) {
  return function (dispatch) {
    return fetch(`${url}/comments`,            
                 { headers: { 'Authorization': 'whatever-you-want', 
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'}, 
                   credentials: credentials,
                   method: 'post',
                   body: JSON.stringify( {...comment, 
                                          'id': uuid(),
                                          timestamp: Date.now(),
                                          parentId: post_id} ) } )
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>             
        dispatch(createComment(json)) 
      )
  }
}

export function pushCommentEdit(comment, comment_id) {
  return function (dispatch) {
    return fetch(`${url}/comments/${comment_id}`,            
                 { headers: { 'Authorization': 'whatever-you-want', 
                              'Content-Type': 'application/json',
                              'Accept': 'application/json'}, 
                   credentials: credentials,
                   method: 'put',
                   body: JSON.stringify( { body: comment.body,
                                           timestamp: Date.now() } ) } )
      .then(
        response => response.json(),
        error => console.log('An error occured.', error)
      )
      .then(json =>             
        dispatch(editComment(json)) 
      )
  }
}