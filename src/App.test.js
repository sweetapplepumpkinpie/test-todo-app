import {
  render,
  screen,
  fireEvent,
  getByTestId,
  queryByTestId,
} from "@testing-library/react";
import { App } from "./App";

test("renders todo app", () => {
  render(<App />);
  const title = screen.getByText(/ToDo/i);
  expect(title).toBeInTheDocument();
});

test("adds new todos", () => {
  const { container } = render(<App />);

  const todoText = "say hello to the world";
  fireEvent.change(screen.getByPlaceholderText(/What do you need to do\?/i), {
    target: { value: todoText },
  });

  expect(container.querySelector(".add-new-todo").value).toContain(todoText);

  fireEvent.click(screen.getByText(/\+/i));

  expect(container.querySelector(".todo-list").textContent).toContain(todoText);
  expect(container.querySelector(".add-new-todo").value).not.toContain(
    todoText
  );
});

test("todo completion", () => {
  const { container } = render(<App />);

  const todoText = "say hello to the world";
  fireEvent.change(screen.getByPlaceholderText(/What do you need to do\?/i), {
    target: { value: todoText },
  });

  expect(container.querySelector(".add-new-todo").value).toContain(todoText);

  fireEvent.click(screen.getByText(/\+/i));
  fireEvent.change(screen.getByTestId(0), {
    target: { checked: true },
  });
  setTimeout(() => {
    expect(JSON.parse(localStorage.getItem("et-todos")).todos[0].complete).toBe(
      true
    );
  }, 0);
});

test("todo delete", () => {
  const { container } = render(<App />);

  const todoText = "say hello to the world";
  fireEvent.change(screen.getByPlaceholderText(/What do you need to do\?/i), {
    target: { value: todoText },
  });

  expect(container.querySelector(".add-new-todo").value).toContain(todoText);

  fireEvent.click(screen.getByText(/\+/i));
  fireEvent.click(screen.getByTestId(`delete-0`));
  setTimeout(() => {
    expect(JSON.parse(localStorage.getItem("et-todos")).todos).toBeLessThan(1);
  }, 0);
});
