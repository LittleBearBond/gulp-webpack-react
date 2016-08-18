import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { UpdateView } from '../actions'
let id = 1;

class Header extends Component {
    constructor(props) {
        super(props);
        this.onkeyUp = this.onkeyUp.bind(this);
    }
    onkeyUp(e) {
        const {dispatch} = this.props;
        const input = this.refs.input;
        const value = input.value.trim();
        if (e.keyCode !== 13 || !value) {
            return;
        }
        dispatch(UpdateView([
            {
                text: value,
                id: id++
            }
        ]))
        input.value = '';
    }
    render() {
        return (
            <header>
                <input placeholder="请输入车牌号" autofocus="true" ref='input' onKeyUp={this.onkeyUp}/>
                <i></i>
            </header>
        )
    }
}
Header = connect()(Header);

class Item extends Component {
    render() {
        const {id, text} = this.props;
        return (
            <li data-id={id}> {text} </li>
        )
    }
}

Item.propTypes = {
    text: PropTypes.string.isRequired,
    id: PropTypes.number.isRequired
}

class ListItem extends Component {
    render() {
        const {listItem} = this.props;
        return (
            <ul className="p-list-item" >
                {listItem.map(val => {
                    return <Item key={val.id} {...val}/>
                }) }
            </ul>
        )
    }
}

ListItem.propTypes = {
    listItem: PropTypes.arrayOf(PropTypes.shape({
        id: PropTypes.number.isRequired,
        text: PropTypes.string.isRequired
    }).isRequired).isRequired
}

ListItem = connect((state) => {
    return {
        listItem: state
    }
})(ListItem);

export default class App extends Component {
    render() {
        return (
            <section className="page p-search slide in">
                <div className="inner-wrap">
                    <Header/>
                    <ListItem/>
                </div>
            </section>
        )
    }
}