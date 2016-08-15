const todo = (state, action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return {
        id: action.id,
        text: action.text,
        completed: false
      }
    case 'TOGGLE_TODO':
      if (state.id !== action.id) {
        return state
      }

      return Object.assign({}, state, {
        completed: !state.completed
      })
    default:
      return state
  }
}

//根据传入的 action.type 来匹配 case 进行不同的 state 更新
//当项目中存在越来越多的 action.type 时，上面的 films 函数（ Reducer ）将变得越来越大，越来越多的 case 将导致代码不够清晰。所以在代码组织上，通常会将 Reducer 拆分成一个个小的 reducer，每个 reducer 分别处理 state 中的一部分数据，最终将处理后的数据合并成为整个 state。
const todos = (state = [], action) => {
  switch (action.type) {
    case 'ADD_TODO':
      return [
        ...state,
        todo(undefined, action)
      ]
    case 'TOGGLE_TODO':
      return state.map(t =>
        todo(t, action)
      )
    default:
      return state
  }
}

export default todos
