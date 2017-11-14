import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCategory, fetchPosts, selectPost, fetchPost } from '../actions';
import { Link } from 'react-router-dom'

class App extends Component {
  constructor(props) {
    super(props)
    this.handleChange = this.handleChange.bind(this)
    this.handlePostClick = this.handlePostClick.bind(this)
  }

  componentDidMount() {
    const { dispatch, selectedCategory } = this.props
    dispatch(fetchPosts(selectedCategory))
  }

  handleChange(nextCategory) {
    this.props.dispatch(selectCategory(nextCategory))
    this.props.dispatch(fetchPosts(nextCategory))
  }
  
  handlePostClick(event, post) {
    event.preventDefault()
    this.props.dispatch(selectPost(post))
    this.props.dispatch(fetchPost(post))
  }
  
  render() {
    console.log(this.props)
    const { selectedCategory, posts, isFetching, lastUpdated } = this.props
    const options = ['react', 'redux', 'udacity']
    return (
      <div>
      	
        <span>
          <h1>{selectedCategory}</h1>
          <select onChange={e => this.handleChange(e.target.value)} value={selectedCategory}>
            {options.map(option => (
              <option value={option} key={option}>
                {option}
              </option>
            ))}
          </select>
        </span>
      
        {isFetching && posts.length === 0 && <h2>Loading...</h2>}
        {!isFetching && posts.length === 0 && <h2>No posts founds.</h2>}
        <ul>
         {posts.length > 0 &&
         posts.map((post) => (
           <li key={post.id}>
		     <button onClick={e => this.handlePostClick(e, post.id)}>{post.title}</button> <br/>
			 Author: {post.author} <br/>
			 Score: {post.voteScore}
		   </li>
         ))
        }
  		</ul>
      </div>
    );
  }
}

function mapStateToProps(state) {
  const { selectedCategory, postsByCategory } = state
  const {
    isFetching,
    lastUpdated,
    items: posts
  } = postsByCategory[selectedCategory] || {
    isFetching: true,
    items: []
  }
  return {
    selectedCategory,
    posts,
    isFetching,
    lastUpdated
  }
}

export default connect(mapStateToProps)(App);
