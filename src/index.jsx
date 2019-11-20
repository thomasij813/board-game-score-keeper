import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import AddBoardgame from './components/AddBoardgame/AddBoardgame.jsx';
import AddRound from './components/AddRound/AddRound.jsx';
import Boardgame from './components/Boardgame/Boardgame.jsx';
import Home from './components/Home/Home.jsx';
import Round from './components/Round/Round.jsx';
import './tailwind.css';

const App = () => (
  <Router>
    <div className="container mx-auto">
      <nav>
        <ul className="flex">
          <li className="m-1">
            <Link to="/">Home</Link>
          </li>
          <li className="m-1">
            <Link to="/add/game">Add Game</Link>
          </li>
          <li className="m-1">
            <Link to="/add/round">Add Round</Link>
          </li>
        </ul>
      </nav>

      <Switch>
        <Route exact path="/" children={<Home />} />
        <Route exact path="/add/game" children={<AddBoardgame />} />
        <Route exact path="/add/round" children={<AddRound />} />
        <Route exact path="/boardgame/:id" children={<Boardgame />} />
        <Route
          exact
          path="/boardgame/:bggId/round/:roundId"
          children={<Round />}
        />
        <Route>
          <h1>404: Resource Not Found</h1>
        </Route>
      </Switch>
    </div>
  </Router>
);

ReactDOM.render(<App />, document.getElementById('app'));
