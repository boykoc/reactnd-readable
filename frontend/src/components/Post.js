import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, fetchPost, fetchComments } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    console.log("post")
    const { dispatch, selectedPost } = this.props
	dispatch(fetchComments(selectedPost))  
  }
  
  render() {
    const { post, selectedPost, isFetching, comments } = this.props
    console.log(this.props)
    return (
      <div>
        {isFetching && !post.hasOwnProperty('id') && <h2>Loading...</h2>}
        {!isFetching && !post.hasOwnProperty('id') && <h2>No post found.</h2>}
        {post.hasOwnProperty('id') &&
          <div>
         	<h2>{post.title}</h2>
          	<p>{post.body}</p>
	        <p>Author: {post.author}</p>
            <p>Vote score: {post.voteScore}</p>
      		<p>Total comments: {comments.length}</p>		
      		<p>TODO: Post voting mechanism.</p>
            <p>TODO: Functionality to edit or delete.</p>
      		<ul>
             {comments.length > 0 &&
             comments.map((comment) => (
               <li key={comment.id}>
      		     {comment.body} <br />
                 Vote score: {comment.voteScore} | Author: {comment.author}
               </li>
             ))
            }
            </ul> 
		  </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedPost, postDetails, commentsByPost } = state
  const { post, isFetching } = postDetails.post || { isFetching: false, post: {} }
  const { comments } = commentsByPost[selectedPost] || { isFetching: false, comments: [] }
  return {
    selectedPost, post, isFetching, comments
  }  
}

export default connect(mapStateToProps)(Post);