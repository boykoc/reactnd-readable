import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectCategory, fetchPosts, selectPost, fetchPost, updateCategory, pushPostVote, pushPostDelete, setSortFilter, sortByDate, sortByVote } from '../actions';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import PostList from './PostList'

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
    posts,
    selectedCategory,
    isFetching,
    lastUpdated 
  }
}

const SortPostList = connect(
  mapStateToProps
)(PostList)

export default SortPostList;
