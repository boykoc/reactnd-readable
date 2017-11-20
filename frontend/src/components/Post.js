import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, fetchPost, fetchComments, pushPostVote, pushCommentVote, pushPostDelete } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props)
    this.handleUpVote = this.handleUpVote.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedPost } = this.props
	dispatch(fetchComments(selectedPost))  
  }
  
  handleUpVote(e, post_id) {
   	this.props.dispatch(pushPostVote(post_id, 'upVote'))
    // This is a basic implementaiton. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchPost(post_id))
  }
  
  handleDownVote(e, post_id) {
   	this.props.dispatch(pushPostVote(post_id, 'downVote'))
    // This is a basic implementaiton. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchPost(post_id))
  }  
  
    handleCommentUpVote(e, post_id, comment_id) {
   	this.props.dispatch(pushCommentVote(comment_id, 'upVote'))
    // This is a basic implementaiton. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchComments(post_id))
  }
  
  handleCommentDownVote(e, post_id, comment_id) {
   	this.props.dispatch(pushCommentVote(comment_id, 'downVote'))
    // This is a basic implementaiton. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchComments(post_id))
  }  
  
  onDeletePost(post_id) {
  	this.props.dispatch(pushPostDelete(post_id))
  }
  
  render() {
    const { post, selectedPost, isFetching, comments } = this.props
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
      		<p onClick={e => this.handleUpVote(e, post.id)}>Upvote</p>
			<p onClick={e => this.handleDownVote(e, post.id)}>Downvote</p>
            <p>TODO: Functionality to edit or delete.</p>
			<button onClick={() => this.onDeletePost(post.id)}>Delete post</button>
      		<ul>
             {comments.length > 0 &&
             comments.map((comment) => (
               <li key={comment.id}>
      		     {comment.body} <br />
                 Vote score: {comment.voteScore} | Author: {comment.author}
				<p onClick={e => this.handleCommentUpVote(e, post.id, comment.id)}>Upvote</p>
				<p onClick={e => this.handleCommentDownVote(e, post.id, comment.id)}>Downvote</p>
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