import React, { Component } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import SortPostList from './SortPostList'
import Post from './Post'
import PostCreate from './PostCreate'
import PostEdit from './PostEdit'
import CommentCreate from './CommentCreate'
import CommentEdit from './CommentEdit'

class App extends Component {
  constructor(props) {
    super(props)
  }
 
  render() {
    return (
      <div>		
      	<Route exact path="/" component={SortPostList} />	
      	<Route exact path="/:category" component={SortPostList} />
      	<Route exact path="/:category/:post" component={Post} />		
        <Route path="/:category/post/create" component={PostCreate} />		
        <Route exact path="/:category/:post/edit" component={PostEdit} />	
      	<Route exact path="/:category/:post/comment/create" component={CommentCreate} />  
        <Route exact path="/:category/:post/:comment/edit" component={CommentEdit} />      
      </div>  
    );
  }
}

export default App;
