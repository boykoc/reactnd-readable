/* Following Redux Documentation structure to fetch async data. */

/* Standard Actions */

export const SELECT_CATEGORY = 'SELECT_CATEGORY'
 
export function selectCategory(category) {
  return {
    type: SELECT_CATEGORY,
    category
  }
}

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

/* Thunk Actions for async calls */  

export function fetchPosts(category) {
  return function (dispatch) {
    dispatch(requestPosts(category))
    return fetch(`${process.env.REACT_APP_BACKEND}/${category}/posts`, 
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
