import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchPost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props)
  }
  
  render() {
    return (
      <div>
        <p onClick={e => this.handleUpVote(e, post.id)}>Upvote</p>
		<p onClick={e => this.handleDownVote(e, post.id)}>Downvote</p>
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