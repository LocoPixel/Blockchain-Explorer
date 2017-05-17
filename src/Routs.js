import React, { Component } from 'react';
// import logo from './logo.svg';
import GamesPage from './components/Game/GamesPage';
import GamesFormPage from './components/Game/GameFormPage';
import './index.css';
import { Link, Match } from 'react-router';

import BlockListIndex from './containers/BlockContainers/BlockListIndex';
import BlockDetailIndex from './containers/BlockContainers/BlockDetailIndex';

class Routs extends Component {
  render() {
    return (
      <div className="ui container">

        <div className="ui four item menu">
          <Link className="item" activeClassName="active" activeOnlyWhenExact to="/">Home</Link>
          <Link className="item" activeClassName="active" activeOnlyWhenExact to="/games">Games</Link>
          <Link className="item" activeClassName="active" activeOnlyWhenExact to="/games/new">Add New Game</Link>
           <Link className="item" activeClassName="active" activeOnlyWhenExact to="/blocks">Blocks</Link>
        </div>

        <Match exactly pattern="/games" component={GamesPage} />
        <Match pattern="/games/new" component={GamesFormPage} />
        <Match pattern="/game/:_id" component={GamesFormPage} />
       <Match pattern="blocks/:blockid" component={BlockDetailIndex} />
        <Match pattern="/blocks" component={BlockListIndex} />

      </div>
    );
  }
}

export default Routs;
