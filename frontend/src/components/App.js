import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCategory, fetchPosts, selectPost, fetchPost, updateCategory } from '../actions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PostList from './PostList'
import Post from './Post'
import PostCreate from './PostCreate'
import PostEdit from './PostEdit'

class App extends Component {
  constructor(props) {
    super(props)
  }
 
  render() {
    return (
      <div>		
      	<Route exact path="/" component={PostList} />	
      	<Route exact path="/:category" component={PostList} />
      	<Route exact path="/:category/:post" component={Post} />		
        <Route path="/:category/post/create" component={PostCreate} />		
        <Route exact path="/:category/:post/edit" component={PostEdit} />	
      </div>  
    );
  }
}

export default App;
