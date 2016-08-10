var React = require('react');

var Header = React.createClass({

    getInitialState(){
        return {text:''}
    },

    handleClick(){
        this.props.itemsStore.push({
            text: this.state.text,
            done: false
        });
        this.setState({text: ''});
    },

    handleInputChange(e){
        this.setState({
            text:e.target.value
        })
    },

    render(){
        return (
            <div className="input-group">
                <input  type="text"
                        className="form-control"
                        value={this.state.text}
                        onChange={this.handleInputChange}/>
                <span className="input-group-btn">
                    <button className="btn btn-default"
                            onClick={this.handleClick}
                            type="button">
                        Add
                    </button>
                </span>
            </div>
        )
    }

})

module.exports = Header;