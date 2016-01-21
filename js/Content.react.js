var React = require('react');
var Parse = require('parse').Parse;
var ParseReact = require('parse-react');


var Content = React.createClass({
  mixins: [ParseReact.Mixin],

  observe: function(props, state) {
    return {
            news: (new Parse.Query('News'))
              .equalTo('weekno', props.week)
              .ascending('title')
        };
    },

  render: function() {
    var rows = this.data.news.map(function(d){
      return(
        <div className="list-group-item" key={d.objectId}>
            <span className="name" minWidth="120px" style={{"display": "inline-block"}}>{d.title}</span> <br/>
            <span className="text-muted" fontSize="11px">{d.description}</span> 
        </div>
      );
    });
    return (
      <div className="list-group">
          {rows}
      </div>
    );
  }
});

module.exports = Content;