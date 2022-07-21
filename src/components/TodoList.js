import React from 'react';
import TodoListItem from './TodoListItem';
import './TodoList.scss';

// todos라는 인자를 받는 TodoList
// 
const TodoList = ({ todos, onRemove, onToggle }) => {
  return (
    <div className="TodoList">
      {todos.map(todo => (
        <TodoListItem todo={todo} key={todo.id} onRemove={onRemove} onToggle={onToggle} />
      ))}
    </div>
  );
};

export default TodoList;