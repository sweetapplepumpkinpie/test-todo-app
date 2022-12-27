import React, { useEffect, useState } from "react";

import { TodoList } from "./components/TodoList";

export const App = () => {
  const [state, setState] = useState({ todos: [], title: "" });

  useEffect(() => {
    const todos = localStorage.getItem("et-todos");

    if (!todos) {
      return;
    }

    setState({
      todos: JSON.parse(todos),
    });
  }, []);

  useEffect(() => {
    localStorage.setItem("et-todos", JSON.stringify(state.todos));
  }, [state.todos]);

  const _onCompleteTodo = (id) => {
    const { todos } = state;

    todos[id].complete = !todos[id].complete;
    setState({
      ...state,
      todos: [...todos],
    });
  };

  const _onChangeTitle = ({ target: { value } }) => {
    setState({
      ...state,
      title: value,
    });
  };

  const _onEnterPressAdd = (event) => {
    if (13 === event.keyCode) {
      _onClickAdd();
    }
  };

  const _onClickAdd = () => {
    const { title, todos } = state;

    todos.push({
      title,
      complete: false,
    });

    setState({
      title: "",
      todos: [...todos],
    });
  };

  const _onDeleteTodo = (id) => {
    setState({
      ...state,
      todos: [...state.todos.filter((todo, index) => index !== id)],
    });
  };

  const _renderHeader = () => {
    const { title } = state;

    return (
      <div className="todos-app-header card-header">
        <h2>ToDo</h2>
        <div className="input-group">
          <input
            type="text"
            name="title"
            placeholder="What do you need to do?"
            className="form-control add-new-todo"
            onChange={_onChangeTitle}
            onKeyDown={_onEnterPressAdd}
            value={title || ""}
          />
          <div className="input-group-append">
            <button
              className="btn btn-success"
              type="button"
              onClick={_onClickAdd}
            >
              <span
                className=""
                style={{
                  fontSize: "24px",
                  lineHeight: "16px",
                }}
              >
                +
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col col-md-6 offset-md-3 mt-2">
          <div className="todos-app card">
            {_renderHeader()}
            <div className="card-body">
              <TodoList
                todos={state.todos}
                onComplete={_onCompleteTodo}
                onDelete={_onDeleteTodo}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
