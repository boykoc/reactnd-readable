import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCategory, fetchPosts, selectPost, fetchPost, updateCategory, pushPostVote, pushPostDelete, setSortFilter, sortByDate, sortByVote } from '../actions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import TrashIcon from 'react-icons/lib/fa/trash'
import PlusIcon from 'react-icons/lib/fa/plus-circle'
import ThumbsUpIcon from 'react-icons/lib/fa/thumbs-o-up'
import ThumbsDownIcon from 'react-icons/lib/fa/thumbs-o-down'
import EditIcon from 'react-icons/lib/fa/edit'

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
    // This is a basic implementation. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchPosts(this.props.selectedCategory))
  }

  handleDownVote(e, post_id) {
    this.props.dispatch(pushPostVote(post_id, 'downVote'))
    // This is a basic implementation. I would rather update the store
    // through the reducer
    this.props.dispatch(fetchPosts(this.props.selectedCategory))
  }  

  onDeletePost(post_id) {
    this.props.dispatch(pushPostDelete(post_id, this.props.posts, this.props.selectedCategory))
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
    return (
      <div className='list-posts'>
        <div className='nav'>
          {options.map(option => (
            <Link to={option === 'all' ? '/' : `/${ option }`} 
              onClick={e => this.handleCategoryClick(e, option)}
              key={option}>{option}</Link>
          ))}     
          <h1 className='title-category'>Posts for {selectedCategory}</h1>
        </div> 
        <div className='list-posts-top'>
          <button onClick={() => this.handleSortClick('SORT_BY_DATE')} className="grey-button">Sort by Date</button>
          <button onClick={() => this.handleSortClick('SORT_BY_SCORE')} className="grey-button">Sort by Score</button>
          {selectedCategory !== 'all' &&
            <Link to={`/${selectedCategory}/post/create`} className='post-create'><PlusIcon size={30} fill={'#02b3e4'}/> Add Post</Link>
          }
        </div>  
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}   
        {!isFetching && posts.length === 0 && 
          <h2>No posts founds.</h2> 
        }
        <div>   
          <ol className='posts-list'>
            {posts.length > 0 &&
              posts.map((post) => (
                <li key={post.id} className='posts-list-item'>
                  <div className='posts-details'>
                    <p>
                      <Link 
                        to={`/${selectedCategory}/${post.id}`} 
                        onClick={e => this.handlePostClick(e, post.id)}>{post.title}</Link>
                    </p>
                    <p>Author: {post.author}</p>
                    <p>Score: {post.voteScore}</p>
					<p>Deleted: {post.deleted.toString()}</p>
                    <p>
                      <button 
                        onClick={e => this.handleUpVote(e, post.id)} 
                        className='post-remove'><ThumbsUpIcon size={30} fill={'#02b3e4'}/></button>
                      <button 
                        onClick={e => this.handleDownVote(e, post.id)} 
                        className='post-remove'><ThumbsDownIcon size={30} fill={'#02b3e4'}/></button>
                    </p>                    
                  </div>
                  <Link 
                    to={`${selectedCategory}/${post.id}/edit`} 
                    className='post-remove'><EditIcon size={30} fill={'#02b3e4'}/></Link>
                    <button 
                      className='post-remove' 
                      onClick={() => this.onDeletePost(post.id)}><TrashIcon size={30} fill={'#02b3e4'}/></button>
                </li>
              ))
            }
          </ol>   
        </div>
      </div>
    )
  }
}

export default PostList;
