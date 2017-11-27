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

  state = {
    post: {
      author: "author",
      body: "body",         
      title: "title"
    }
  }

  handleTitleChange = (value) => {
    this.setState((state) => ({
      post: {
        ...state.post,
        title: value 
      }
    }))  
  }

  handleBodyChange = (value) => {
    this.setState((state) => ({
      post: {
        ...state.post,
        body: value 
      }
    }))  
  }

  handleAuthorChange = (value) => {
    this.setState((state) => ({
      post: {
        ...state.post,
        author: value 
      }
    }))  
  }
  
  render() {    
    const isEnabled = this.state.post.title.length > 0 && this.state.post.body.length > 0 && this.state.post.author.length > 0
    return (
      <div>
        <div className='nav'>
          <Link to={`/${this.props.selectedCategory}`}><ArrowLeftIcon size={30} fill={'#02b3e4'}/></Link>
          <h1 className='title-category'>Create New Post</h1>
        </div> 
        <form onSubmit={this.handleSubmit} className="create-posts-form">  
          <div className="create-posts-details">
            <input 
              type="text" 
              name="title" 
              placeholder="title" 
              value={this.state.post.title} 
              onChange={e => this.handleTitleChange(e.target.value)}/>
            <span className={this.state.post.title ? "valid" : "error"} >Post title can't be empty.</span>
            <input 
              type="text" 
              name="body" 
              placeholder="body" 
              value={this.state.post.body} 
              onChange={e => this.handleBodyChange(e.target.value)}/>
            <span className={this.state.post.body ? "valid" : "error"} >Post body can't be empty.</span>
            <input 
              type="text" 
              name="author" 
              placeholder="author" 
              value={this.state.post.author} 
              onChange={e => this.handleAuthorChange(e.target.value)}/>
            <span className={this.state.post.author ? "valid" : "error"} >Post author can't be empty.</span>
            <button className="grey-button" disabled={!isEnabled}>Add Post</button>
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