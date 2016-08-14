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

        var itemsObj = this.props.items;
        delete itemsObj['.key'];
        delete itemsObj['.value'];

        if (Object.keys(itemsObj).length === 0 ){
            return (
                <h4>
                    Add a to-do to get started
                </h4>
            )
        } else {
            var children = [];
            for (var key in itemsObj){
                   console.log('key is ', key);
                   var item = itemsObj[key];
                   console.log('item is ', item);
                   item.key = key;
                   children.push(
                       <ListItem   item={item}
                                   key={key} >
                       </ListItem>
                   )
            }
            return children;
        }
    },

});

module.exports = List;