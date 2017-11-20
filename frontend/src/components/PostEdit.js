import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectPost, fetchPost, pushPostEdit } from '../actions';
import serializeForm from 'form-serialize'

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
      this.props.dispatch(selectPost(post))
      this.props.dispatch(fetchPost(post))
    }
  }

  componentWillReceiveProps(nextProps) {
  	this.setState({ post: { title: nextProps.post.title } } )
	this.setState({ post: { body: nextProps.post.body } } )
  }

  render() {    
    return (
      <div>       
       {this.props.post &&
       	<div>
         <h1>Edit Post</h1> 
         <form onSubmit={this.handleSubmit}>       	  
            <input type="text" name="title" placeholder="title" value={this.state.post.title} onChange={e => this.handleTitleChange(e.target.value)}/>
            <input type="text" name="body" placeholder="body" value={this.state.post.body} onChange={e => this.handleBodyChange(e.target.value)}/>
            <button>Edit Post</button>
          </form>
         </div>
       }
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

export default connect(mapStateToProps)(PostEdit);