import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCategory, fetchPosts, selectPost, fetchPost, updateCategory } from '../actions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PostList from './PostList'
import Post from './Post'

class App extends Component {
  constructor(props) {
    super(props)
  }
 
  render() {
    return (
      <div>		
      	<Route exact path="/" component={PostList} />	
      	<Route exact path="/:category" component={PostList} />
      	<Route path="/:category/:post" component={Post} />		
      </div>  
    );
  }
}

export default App;
