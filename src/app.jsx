var React = require('react');
var ReactDOM = require('react-dom');
var ReactFire = require('reactfire');
var Firebase = require('firebase');
var Header = require('./header');
var List = require('./list');

var config = {
    apiKey: "AIzaSyB09tZCkK24B-0e3uTzKLZ0mV23GUQl2rY",
    authDomain: "grider-58e55.firebaseapp.com",
    databaseURL: "https://grider-58e55.firebaseio.com",
    storageBucket: "grider-58e55.appspot.com",
};

firebase.initializeApp(config);

var App = React.createClass({

    mixins: [ReactFire],

    deleteButton(){
        if (!this.state.loaded){
            return
        } else {
            return (
                <div className="text-center clear-complete">
                    <hr/>
                    <button type="button"
                            onClick={this.onDeleteDoneClick}
                            className="btn btn-default">
                        Clear Completed
                    </button>
                </div>
            )
        }
    },

    getInitialState(){
        return {
            items:{},
            loaded: false
        }
    },

    componentWillMount(){
        var ref = firebase.database().ref("items");
        this.bindAsObject(ref, "items");
        ref.on('value', this.handleDataLoaded);
        this.ref = ref;
        //this.bindAsObject(new Firebase(rootUrl + 'items/'), 'items');
        //this.bindAsObject(firebase.initializeApp(config), 'items');
    },

    handleDataLoaded(){
        this.setState({loaded: true});
    },

    onDeleteDoneClick(){
        //var ref = firebase.database().ref("items");

        for (var key in this.state.items){
            if (this.state.items[key].done == true){
                 this.ref.child(key).remove();
            }
        }
    },

    render: function() {
        return (
            <div className="row panel panel-default">
                <div className="col-md-8 col-md-offset-2">
                    <h2 className="text-center">
                        To-Do List
                    </h2>
                    <Header itemsStore={this.firebaseRefs.items}/>
                    <hr/>
                    <div className={"content " + (this.state.loaded ? "loaded":"")}>
                        <List items={this.state.items}/>
                        {this.deleteButton()}
                    </div>
                </div>
            </div>
        )
    }
});

var element = React.createElement(App, {});
ReactDOM.render(element, document.querySelector('.container'));
