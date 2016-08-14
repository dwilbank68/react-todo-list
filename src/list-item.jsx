var React = require('react');

var ListItem = React.createClass({

    getInitialState() {
        return {
            text: this.props.item.text,
            done: this.props.item.done,
            textChanged: false
        }
    },

    componentWillMount(){
        //this.fb = firebase.database().ref().child("items/" + this.props.item.key);
        this.fb2 = firebase.database().ref("items/");
    },

    changesButtons() {
        if (!this.state.textChanged){
            return null
        } else {
            return [
                <button className="btn btn-default"
                        onClick={this.handleSaveClick}>
                    Save
                </button>,

                <button className="btn btn-default"
                        onClick={this.handleUndoClick}>
                    Undo
                </button>
            ]
        }
    },

    handleDeleteClick(){
        this.fb2
            .child(this.props.item.key)
            .remove();
    },

    handleDoneChange(event){
        var updateObj = {done:event.target.checked};
        this.setState(updateObj);
        //this.fb
        //    .update(updateObj);
        this.fb2
            .child(this.props.item.key)
            .update(updateObj);
    },

    handleSaveClick(){
        this.fb2
            .child(this.props.item.key)
            .update({text:this.state.text});

        this.setState({textChanged:false});
    },

    handleTextChange(e){
        this.setState({
            text: e.target.value,
            textChanged: true
        })
    },

    handleUndoClick(){
        this.setState({
            text:this.props.item.text,
            textChanged: false
        })
    },

    render(){

        return (
            <div className="input-group">

                <span className="input-group-addon">
                    <input  type="checkbox"
                            onChange={this.handleDoneChange}
                            checked={this.state.done}/>
                </span>

                <input  type="text"
                        className="form-control"
                        disabled={this.state.done}
                        value={this.state.text}
                        onChange={this.handleTextChange}/>

                <span className="input-group-btn">
                    {this.changesButtons()}
                    <button className="btn btn-default"
                            onClick={this.handleDeleteClick}>
                        Delete
                    </button>
                </span>

            </div>
        )

    }
});

module.exports = ListItem;