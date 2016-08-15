
import React, {Component, PropTypes} from 'react';

export default class AddTodo extends Component {
    render() {
        let input;
        return (
            <div>
                <form className="form-inline"  onSubmit={e => {
                    e.preventDefault()
                } }>
                    <div className="form-group">
                        <input  className="form-control" ref="input"/>
                    </div>
                    <button type="submit"  className="btn btn-default" onClick={(e) => this.handleClick(e) }>
                        Add Todo
                    </button>
                </form>
            </div>
        )
    }
    handleClick(e) {
        const node = this.refs.input
        const text = node.value.trim();
        if (!text) {
            return;
        }
        this.props.onAddClick(text);
        node.value = ''
        node.focus();
    }
}

AddTodo.propTypes = {
    onAddClick: PropTypes.func.isRequired
}