import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom';
import './App.css';

const Index = () => <h2>Home</h2>;
const About = () => <h2>About</h2>;

const AppRouter = () => (
  <Router>
    <div>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
        </ul>
      </nav>

      <Route path="/" exact component={Index} />
      <Route path="/about" component={About} />
    </div>
  </Router>
)

export default AppRouter;
