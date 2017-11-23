import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, fetchPost, pushPostEdit } from '../actions';
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-left'

class PostEdit extends Component {  
  
  constructor(props) {
    super(props)
    this.handleTitleChange = this.handleTitleChange.bind(this)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
    this.state = {
      post: {
        title: 'title',
        body: 'body'
      }
    }
  }
    
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true })    
    this.props.dispatch(pushPostEdit(values, this.props.post.id))
    this.props.history.push(`/${this.props.match.params.category}`)    
  }

  handleTitleChange = (value) => {
    this.setState({ post: { title: value } })
  }

  handleBodyChange = (value) => {
    this.setState({ post: { body: value } }) 
  }

  componentDidMount() {
    const { dispatch, selectedPost, post } = this.props
    if (this.props.match.params.post) {
      const post = this.props.match.params.post
      this.setState({ post: this.props.post})
    }
  }

  render() {    
    return (
      <div>  
        <div className='nav'>
          <Link to={`/${this.props.selectedCategory}/${this.props.selectedPost}`}><ArrowLeftIcon size={30} fill={'#02b3e4'}/></Link>
          <h1 className='title-category'>Create New Post</h1>
        </div> 
        {this.props.post &&
          <div>
            <form onSubmit={this.handleSubmit} className="create-posts-form">
              <div className="create-posts-details">
                <input type="text" name="title" placeholder="title" value={this.state.post.title} onChange={e => this.handleTitleChange(e.target.value)}/>
                <input type="text" name="body" placeholder="body" value={this.state.post.body} onChange={e => this.handleBodyChange(e.target.value)}/>
                <button className="grey-button">Edit Post</button>
              </div>
            </form>
          </div>
        }
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedPost, postDetails, commentsByPost, selectedCategory } = state
  const { post, isFetching } = postDetails.post || { isFetching: false, post: {} }
  const { comments } = commentsByPost[selectedPost] || { isFetching: false, comments: [] }
  return {
    selectedPost, post, isFetching, comments, selectedCategory
  }  
}

export default connect(mapStateToProps)(PostEdit);