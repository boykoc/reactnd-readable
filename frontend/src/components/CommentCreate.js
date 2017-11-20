import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, fetchPost, pushCommentCreate } from '../actions';
import serializeForm from 'form-serialize'

class CommentCreate extends Component {  
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true })    
    this.props.dispatch(pushCommentCreate(values, this.props.match.params.post))
  }
  
  render() {    
    return (
      <div>
        <h1>Create new Comment</h1>
        <form onSubmit={this.handleSubmit}>       	  
          <input type="text" name="body" placeholder="body"/>
          <input type="text" name="author" placeholder="author"/>
          <button>Add Comment</button>
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

export default connect(mapStateToProps)(CommentCreate);