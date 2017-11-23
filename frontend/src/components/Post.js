import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCategory, selectPost, fetchPost, fetchComments, pushPostVote, pushCommentVote, pushPostDelete, pushCommentDelete } from '../actions';
import { Link } from 'react-router-dom'
import ArrowLeftIcon from 'react-icons/lib/fa/arrow-left'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'
import PlusIcon from 'react-icons/lib/fa/plus-circle'
import EditIcon from 'react-icons/lib/fa/edit'
import TrashIcon from 'react-icons/lib/fa/trash'

class Post extends Component {
  constructor(props) {
    super(props)
    this.handleUpVote = this.handleUpVote.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedPost, match } = this.props
    dispatch(fetchComments(match.params.post))
    dispatch(selectPost(match.params.post))
    dispatch(fetchPost(match.params.post))  
  }
  
  handleUpVote(e, post_id) {
    this.props.dispatch(pushPostVote(post_id, 'upVote'))
    // This is a basic implementaiton. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchPost(post_id))
  }
  
  handleDownVote(e, post_id) {
    this.props.dispatch(pushPostVote(post_id, 'downVote'))
    // This is a basic implementaiton. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchPost(post_id))
  }  
  
  handleCommentUpVote(e, post_id, comment_id) {
    this.props.dispatch(pushCommentVote(comment_id, 'upVote'))
    // This is a basic implementaiton. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchComments(post_id))
  }
  
  handleCommentDownVote(e, post_id, comment_id) {
    this.props.dispatch(pushCommentVote(comment_id, 'downVote'))
    // This is a basic implementaiton. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchComments(post_id))
  }  
  
  onDeletePost(post_id) {
    this.props.dispatch(pushPostDelete(post_id))
    this.props.history.push(`/${this.props.match.params.category}`)
  }
  
  onDeleteComment(comment_id) {
    this.props.dispatch(pushCommentDelete(this.props.post.id, comment_id, this.props.comments))
  }
  
  render() {
    const { post, selectedPost, isFetching, comments, selectedCategory } = this.props
    return (
      <div>
        <div className='nav'>      
          <Link to={`/${selectedCategory}`}><ArrowLeftIcon size={30} fill={'#02b3e4'}/></Link> 
          <h1 className='title-category'>Post Details</h1>
        </div> 
        <div className="create-posts-form">
          {isFetching && !post.hasOwnProperty('id') && <h2>Loading...</h2>}
          {!isFetching && !post.hasOwnProperty('id') && <h2>No post found.</h2>}
          {post.hasOwnProperty('id') &&
            <div className="create-posts-details">
              <div className="flex-3">
                <h2>{post.title}</h2>
                <div className='posts-list'>
                  <p>{post.body}</p>
                  <p>Author: {post.author}</p>
                  <p>Vote score: {post.voteScore}</p>
                  <p>Total comments: {comments.length}</p>  
                </div>
                <p>
                  <button 
                    onClick={e => this.handleUpVote(e, post.id)} 
                    className='post-remove'><ThumbsUpIcon size={30} fill={'#02b3e4'}/></button>
                  <button 
                    onClick={e => this.handleDownVote(e, post.id)} 
                    className='post-remove'><ThumbsDownIcon size={30} fill={'#02b3e4'}/></button>
                </p> 
              </div>                     
            </div>
          }
          <div>
            <button 
              onClick={() => this.onDeletePost(post.id)} 
              className='post-remove'><TrashIcon size={30} fill={'#02b3e4'}/></button>
            <Link 
              to={`${post.id}/edit`} 
              className='post-remove'><EditIcon size={30} fill={'#02b3e4'}/></Link>              
          </div>   
        </div>
        <div className="create-posts-form">
          <div className="create-posts-details">
            <h3>Comments</h3>
            <Link to={`${post.id}/comment/create`} className='post-create'><PlusIcon size={30} fill={'#02b3e4'}/> Add Comment</Link>
            <ul className='posts-list'>
              {comments.length > 0 &&
                comments.map((comment) => (
                  <li key={comment.id} className='posts-list-item'>
                    <div className='posts-details'>
                      <p>{comment.body}</p>
                      <p>Vote score: {comment.voteScore} | Author: {comment.author}</p>
                      <p>
                        <button 
                          onClick={e => this.handleCommentUpVote(e, post.id, comment.id)} 
                          className='post-remove'><ThumbsUpIcon size={30} fill={'#02b3e4'}/></button>
                        <button 
                          onClick={e => this.handleCommentDownVote(e, post.id, comment.id)} 
                          className='post-remove'><ThumbsDownIcon size={30} fill={'#02b3e4'}/></button>
                      </p>
                    </div>
                    <button 
                      onClick={() => this.onDeleteComment(comment.id)} 
                      className='post-remove'><TrashIcon size={30} fill={'#02b3e4'}/></button>
                    <Link 
                      to={`${post.id}/${comment.id}/edit`} 
                      className='post-remove'><EditIcon size={30} fill={'#02b3e4'}/></Link>
                  </li>
                ))
              }
            </ul>   
          </div>     
        </div>
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

export default connect(mapStateToProps)(Post);