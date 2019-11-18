import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddBoardgame from './components/AddBoardgame/AddBoardgame.jsx';
import Boardgame from './components/Boardgame/Boardgame.jsx';

const App = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/add">Add</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/">
          <h1>Home</h1>
        </Route>
        <Route exact path="/add" children={<AddBoardgame />} />
        <Route exact path="/boardgame/:id" children={<Boardgame />} />
        <Route>
          <h1>404: Resource Not Found</h1>
        </Route>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));
