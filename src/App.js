import React, { useReducer, useState, useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

// todolist 2500개 생성
function createBulkTodos() {
  const array=[];
  for (let i  = 1; i <= 2500; i++){
    array.push({
      id: i,
      text: `할일 ${i}`,
      checked: false,
    });
  }
  return array;
}

function todoReducer(todos, action){
  switch(action.type){
    case 'INSERT':
      return todos.concat(action.todo);
    case 'REMOVE':
      return todos.filter(todo => todo.id !== action.id);
    case 'TOGGLE':
      return todos.map(todo => todo.id === action.id ? {...todo, checked: !todo.checked}: todo);
    default:
      return todos;
  }
}

const App = () => {
  // useState 를 이용한 todos 배열 상태 관리
  // const [todos, setTodos] = useState(createBulkTodos);
  // useReducer 를 이용한 상태 관리
  const [todos, dispatch] = useReducer(todoReducer, undefined, createBulkTodos);
  // 키 값으로 사용될 id ref를 사용하여 변수 담기
  const nextId = useRef(todos.length+1);

  const onInsert = useCallback(
    (text) => {
      const todo = {
        id: nextId.current,
        text,
        checked: false,
      };
      // useState 사용 시
      // setTodos(todos => todos.concat(todo));
      // useReducer 사용 시
      dispatch({ type: 'INSERT', todo});
      nextId.current += 1;
    },
    // useState
    // [todos]
    // useReducer
    []
  );

  const onRemove = useCallback(
    (id) => {
      // useState 사용 시
      // setTodos(todos => todos.filter((todo) => todo.id !== id));
      // useReducer 사용 시
      dispatch({ type: 'REMOVE', id});
    },
    // useState
    // [todos]
    // useReducer
    []
  );

  const onToggle = useCallback(
    (id) => {
      // useState 사용 시
      // setTodos(todos =>
      //   todos.map((todo) =>
      //     todo.id === id ? { ...todo, checked: !todo.checked } : todo,
      //   ),
      // );
      // useReducer 사용 시
      dispatch({ type: 'TOGGLE', id});
    },
    // useState
    // [todos]
    // useReducer
    []
  );

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};

export default App;
// TodoTemplate: 화면을 가운데로 정렬, 앱 타이틀(일정 관리)을 보여줍니다. children으로 내부 JSX를 props로 받아 와서 렌더링 합니다.
// TodoInsert: 새로운 항목을 입력하고 추가할 수 있는 컴포넌트, state를 통해 input상태 관리
// TodoListItem: 각 할 일 항목에 대한 정보를 보여주는 컴포넌트, todo 객체를 props로 받아 와서 상태에 따라 다른 스타일의 UI 보여줌
// TodoList: todos 배열을 props로 받아 온 후, 이를 배열 내장 함수 map을 사용해서 여러 개의 TodoListItem 컴포넌트로 변환하여 보여 줍니다.
