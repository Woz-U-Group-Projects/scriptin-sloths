import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import React from 'react';
import Users from '../components/Users';


const Home = ( {}) => (
  <div>
      <Users uri="http://localhost:3002/users/profile" />
    <div>
    <h1>Welcome! Please log in</h1>
<form id="login" name="login" method="POST" action="http://localhost:3002/users/login">
    <div>
        <label for="Username">Username: </label>
        <input type="text" name="username"/>
    </div>
    <div>
        <label for="Password">Password: </label>
        <input type="text" name="password"/>
      
    </div>
    <div>
        <button type="submit">Submit</button>
    </div>
</form>
<a href="/signup">Sign up!</a>
<a href="/signupartist">Artist sign up!</a>

  </div>
  
  </div>
);

export default Home;

