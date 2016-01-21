var React = require('react');

var Content = require('./Content.react.js');
var Sidebar = require('./Sidebar.react.js');

var AppWrapper = React.createClass({
  getInitialState: function() {
    return {
      week: null
    };
  },

  render: function() {
    return (
      <div className="row" >
        <Sidebar onUpdate={this.onUpdate} />
        <div className="col-sm-9 col-md-10">
            <div id="home">
              <Content  week={this.state.week} />
            </div>
        </div>
      </div>
    );
  },
  onUpdate: function(val) {
      this.setState({
          week: val
      });
  }
});

module.exports = AppWrapper;