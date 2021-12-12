import React from 'react';
import { render } from 'react-dom';
import Home from './screens/Home';
import About from './screens/About';
import Topics from './screens/Topics';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';

const App = () => (
  <routes>
  <Router>
    <div>
      <ul>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/about">About</Link>
        </li>
        <li>
          <Link to="/topics">Topics</Link>
        </li>
      </ul>

      <hr />
<routes>
      <Route exact path="/" component={Home} />
      </routes>
      <routes>
      <Route path="/about" component={About} />
      </routes><routes>
      <Route path="/topics" component={Topics} />
      </routes>
    </div>
  </Router>
  </routes>
);

render(<App />, document.getElementById('root'));