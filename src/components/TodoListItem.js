import React from 'react';
import {
  MdCheckBoxOutlineBlank,
  MdOutlineCheckBox,
  MdRemoveCircleOutline,
} from 'react-icons/md';
import cn from 'classnames';
import './TodoListItem.scss';
import TodoList from './TodoList';

// todo를 인자로 받고 todo의text와 checked 정보를 저장한다.
const TodoListItem = ({ todo, onRemove, onToggle, style }) => {
  const { id, text, checked } = todo;

  // className = 'checkbox'인 div는 checked 인자를 받고
  // checked 에 저장된 bool 값 비교
  // true -> checkbox 스타일 적용, false -> checkbox 스타일 미적용
  return (
    <div className="TodoListItem-virtualized" style={style}>
      <div className="TodoListItem">
        <div
          className={cn('checkbox', { checked })}
          onClick={() => onToggle(id)}
        >
          {checked ? <MdOutlineCheckBox /> : <MdCheckBoxOutlineBlank />}
          <div className="text">{text}</div>
        </div>
        <div className="remove" onClick={() => onRemove(id)}>
          <MdRemoveCircleOutline />
        </div>
      </div>
    </div>
  );
};

// export default TodoListItem;
export default React.memo(TodoListItem);
