import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, fetchPost, pushCommentEdit } from '../actions';
import serializeForm from 'form-serialize'

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

  componentWillReceiveProps(nextProps) {
  	this.setState({ post: { title: nextProps.post.title } } )
	this.setState({ post: { body: nextProps.post.body } } )
  }

  render() {    
    return (
      <div>
        <h1>Edit Comment</h1> 
        <form onSubmit={this.handleSubmit}>       	  
          <input type="text" name="body" placeholder="body" value={this.state.comment.body} onChange={e => this.handleBodyChange(e.target.value)}/>
    	  <button>Edit Comment</button>
    	</form>
      </div>
    )
  }
}

function mapStateToProps(state) {
  const { selectedPost, postDetails, commentsByPost, commentDetails } = state
  const { post, isFetching } = postDetails.post || { isFetching: false, post: {} }
  const { comments } = commentsByPost[selectedPost] || { isFetching: false, comments: [] }
  return {
    selectedPost, post, isFetching, comments, commentDetails
  }  
}

export default connect(mapStateToProps)(CommentEdit);