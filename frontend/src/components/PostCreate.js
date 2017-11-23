import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, fetchPost, pushPostCreate } from '../actions';
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-left'

class PostCreate extends Component {  
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true })    
    this.props.dispatch(pushPostCreate(values, this.props.match.params.category))
    this.props.history.push(`/${this.props.match.params.category}`)
  }
  
  render() {    
    return (
      <div>
        <div className='nav'>
          <Link to={`/${this.props.selectedCategory}`}><ArrowLeftIcon size={30} fill={'#02b3e4'}/></Link>
          <h1 className='title-category'>Create New Post</h1>
        </div> 
        <form onSubmit={this.handleSubmit} className="create-posts-form">  
          <div className="create-posts-details">
            <input type="text" name="title" placeholder="title" />
            <input type="text" name="body" placeholder="body"/>
            <input type="text" name="author" placeholder="author"/>
            <button className="grey-button">Add Post</button>
          </div>
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