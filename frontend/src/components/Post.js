import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, fetchPost } from '../actions';

class Post extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { post, selectedPost, isFetching } = this.props
    console.log(this.props)
    return (
      <div>
        {isFetching && !post.hasOwnProperty('id') && <h2>Loading...</h2>}
        {!isFetching && !post.hasOwnProperty('id') && <h2>No post found.</h2>}
        {post.hasOwnProperty('id') &&
          <div>
         	<h2>{post.title}</h2>
          	<p>{post.body}</p>
		  </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedPost, postDetails } = state
  const { post, isFetching } = postDetails.post || { isFetching: false, post: {} }
  return {
    selectedPost, post, isFetching
  }  
}

export default connect(mapStateToProps)(Post);