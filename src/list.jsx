var React = require('react');
var ListItem = require('./list-item');

var List = React.createClass({
    render(){
        return (
            <div>
                {this.renderList()}
            </div>
        )
    },

    renderList(){
        if (this.props.items && Object.keys(this.props.items).length === 0 ){
            return (
                <h4>
                    Add a to-do to get started
                </h4>
            )
        } else {
            var children = [];
            for (var key in this.props.items){
                var item = this.props.items[key];
                item.key = key;
                children.push(
                    <ListItem   item={item}
                                key={key} >
                    </ListItem>
                )
            }
            children = children.slice(0, children.length - 1);
            return children;
        }
    },

});

module.exports = List;