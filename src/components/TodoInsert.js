import React, { useState, useCallback } from 'react';
import { MdAdd } from 'react-icons/md';
// import { 아이콘 이름 } from ‘react-icons/md‘;
import './TodoInsert.scss';

const TodoInsert = ({ onInsert }) => {
  const[value,setValue] = useState('');

  const onChange = useCallback(e => {
    setValue(e.target.value);
    console.log(e.target.value);
  }, []);

  // onsubmit 대신 onclick 이벤트로 만들어도 됨.
  // onsubmit을 사용한 이유는 onclick에서 enter를 구현하기 위해 onkeypress를 만들어야 하지만
  // onsubmit은 따로 구현할 필요가 없기 때문이다. form과 onsubmit을 사용하면 자동으로 엔터로 버튼이 눌려지는 기능이 구현된다.
  const onSubmit = useCallback( e => {
    onInsert(value);
    setValue('');
    // submit 이벤트는 브라우저를 새로고침 시킨다.
    // 이를 방지하기 위한 함수 호출
    e.preventDefault();
  }, [onInsert, value],);

  const onClicklog = () => {
    console.log("입력된 값: " + {value});
  };
  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input placeholder="할 일을 입력하세요"
      value={value}
      onChange={onChange}/>
      <button type="submit" onClick={onClicklog}>
        <MdAdd/>
      </button>
    </form>
  );
};

export default TodoInsert;