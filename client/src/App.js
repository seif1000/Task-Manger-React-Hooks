import React from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import Signup from './componnent/Signup';
import Login from './componnent/Login';
import Home from './componnent/Home';
import Navbar from './componnent/Nvabar';
import PostDetails from "./componnent/PostDetails";
import User from './componnent/user';
import Provider from './context';
import 'bootstrap/dist/css/bootstrap.min.css';
 import './App.css'


function App() {
  return (
    <Provider>
      <Navbar/>
      <Router>
        
        <div className="App">
          <Switch>
          
            <Route path='/tasks/:id' exact component={PostDetails}/>
            <Route path='/tasks' exact component={Home}/>
            <Route path="/login" exact component={Login}/>
            <Route path="/users/me" exact component={User}/>
            <Route path="/" exact component={Signup} />
            
          </Switch>
        </div>
      </Router>
    </Provider>
    
    
  );
}

export default App;
