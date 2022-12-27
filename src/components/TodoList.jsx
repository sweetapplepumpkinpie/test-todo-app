import React from "react";

import { TodoItem } from "./TodoItem";

export const TodoList = ({ todos, ...props }) => {
  const renderTodos = () =>
    todos.map((todo, index) => (
      <TodoItem key={index} id={index} {...todo} {...props} />
    ));

  return <ul className="list-group todo-list">{renderTodos()}</ul>;
};
