import {
  loadTodoInprogress,
  loadTodoSuccess,
  loadTodoFailure,
  createTodo,
  removeTodo,
  markAsCompleted,
} from "./action";

export const loadTodos = () => async (dispatch, getState) => {
  try {
    dispatch(loadTodoInprogress());

    const response = await fetch("http://localhost:8080/todos");
    const todos = await response.json();
    dispatch(loadTodoSuccess(todos));
  } catch (e) {
    dispatch(loadTodoFailure());
    dispatch(displayAlert(e));
  }
};

export const addTodoRequest = (text) => async (dispatch) => {
  try {
    const body = JSON.stringify({ text });
    const response = await fetch(`http://localhost:8080/todos/`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "post",
      body,
    });

    const todo = await response.json();
    dispatch(createTodo(todo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const removeTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8080/todos/${id}`, {
      method: "delete",
    });
    const removedTodo = await response.json();
    dispatch(removeTodo(removedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const markAtCompletedTodoRequest = (id) => async (dispatch) => {
  try {
    const response = await fetch(
      `http://localhost:8080/todos/${id}/completed`,
      {
        method: "post",
      },
    );
    const completedTodo = await response.json();
    dispatch(markAsCompleted(completedTodo));
  } catch (e) {
    dispatch(displayAlert(e));
  }
};

export const displayAlert = (text) => {
  alert(text);
};
