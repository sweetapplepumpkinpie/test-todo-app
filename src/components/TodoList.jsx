import React from "react";

import { TodoItem } from "./TodoItem";

class TodoList extends React.Component {
  _renderTodos() {
    const { todos } = this.props;
    return map(todos, (todo, index) => {
      return <TodoItem key={index} id={index} {...todo} />;
    });
  }

  render() {
    return <ul className="list-group todo-list">{this._renderTodos()}</ul>;
  }
}

export default TodoList;
