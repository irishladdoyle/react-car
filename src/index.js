import React from 'react';
import ReactDOM from 'react-dom';
import Catalogue from './Catalogue';
import '../node_modules/bootstrap/dist/css/bootstrap.css';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import CarDetail from './CarDetail'
import Rent from './Rent'

var App = React.createClass({
  render : function() {
    return (
      <div>
        <h1>Phone Catalogue </h1>
        {this.props.children}
      </div>
    )
  }
});

ReactDOM.render( (
    <Router history={browserHistory} >
      <Route path="/" component={App}>
        <IndexRoute component={Catalogue}/>
        <Route path="cars" component={Catalogue}/>
        <Route path="cars/" component={Catalogue}/>
        <Route path="cars/:id" component={CarDetail} />
        <Route path="rent/:id" component={Rent} />
      </Route>
    </Router>
  ),
  document.getElementById('root')
);