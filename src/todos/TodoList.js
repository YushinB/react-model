import React, { useEffect } from "react";
import NewTodoForm from "./NewTodoForm";
import TodoListItem from "./TodoListItem";
import { connect } from "react-redux";
import styled from "styled-components";
import {
  loadTodos,
  removeTodoRequest,
  markAtCompletedTodoRequest,
} from "./thunks";
import {
  getTodosLoading,
  getCompletedTodos,
  getIncompleteTodos,
} from "./selectors";

const ListWrapper = styled.div`
  max-width: 700px;
  margin: auto;
`;

const TodoList = ({
  completedTodos,
  inCompleteTodo,
  onRemovePressed,
  onMarkCompletedPressed,
  isLoading,
  startLoadingTodos,
}) => {
  useEffect(() => {
    startLoadingTodos();
  }, []);

  const loadingMessage = <div>Loading todos...</div>;
  const content = (
    <ListWrapper>
      <NewTodoForm />
      <h3>InComplete:</h3>
      {inCompleteTodo?.map((todo, key) => (
        <TodoListItem
          key={key}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onMarkCompletedPressed={onMarkCompletedPressed}
        />
      ))}
      <h3>Completed:</h3>
      {completedTodos?.map((todo, key) => (
        <TodoListItem
          key={key}
          todo={todo}
          onRemovePressed={onRemovePressed}
          onMarkCompletedPressed={onMarkCompletedPressed}
        />
      ))}
    </ListWrapper>
  );
  return isLoading ? loadingMessage : content;
};

const mapStateToProps = (state) => {
  return {
    completedTodos: getCompletedTodos(state),
    inCompleteTodo: getIncompleteTodos(state),
    isLoading: getTodosLoading(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    onRemovePressed: (id) => dispatch(removeTodoRequest(id)),
    onMarkCompletedPressed: (id) => dispatch(markAtCompletedTodoRequest(id)),
    startLoadingTodos: () => dispatch(loadTodos()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(TodoList);
