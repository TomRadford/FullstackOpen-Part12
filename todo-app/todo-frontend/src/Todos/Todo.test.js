/* eslint-disable testing-library/no-node-access */
import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import userEvent from "@testing-library/user-event";
import Todo from "./Todo";

describe("<Todo />", () => {
  let container, todo, mockHandler;

  beforeEach(() => {
    todo = {
      text: "This is a note",
      done: false,
    };
    mockHandler = jest.fn();
  });

  test("Component renders with note", () => {
    container = render(
      <Todo deleteTodo={mockHandler} completeTodo={mockHandler} todo={todo}/>
    ).container;
    const element = container.querySelector("span").innerHTML;
    expect(element).toContain(todo.text);
  });
  test('Component displays correct completion message', () => {
	container = render(
		<Todo deleteTodo={mockHandler} completeTodo={mockHandler} todo={todo}/>
	  ).container;
	  const element = container.querySelector("#text").innerHTML;
	  expect(element).toContain(`This is a note`)
  })
});
