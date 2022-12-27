import React from "react";

export const TodoItem = ({ id, onComplete, complete, title, onDelete }) => {
  const handleDelete = () => {
    onDelete(id);
  };

  const handleChange = () => {
    onComplete(id);
  };

  const renderCheckbox = () => {
    return (
      <div className="col-2 todo-item__checkbox">
        <input
          type="checkbox"
          className="form-control"
          data-testid={id}
          onChange={handleChange}
          checked={complete || false}
        />
      </div>
    );
  };

  const renderTitle = () => (
    <div className="col-8 todo-item__title">
      <h3>{title}</h3>
    </div>
  );

  const renderDeleteButton = () => (
    <div className="col-2 todo-item__title">
      <button
        className="btn btn-primary"
        data-testid={`delete-${id}`}
        onClick={handleDelete}
      >
        Delete
      </button>
    </div>
  );

  return (
    <li className="list-group-item todo-item">
      <div className="row">
        {renderCheckbox()}
        {renderTitle()}
        {renderDeleteButton()}
      </div>
    </li>
  );
};
