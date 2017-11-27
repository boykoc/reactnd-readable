import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom'

class FourOFour extends Component {  
  render() {    
    return (
      <div className="create-posts-form">      
        <div className={"create-posts-details", "center"}>
      	  <h2>404</h2>
		  <h2>Uh oh, something happened and we couldn't find this info...</h2>
          <Link to={`/`}>Go back Home</Link>                     
        </div>
      </div>
    )
  }
}

export default FourOFour;