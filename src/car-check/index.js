require('./css/index.scss');

import React from 'react';
import { render } from 'react-dom';
import { combineReducers, createStore, bindActionCreators } from 'redux';
import { Provider, connect } from 'react-redux';

/**
 * 这是一个 reducer，形式为 (state, action) => state 的纯函数。
 * 描述了 action 如何把 state 转变成下一个 state。
 *
 * state 的形式取决于你，可以是基本类型、数组、对象、
 * 甚至是 Immutable.js 生成的数据结构。惟一的要点是
 * 当 state 变化时需要返回全新的对象，而不是修改传入的参数。
 *
 * 下面例子使用 `switch` 语句和字符串来做判断，但你可以写帮助类(helper)
 * 根据不同的约定（如方法映射）来判断，只要适用你的项目即可。
 */
/*function counter(state = 0, action) {
    switch (action.type) {
        case 'INCREMENT':
            return state + 1;
        case 'DECREMENT':
            return state - 1;
        default:
            return state;
    }
}

// 创建 Redux store 来存放应用的状态。
// API 是 { subscribe, dispatch, getState }。
let store = createStore(counter);
// 可以手动订阅更新，也可以事件绑定到视图层。
store.subscribe(() => console.log(store.getState()));
console.log(store);
// 改变内部 state 惟一方法是 dispatch 一个 action。
// action 可以被序列化，用日记记录和储存下来，后期还可以以回放的方式执行
store.dispatch({ type: 'INCREMENT' });
// 1
store.dispatch({ type: 'INCREMENT' });
// 2
store.dispatch({ type: 'DECREMENT' });
// 1*/
 
/*
//action
//我们这里并没有使用const来声明常量，实际生产中不推荐像下面这样做
function changeText() {
    return {
        type: 'CHANGE_TEXT'
    }
}

function buttonClick() {
    return {
        type: 'BUTTON_CLICK'
    }
}

//reducer

//最初的状态是"Hello"
function myApp(state = {
    text: 'Hello'
}, action) {
    switch (action.type) {
        case 'CHANGE_TEXT':
            return {
                text: state.text == 'Hello' ? 'Stark' : 'Hello'
            }
        case 'BUTTON_CLICK':
            return {
                text: 'You just click button'
            }
        default:
            return {
                text: 'Hello'
            }
    }
}

let store = createStore(myApp);

//Hello
class Hello extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.actions.changeText();
    }
    render() {
        return (
            <h1 onClick={this.handleClick}> {this.props.text} </h1>
        );
    }
}
//Change
class Change extends React.Component {
    constructor(props) {
        super(props);
        this.handleClick = this.handleClick.bind(this);
    }
    handleClick() {
        this.props.actions.buttonClick();
    }

    render() {
        return (
            <button onClick={this.handleClick} >change</button>
        );
    }
}

//App
class App extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        //actions和text这两个props在第5步中会解释
        const { actions, text} = this.props;
        return (
            <div>
                <Hello actions={actions} text={text}/>
                <Change actions={actions}/>
            </div>
        );
    }
}

//5、连接React组件和Redux
//mapStateToProps的作用是声明，当state树变化的时候，哪些属性是我们关心的？
//由于我们这个应用太小，只有一个属性，所以只有text这个字段。
function mapStateToProps(state) {
    return { text: state.text }
}

//mapDispatchToProps的作用是把store中的dispatch方法注入给组件
function mapDispatchToProps(dispatch) {
    return {
        actions: bindActionCreators({
            changeText: changeText,
            buttonClick: buttonClick
        }, dispatch)
    }
}

//这里实际上给了App两个props：text和actions，即第4步中的那段注释
App = connect(mapStateToProps, mapDispatchToProps)(App)

//Provider是react-redux直接提供的
//store是我们在第3步中生成的

render(
    <Provider store={store}>
        <App />
    </Provider>,
    document.getElementById('root')
)*/