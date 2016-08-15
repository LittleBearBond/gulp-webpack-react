import { combineReducers } from 'redux'
import todos from './todos'
import visibilityFilter from './visibilityFilter'

//当项目中存在越来越多的 action.type 时，上面的 films 函数（ Reducer ）将变得越来越大，越来越多的 case 将导致代码不够清晰。所以在代码组织上，通常会将 Reducer 拆分成一个个小的 reducer，
//每个 reducer 分别处理 state 中的一部分数据，最终将处理后的数据合并成为整个 state。
const todoApp = combineReducers({
  todos,
  visibilityFilter
});

//上面的写法和下面完全等价：
/*export default function todoApp(state = {}, action) {
  return {
    visibilityFilter: visibilityFilter(state.visibilityFilter, action),
    todos: todos(state.todos, action)
  }
}*/

export default todoApp
