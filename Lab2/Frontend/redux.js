import { createStore  } from 'redux';

initState = {
    todos: [],
    posts: []
}

function reducer(state = initState, action) {
    console.log(state, action);
}

const store = createStore(reducer)

const todoAction = {type: ADD_TODOS, todo: 'attend seminar'}

store.dispatch(todoAction)