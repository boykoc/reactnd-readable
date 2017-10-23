import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      backend: {categories: []}
    }
  }

  componentDidMount() {
    const url = `${process.env.REACT_APP_BACKEND}/categories`;
    fetch(url, { headers: { 'Authorization': 'whatever-you-want' },
                 credentials: 'include' } )
      .then( (res) => { 
        return(res.json()) 
      })
      .then((data) => {        
        this.setState({backend: data});
      });
  }

  render() {
    return (
      <div>        
        <h1>Readable</h1>
        <p>Categories include:</p> 
        <ul>          
          { this.state.backend.categories.map((category) => (
            <li key={category.name}><Link to={category.path}>{category.name}</Link></li>
          )) }
        </ul>
      </div>
    );
  }
}

export default App;
