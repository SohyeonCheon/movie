import { createAction, handleActions } from "redux-actions"; // redux-actions 호출

// 기존의 actions폴더안에 있던 ActionTypes과 액션생성자를 이곳에 통합
//Ducks구조 = Reducer 파일 안에 액션타입과 액션생성자 함수를 함께 넣어서 관리하고 이를 '모듈'이라고 부른다.


// action의 type을 상수로 선언
const ON_CHANEGE_MODE = "crud/ON_CHANEGE_MODE";  // 앞의 접두사를 붙여서 다른 리듀서에서의 중복된 액션타입과 충돌방지
const ON_SELECT = "crud/ON_SELECT";
const ON_CREATE = "crud/ON_CREATE";
const ON_UPDATE = "crud/ON_UPDATE";
const ON_DELETE = "crud/ON_DELETE";


// action 생성자 만들기
// 만든 type을 가진 액션 객체를 만들어 주는 액션 생성자
export const onChangeMode = createAction(ON_CHANEGE_MODE, mode => mode);
export const onSelect = createAction(ON_SELECT, idx => idx);
export const onCreate = createAction(ON_CREATE, createData => createData);
export const onUpdate = createAction(ON_UPDATE, updateData => updateData);
export const onDelete = createAction(ON_DELETE);
// createAction 이라는 redux-actions 의 함수를 사용한다. 
// FSA규칙을 따르는 액션 객체를 만들어 주는데 FSA규칙은 읽기쉽고, 유용하고 간단하다.
// FSA 의 필수 조건은 순수 자바스크립트 객체여야 하고, type값이 있어야 한다는 것
// 선택 사항은 error값, payload, meta의 유무 
// 첫번째 인자는 액션타입
// 두번째 인자는 payloadCreator,  payload를 어떻게 정할 지 설정하는 것.
// payload 란 액션에서 사용할 파라미터의 필드명을 payload로 통일 시킨 것.

// export const onChangeMode = (mode) => ({
//     type: types.ON_CHANEGE_MODE,
//     mode
// });
// 이 형태를  export const onChangeMode = createAction(ON_CHANEGE_MODE, mode => mode); 이렇게 줄여서 쓸 수 있다.
// 액션에서 사용할 파라미터를 받을 수 있다. 나중에 action.payload.mode 형태로 가져올수 있다.
// payload => payload 가 기본값이라 생략도 가능하지만 함수가 어떤 파라미터를 받아야 하는지 몰라서 가독성이 떨어진다.


// 초기 state 정의 
const initialState = {
    maxId : 3,
    selectId : 0 ,
    mode: 'welcome',    
    welcome: {title:'welcome', desc:'Hello React'},
    subject: { title:'WEB', sub:'World Wide Web' },
    contents: [
        {id:0, title:'HTML', desc:'HTML is for information'},
        {id:1, title:'CSS', desc:'CSS is for design'},
        {id:2, title:'JAVA SCRIPT', desc:'JAVA SCRIPT is fo interactive'}
    ]
};

// 리듀서 정의
export default handleActions({
    // 액션타입에 접두사가 있으면 [], 없으면 생략가능
    // redux-actions를 사용하면서 switch문을 사용하지 않아도 된다.
    [ON_CHANEGE_MODE]: (state, action) => ({
        ...state,
        mode: action.payload 
    }),
    [ON_SELECT]: (state, action) => ({
        ...state,
        selectId: action.payload
    }), 
    [ON_CREATE]: (state, action) => ({
        ...state,
        contents : state.contents.concat({ 
            id: state.maxId++, ...action.payload}),
        selectId : state.maxId-1,
        mode : "read"
    }),
    [ON_UPDATE]: (state, action) => ({
        ...state,
        contents : state.contents.map(
            content => content.id === state.selectId
                ? { ...content, ...action.payload }
                : content
        ),
        mode : "read"
    }),
    [ON_DELETE]: (state) => ({
        ...state,
        contents : state.contents.filter(
            content => content.id !== state.selectId
        ),
        mode : "welcome"
    })
}, initialState); // initialState를 리듀서의 state로 사용한다.