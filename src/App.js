import React, { Component } from "react";

import { TodoList } from "./components/TodoList";

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      title: "",
      todos: [],
    };

    this._onChangeTitle = this._onChangeTitle.bind(this);
    this._onClickAdd = this._onClickAdd.bind(this);
    this._onEnterPressAdd = this._onEnterPressAdd.bind(this);
    this._onCompleteTodo = this._onCompleteTodo.bind(this);
  }

  componentDidMount() {
    const todos = localStorage.getItem("et-todos");

    if (!todos) {
      return;
    }

    this.setState({
      todos: JSON.parse(todos),
    });
  }

  componentDidUpdate() {
    localStorage.setItem("et-todos", JSON.stringify(this.state.todos));
  }

  _onCompleteTodo(id) {
    const { todos } = this.state;

    todos[id].complete = !todos[id].complete;

    this.setState({
      todos,
    });
  }

  _onChangeTitle(event) {
    const target = event.target;
    const value = target.value;

    this.setState({
      title: value,
    });
  }

  _onEnterPressAdd(event) {
    if (13 === event.keyCode) {
      this._onClickAdd();
    }
  }

  _onClickAdd(event) {
    const { title, todos } = this.state;

    todos.push({
      title,
      compete: false,
    });

    this.setState({
      title: "",
      todos,
    });
  }

  _renderHeader() {
    const { title } = this.state;

    return (
      <div className="todos-app-header card-header">
        <h2>ToDo</h2>
        <div className="input-group">
          <input
            type="text"
            name="title"
            placeholder="What do you need to do?"
            className="form-control add-new-todo"
            onChange={this._onChangeTitle}
            onKeyDown={this._onEnterPressAdd}
            value={title}
          />
          <div className="input-group-append">
            <button
              className="btn btn-success"
              type="button"
              onClick={this._onClickAdd}
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
  }

  render() {
    const { todos } = this.state;

    return (
      <div className="container">
        <div className="row">
          <div className="col col-md-6 offset-md-3 mt-2">
            <div className="todos-app card">
              {this._renderHeader()}
              <div className="card-body">
                <TodoList
                  todos={todos}
                  onComplete={this._onCompleteTodo}
                  onDelete={this._onDeleteTodo}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
