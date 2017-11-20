import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, fetchPost, pushPostCreate } from '../actions';
import serializeForm from 'form-serialize'

class PostCreate extends Component {  
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true })    
    this.props.dispatch(pushPostCreate(values, this.props.match.params.category))
  }
  
  render() {    
    return (
      <div>
        <h1>Create new Post</h1>
        <form onSubmit={this.handleSubmit}>       	  
          <input type="text" name="title" placeholder="title" />
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

export default connect(mapStateToProps)(PostCreate);