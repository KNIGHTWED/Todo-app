# 일정 관리 웹 애플리케이션(예제)

### 사용한 기능 및 함수

Hooks: useState, useRef, useCallback

Module: node-sass, classnames, react-icons

---
todo

`<TodoList/>` 부분을 날짜입력 화면으로 바꿔보자!

`<input/>` 부분에 포커싱이 되어있다면 `<TodoList/>` 칸이 날짜 입력 화면으로
포커싱이 안되어있다면 `<TodoList/>` 화면으로

## 성능 최적화

컴포넌트의 수가 많으면 리렌더링 될 때 오래걸린다. 성능이 좋지 않다고 할 수 있다.

만약 1000개의 컴포넌트중 하나의 상태가 바뀌는데 1000개 모두 리렌더링 되면 성능이 떨어지니

1000개 중 1개만 리렌더링 하도록 해야한다.

### React.memo

shouldComponentUpdate 라이프사이클을 사용하면 되지만

함수형 컴포넌트에서는 라이프사이클 메서드를 사용할 수 없다.

그 대신 React.memo를 사용하면 컴포넌트의 성능을 최적화 할 수 있다.

TodoListItem.js
```javascript
// TodoListItem 대신 React.memo(TodoListItem) 을 export 한다.
// export default TodoListItem;
export default React.memo(TodoListItem);
```

todo, onRemove, onToggle이 바뀌지 않으면 리렌더링 하지 않는다.

`TodoList.js` 도 React.memo를 적용시켜준다.

### useState의 함수형 업데이트를 이용한 최적화

```javascript
const [number, setNumber] = useState(0);
// number에 숫자를 1씩 증가시키는 함수다.
const onIcrease = useCallback(() => setNumber(prevNumber + 1), []);
// setNumber에 새로운 상태를 파라미터로 넣는 대신
// 상태 업데이트를 어떻게 할지 업데이트 함수를 넣을 수 있다.
const onIcrease = useCallback(() => setNumber(prevNumber => prevNumber + 1), []);
// prevNumber의 상태가 +1 되니 앞에 prevNumber => 만 넣어주면 된다.
```

위의 코드처럼 App.js의 onInsert, onToggle, onRemove도 수정할 수 있다.


### useReducer를 이용한 최적화

useReducer를 이용하면 생기는 장점은 컴포넌트 밖에서 함수를 관리할 수 있다.

단점은 기존 코드를 많이 고쳐야 한다.

useState의 함수형 업데이트를 사용한 방법과 useReducer를 이용한 방법의 성능향상은 거의 비슷하다.

[App.js](https://github.com/KNIGHTWED/Todo-app/blob/main/src/App.js)에서 확인 가능

### 불변성의 중요성

기존의 값을 직접 수정하지 않으면서 새로운 값을 만들어 내는 것을 '불변성을 지킨다' 라고 한다.

```javascript
const array = [1, 2, 3, 4, 5];

  const nextArrayBad = array; // 배열을 복사하는 것이 아니라 똑같은 배열을 가리킵니다.
  nextArrayBad[0] = 100;
  console.log(array === nextArrayBad); // 완전히 같은 배열이기 때문에 true

  const nextArrayGood = [...array]; // 배열 내부의 값을 모두 복사합니다.
  nextArrayGood[0] = 100;
  console.log(array === nextArrayGood); // 다른 배열이기 때문에 false
  
  // 배열이 아닌 객체에도 적용 된다.
```
### react-virtualized

`$ yarn add react-virtualized`

## 정리

리액트 컴포넌트의 렌더링은 기본적으로 빠르다.
하지만 리스트와 관련된 컴포넌트를 만들 때 리스트가 100개 이상이고 업데이트가 자주 발생한다면, 최적화를 하는 것을 권장한다.








---
<h3>오류(경고)</h3>

>`Unexpected template string expression: no-template-curly-in-string`
>
>위와 같은 Warning이 발생했다면 해당 문자열을 확인해보자.
>
>```javascript
>'I am ${name}'
>// 위와 같이 작성했다면
>`I am ${name}`
>// ' -> ` 로 바꿔보자.
>```

