import React, { Component } from 'react';
import './App.css';
import Users from './Containers/Users/Users';
import UserInfo from './Containers/Users/UserInfo/UserInfo';
import { Route , Switch} from 'react-router-dom';

class App extends Component {
  
  render() {
    return (
      <div className="container flex">
        <Switch>
          <Route path= "/" exact component={Users}/>
          <Route path= "/:user" component={UserInfo}/>
        </Switch> 
      </div>
    );
  } 
}

export default App;
