import { createSelector } from "@reduxjs/toolkit";

export const getTodos = (state) => state.todos.data;
export const getTodosLoading = (state) => state.todos.isLoading;

export const getIncompleteTodos = createSelector(getTodos, (todos) => {
  return todos.filter((todo) => !todo.isCompleted);
});

export const getCompletedTodos = createSelector(getTodos, (todos) => {
  return todos.filter((todo) => todo.isCompleted);
});
