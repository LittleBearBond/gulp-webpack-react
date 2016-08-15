##Redux 主要分为三个部分 Action、Reducer、及 Store

##Action

 在 Redux 中，action 主要用来传递操作 State 的信息


##Reducer

有了 Action 来传达需要操作的信息，那么就需要有根据这个信息来做对应操作的方法，这就是 Reducer。 Reducer 一般为简单的处理函数，通过传入旧的 state 和指示操作的 action 来更新 state