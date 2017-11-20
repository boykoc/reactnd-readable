import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, fetchPost, fetchComments, pushPostVote, pushCommentVote, pushPostDelete, pushPostCreate } from '../actions';
import serializeForm from 'form-serialize'

class PostCreateEdit extends Component {  
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true })
    this.props.dispatch(pushPostCreate(values, this.props.match.params.category))
  }
  
  render() {
    const { post } = this.props
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <input type="text" name="title" placeholder="title"/>
          <input type="text" name="body" placeholder="body"/>
          <input type="text" name="author" placeholder="author"/>
          <input type="text" name="category" placeholder="category"/>
          <button>Add Post</button>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedCategory } = state
  return {
    selectedCategory
  }  
}

export default connect(mapStateToProps)(PostCreateEdit);