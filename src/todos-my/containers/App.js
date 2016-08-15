import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { addTodo, completeTodo, removeTodo, editTodo, saveTodo, setVisibilityFilter, SET_VISIBILITY_FILTER, VisibilityFilters } from '../actions'
import AddTodo from '../components/AddTodo'
import TodoList from '../components/TodoList'
import { combineReducers } from 'redux'
// import Footer from '../components/Footer'

const {SHOW_ALL } = VisibilityFilters;

class App extends Component {
    render() {
        const {dispatch, todos, visibilityFilter} = this.props;
        console.log(this.props);
        return (
            <div>
                <AddTodo
                    onAddClick={text =>
                        dispatch(addTodo(text))
                    } />
                <TodoList
                    todos={todos}
                    onTodoClick={
                        id => dispatch(completeTodo(id))
                    }
                    onRemove={
                        id => dispatch(removeTodo(id))
                    }
                    onDoubleClick={
                        id => dispatch(editTodo(id))
                    }
                    onSaveEdit={
                        (id, text) => dispatch(saveTodo(id, text))
                    }
                    />
            </div>

        )
    }
}

App.propTypes = {
    todos: PropTypes.arrayOf(PropTypes.shape({
        text: PropTypes.string.isRequired,
        completed: PropTypes.bool.isRequired,
        isEdit: PropTypes.bool.isRequired,
        id: PropTypes.number.isRequired,
    }).isRequired).isRequired,
    visibilityFilter: PropTypes.oneOf(Object.keys(VisibilityFilters)).isRequired
}

function selectTodos(todos, filter) {
    switch (filter) {
        case VisibilityFilters.SHOW_ALL:
            return todos
        case VisibilityFilters.SHOW_COMPLETED:
            return todos.filter(todo => todo.completed)
        case VisibilityFilters.SHOW_ACTIVE:
            return todos.filter(todo => !todo.completed)
    }
}

let visibleTodos = (state) => {
    return {
        todos: selectTodos(state.todos, state.visibilityFilter),
        visibilityFilter: state.visibilityFilter
    }
}

// 包装 component ，注入 dispatch 和 state 到其默认的 connect(select)(App) 中；
export default connect(visibleTodos)(App)