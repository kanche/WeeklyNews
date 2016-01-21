var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');


var Sidebar = React.createClass({
  mixins: [ParseReact.Mixin],

  getInitialState: function() {
    return {};
  },

  observe: function() {
    return {
      week: (new Parse.Query('Week')).ascending('weekno'),
      user: ParseReact.currentUser
    };
  },
  render: function() {
    var self = this;
    var rows = this.data.week.map(function(d){
            return (<li  key={d.weekno} ><a onClick={this.props.onUpdate.bind(null, d.weekno)}>{d.name}</a></li>);
    }, this);
    return (
    <div className="col-sm-3 col-md-2">
          <ul className="nav nav-pills nav-stacked">
              {rows}
          </ul>
    </div>
    );
  }
});

module.exports = Sidebar;