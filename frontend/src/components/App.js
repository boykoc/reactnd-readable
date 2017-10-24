import React, { Component } from 'react';
import CategoryList from './CategoryList';
import { Route } from 'react-router-dom'
import { connect } from 'react-redux';
import { loadCategories } from '../actions';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      posts: []
    }
  }

  /*doThing = () => {
    this.props.loadPosts({})
  }*/
  
  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/categories`;
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) => { 
        return(res.json()) 
      })
      .then((data) => {
      	this.setState({categories: data});
        //console.log(data)
        this.props.getCategories(data)
      });
  }

  render() {
    //console.log(this.state.categories)
    console.log(this.props.getCategories(this.state.categories.categories))
    return (
      <div>
        <Route exact path='/' render={() => (
            <CategoryList />
          )} />
      </div>
    );
  }
}

function mapStateToProps(categories) {
  return {
    categories
  }
}

function mapDispatchToProps (dispatch) {
  return {
    getCategories: (state) => dispatch(loadCategories(state))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
