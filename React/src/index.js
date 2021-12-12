import React from 'react';
import ReactDOM from 'react-dom';
import Home from './screens/Home';
import Signup from './screens/Signup';
import SignupArtist from './screens/SignupArtist';
import MyProfile from './screens/MyProfile'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import Artist from './screens/Artist';


const App = () => (
  
  <Router>
    <div>
      <Route exact path="/" component={Home} />
      <Route path="/signup" component={Signup} />
      <Route path="/signupartist" component={SignupArtist} />
      <Route path="/myprofile" component={MyProfile} />
      <Route path="/artist" component={Artist} />
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('root'));