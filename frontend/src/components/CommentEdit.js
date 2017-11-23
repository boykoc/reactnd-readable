import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, fetchPost, pushCommentEdit } from '../actions';
import serializeForm from 'form-serialize'
import { Link } from 'react-router-dom'
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-left'

class CommentEdit extends Component {  
  
  constructor(props) {
    super(props)
    this.handleBodyChange = this.handleBodyChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    
    this.state = {
      comment: {
        body: 'body'
      }
    }
  }
    
  handleSubmit = (e) => {
    e.preventDefault()
    const values = serializeForm(e.target, {hash: true })    
    this.props.dispatch(pushCommentEdit(values, this.props.match.params.comment))
    this.props.history.push(`/${this.props.match.params.category}/${this.props.match.params.post}`)    
  }

  handleBodyChange = (value) => {
    this.setState({ comment: { body: value } }) 
  }

  componentDidMount() {
    const { dispatch, selectedPost, post } = this.props
    if (this.props.comments.length > 0) {
      this.setState({ comment: this.props.comments.filter((c) => c.id === this.props.match.params.comment)[0] })
    } else {
      // Fetch comment.
    }
  }


  render() {    
    return (
      <div>
        <div className='nav'>
          <Link to={`/${this.props.selectedCategory}/${this.props.selectedPost}`}><ArrowLeftIcon size={30} fill={'#02b3e4'}/></Link>
          <h1 className='title-category'>Edit Comment</h1>
        </div>  
        <form onSubmit={this.handleSubmit} className="create-posts-form">  
          <div className="create-posts-details">
            <input type="text" name="body" placeholder="body" value={this.state.comment.body} onChange={e => this.handleBodyChange(e.target.value)}/>
            <button className="grey-button">Edit Comment</button>
          </div>
        </form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedPost, postDetails, commentsByPost, commentDetails, selectedCategory } = state
  const { post, isFetching } = postDetails.post || { isFetching: false, post: {} }
  const { comments } = commentsByPost[selectedPost] || { isFetching: false, comments: [] }
  return {
    selectedPost, post, isFetching, comments, commentDetails, selectedCategory
  }  
}

export default connect(mapStateToProps)(CommentEdit);