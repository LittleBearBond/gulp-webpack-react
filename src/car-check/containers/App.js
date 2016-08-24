import React, {Component, PropTypes} from 'react';
import { connect } from 'react-redux'
import { UpdateView } from '../actions'
import { DatePicker, Button, Modal, Pagination} from 'antd';
import 'antd/dist/antd.css'

let id = 1;

class Header extends Component {
    constructor(props) {
        super(props);
        this.handleOnkeyUp = this.handleOnkeyUp.bind(this);
    }
    handleOnkeyUp(e) {
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
                <input placeholder="请输入车牌号" className="p-search" autofocus="true" ref='input' onKeyUp={this.handleOnkeyUp}/>
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
    constructor(props) {
        super(props);
        this.state = { visible: false }
        this.handleOk = this.handleOk.bind(this);
        this.showModal = this.showModal.bind(this);
        this.handleCancel = this.handleCancel.bind(this);
    }
    handleOk() {
        this.handleCancel()
    }
    showModal() {
        this.setState({
            visible: true
        })
    }
    handleCancel() {
        this.setState({
            visible: false
        })
    }
    render() {
        return (
            <section className="page p-search slide in">
                <div className="inner-wrap">
                    <Header/>
                    <ListItem/>
                    <DatePicker />
                    <Pagination size="small" total={50}
                        showTotal={total => `共 ${total} 条`}
                        showSizeChanger showQuickJumper />
                    <Button type="primary" onClick={this.showModal}>显示对话框</Button>
                    <Modal title="第一个 Modal"
                        visible={this.state.visible}
                        onOk={this.handleOk}
                        onCancel={this.handleCancel}
                        >
                        <p>对话框的内容</p>
                        <p>对话框的内容</p>
                        <p>对话框的内容</p>
                    </Modal>
                </div>
            </section>
        )
    }
}