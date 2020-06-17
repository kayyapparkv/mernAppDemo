import React from 'react';
import axios from 'axios';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';

import './App.css';

import Nav from './Nav';
import CattleDetails from './addCattleDetails';
import homePage from './homePage';
import logo from './dvaratrustlogo.png';

class App extends React.Component {

  render() {


    //JSX
    return(
      <Router>
        <div>
          <div className="header-logo">
            <ul className = "top-bar">
              <li><img src={logo} /></li>
              <li className = "top-bar-header"><h3>Dvara E-Dairy Farm Solutions</h3></li>
            </ul>
          </div>
          <Nav />
          <switch>
            <Route path="/" exact component={homePage}/>
            <Route path="/details" component={CattleDetails}/>
          </switch>
        </div>
      </Router>
    );
  }

}

export default App;