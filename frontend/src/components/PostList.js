import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCategory, fetchPosts, selectPost, fetchPost, updateCategory, pushPostVote, pushPostDelete, setSortFilter, sortByDate, sortByVote } from '../actions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
 
class PostList extends Component {
  constructor(props) {
    super(props)
    this.handleCategoryClick = this.handleCategoryClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, match } = this.props
    dispatch(selectCategory(match.params.category || 'all'))
    dispatch(fetchPosts(match.params.category || 'all'))
  }

  handleCategoryClick(e, nextCategory) {
    this.props.dispatch(selectCategory(nextCategory))
    this.props.dispatch(fetchPosts(nextCategory))
  }

  handlePostClick(event, post) {
    this.props.dispatch(selectPost(post))
    this.props.dispatch(fetchPost(post))
  }

  handleUpVote(e, post_id) {
    this.props.dispatch(pushPostVote(post_id, 'upVote'))
    // This is a basic implementaiton. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchPosts(this.props.selectedCategory))
  }

  handleDownVote(e, post_id) {
    this.props.dispatch(pushPostVote(post_id, 'downVote'))
    // This is a basic implementaiton. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchPosts(this.props.selectedCategory))
  }  

  onDeletePost(post_id) {
    this.props.dispatch(pushPostDelete(post_id))
  }     
  
  handleSortClick(filter) {
    this.props.dispatch(setSortFilter(filter))
    if (filter === 'SORT_BY_DATE') {
      this.props.dispatch(sortByDate(this.props.posts, this.props.selectedCategory))
    } else {
      this.props.dispatch(sortByVote(this.props.posts, this.props.selectedCategory))
    }
  }    
 
  
  render() {
    const { selectedCategory, posts, isFetching, lastUpdated } = this.props
    const options = ['all', 'react', 'redux', 'udacity']
    console.log(posts)
    return (
      <div>
        <span>
          <h1>{selectedCategory}</h1>
      	  <div>
            <button onClick={() => this.handleSortClick('SORT_BY_DATE')}>Sort by Date</button>
      	    <button onClick={() => this.handleSortClick('SORT_BY_SCORE')}>Sort by Score</button>
      	  </div>
          {options.map(option => (
            <p key={option}>
              <Link to={option === 'all' ? '/' : `/${ option }`} 
                onClick={e => this.handleCategoryClick(e, option)}>
                {option}
              </Link>
            </p>
          ))}     
        </span>
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>No posts founds.</h2>}
        <div>
          {selectedCategory !== 'all' &&
            <Link to={`/${selectedCategory}/post/create`}>Create Post</Link>
          }
          <ul>
            {posts.length > 0 &&
              posts.map((post) => (
                <li key={post.id}>
                  <Link to={`/${selectedCategory}/${post.id}`} onClick={e => this.handlePostClick(e, post.id)}>{post.title}</Link> <br/>
                  Author: {post.author} <br/>
                  Score: {post.voteScore}
                  <p onClick={e => this.handleUpVote(e, post.id)}>Upvote</p>
                  <p onClick={e => this.handleDownVote(e, post.id)}>Downvote</p>
                  <button onClick={() => this.onDeletePost(post.id)}>Delete Post</button>
				  <Link to={`${selectedCategory}/${post.id}/edit`}>Edit Post</Link>
                </li>
              ))
            }
          </ul>   
        </div>
      </div>
    )
  }
}

export default PostList;
