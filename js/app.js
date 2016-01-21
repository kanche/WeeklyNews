var React = require('react');
var Parse = require('parse');

// Insert your app's keys here:
Parse.initialize('Application_ID', 'JavaScript_Key');

var LoginWrapper = require('./LoginWrapper.react.js');

React.render(
  <LoginWrapper />,
  document.getElementById('app')
);
