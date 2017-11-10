import React, { Component } from 'react';
import { connect } from 'react-redux';

class CategoryList extends Component {
  render() {
    return (
      <div>
		<p>Categories include:</p> 
		<ul>
      {console.log(this.props)}
 
      
        </ul>      
   	  </div>
    );
  }
}

function mapStateToProps(categories) {
  return {
    categories
  }
}

export default connect(mapStateToProps)(CategoryList);
