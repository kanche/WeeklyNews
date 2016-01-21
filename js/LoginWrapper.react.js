var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');

var AppWrapper = require('./AppWrapper.react.js');

var LoginWrapper = React.createClass({
  mixins: [ParseReact.Mixin],

  getInitialState: function() {
    return {
      error: null,
      signup: false
    };
  },

  observe: function() {
    return {
      user: ParseReact.currentUser
    };
  },

  render: function() {
    if (this.data.user) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-sm-10"><h3>WeeklyNewsDigest</h3></div>
            <div className="col-sm-2"><a className='pull-right logout' onClick={this.logOut}>logout</a></div>
          </div>
          <AppWrapper />
        </div>
      );
    }
    return (
      <div className="container">
        <div className="form-signin" onKeyDown={this.keyDown}>
          <h2 className="form-signin-heading">Please sign in</h2>
          <div className='text-center alert alert-info'>Username: demo, Password: demo</div>
          <label htmlFor="username" className="sr-only">Username</label>
          <input ref='username' type="text" id="username" className="form-control" placeholder="Username" required autofocus/>
          <label htmlFor="password" className="sr-only">Password</label>
          <input  ref='password' type="password" id="password" className="form-control" placeholder="Password" required/>
          <button className="btn btn-lg btn-primary btn-block" onClick={this.submit}>
            {this.state.signup ? 'Sign up' : 'Log in'}
          </button>
          <div className='text-center'>
              or <a onClick={this.toggleSignup} className="toggle"> {this.state.signup ? 'log in' : 'sign up'}</a>
          </div>
          { this.state.error ? <div className='text-center alert alert-danger'>{this.state.error}</div> : null }
        </div>
      </div> 
    );
  },

  submit: function() {
    var self = this;
    var username = React.findDOMNode(this.refs.username).value;
    var password = React.findDOMNode(this.refs.password).value;
    if (username.length && password.length) {
      if (this.state.signup) {
        console.log('signup');
        var u = new Parse.User({
          username: username,
          password: password
        });
        u.signUp().then(function() {
          self.setState({
            error: null
          });
        }, function() {
          self.setState({
            error: 'Invalid account information'
          });
        });
      } else {
        Parse.User.logIn(username, password).then(function() {
          self.setState({
            error: null
          });
        }, function() {
          self.setState({
            error: 'Incorrect username or password'
          });
        });
      }
    } else {
      this.setState({
        error: 'Please enter all fields'
      });
    }
  },

  logOut: function() {
    Parse.User.logOut();
  },

  keyDown: function(e) {
    if (e.keyCode === 13) {
      this.submit();
    }
  },

  toggleSignup: function() {
    this.setState({
      signup: !this.state.signup
    });
  }

});

module.exports = LoginWrapper;