import React, { Component } from 'react';
import Routes from './routes/Routes';

// Themes

// default
import './assets/scss/theme.scss';

// dark
// import './assets/scss/theme-dark.scss';

// rtl
// import './assets/scss/theme-rtl.scss';


/**
 * Main app component
 */
class App extends Component {
  render() {
    return <Routes></Routes>;
  }
}

export default App;
