import { createAction, handleActions } from "redux-actions";

const CHANGE_INPUT = "waiting/CHANGE_INPUT"; // 인풋 값 변경
//const CHANGE_TEXTAREA = "waiting/CHANGE_TEXTAREA"; // 인풋 값 변경
const CREATE = "waiting/CREATE"; // 명단에 이름 추가
const ENTER = "waiting/ENTER"; // 입장
const LEAVE = "waiting/LEAVE"; // 나감
const UPDATE = "waiting/UPDATE"; // 나감

// **** FSA 규칙(읽기 쉽고, 유용하고, 간단한 액션 객체를 만들기 위해서 만들어졌)을 따르는 액션 생성 함수 정의
// export const changeInput = text => ({ type: CHANGE_INPUT, payload: text });
// export const create = text => ({ type: CREATE, payload: text });
// export const enter = id => ({ type: ENTER, payload: id });
// export const leave = id => ({ type: LEAVE, payload: id });

let id = 3;
// createAction 으로 액션 생성함수 정의 - 가독성 better
export const changeInput = createAction(CHANGE_INPUT, text => text);
export const create = createAction(CREATE, text => ({ ...text, id: id++ }));
export const enter = createAction(ENTER, id => id);
export const leave = createAction(LEAVE, id => id);
export const update = createAction(UPDATE, text => ({ ...text, id: id++ }));

//위에서 액션생성함수로 create함수생성. 받아오는 text란 파라미터에는 내가 setState에서 저장한 title과 desc가 들어오는거야 so, ...text로 풀어주는거지.

// **** 초기 상태 정의
const initialState = {
  //input, textareasms 컴포넌트에서 state로 저장해두니까 리듀서에서 굳이 저장해둘 필요 x
  // input: "",
  // textarea: "",
  mode: "welcome",
  selected_content_id:null,
  subject: { title: "WEB wow", sub: "World Wide Web!" },
  welcome: { title: "welcome", desc: "Hello, React!" },
  list: [
    {
      id: 0,
      name: "HTML",
      desc: "HTML is for information",
      entered: true
    },
    {
      id: 1,
      name: "CSS",
      desc: "CSS is for design",
      entered: false
    },
    {
      id: 2,
      name: "Redux",
      desc: "Redux is for ...",
      entered: false
    }
  ]
};

// **** handleActions 로 리듀서 함수 작성
//handleActions 를 사용하면, 더이상 switch / case 문을 사용 할 필요가 없이
//각 액션 타입마다 업데이터 함수를 구현하는 방식으로 할 수 있어서 가독성이 더 좋아집니다.

export default handleActions(
  {
    //CHANGE_INPUT은 내가 컴포넌트에서 setState로 값을 저장했으니 굳이 리듀서에서까지 값을 저장할 필요가 없는거야 그래서 삭제.
    // [CHANGE_INPUT]: (state, action) => ({
    //   ...state,
    //   input: action.payload,
    //   textarea: action.payload
    // }),
    [CREATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.title,
        desc: action.payload.desc,
        entered: false
      })
    }),
    [ENTER]: (state, action) => ({
      ...state,
      list: state.list.map(item =>
        item.id === action.payload ? { ...item, entered: !item.entered } : item
      )
    }),
    [LEAVE]: (state, action) => ({
      ...state,
      list: state.list.filter(item => item.id !== action.payload)
    }),
    [UPDATE]: (state, action) => ({
      ...state,
      list: state.list.concat({
        id: action.payload.id,
        name: action.payload.title,
        desc: action.payload.desc,
        entered: false
      })
    })
  },
  initialState
);
