import { createAction, handleActions } from "redux-actions";

// 액션 타입, 생섬함수 정의
const CHANGE_MODE = "CHANGE_MODE";
const CREATE = "CREATE";
const UPDATE = "UPDATE";
const DELETE = "DELETE";
const SELECT = "SELECT";

export const onChangeMode = createAction(CHANGE_MODE, id => id);
export const onCreate = createAction(CREATE, create => create);
export const onUpdate = createAction(UPDATE, update => update);
export const onDelete = createAction(DELETE);
export const onSelect = createAction(SELECT, id => id);
// **** 초기상태 정의
const initialState = {
    maxId : 3,
    mode: "welcome",
    selectedId:0,
    subject: { title: "WEB wow", sub: "World Wide Web!" },
    welcome: { title: "welcome", desc: "Hello, React!" },
    contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" }
    ]
};

// **** 리듀서 작성
export default handleActions(
    {
        [CHANGE_MODE]: (state, action) => ({
            ...state,
            mode: action.payload,
        }),
        [CREATE]: (state, action) => ({
            ...state,
            contents : state.contents.concat({ 
                id: state.maxId++, ...action.payload}),
            selectedId : state.maxId-1,
            mode : "read"
        }),
        [UPDATE]: (state, action) => ({
            ...state,
            contents: state.contents.map(
                content => content.id === state.selectedId? { ...content, ...action.payload } : content
            //entered: false
            ),
            mode : "read",
            selectedId : state.selectedId
        }),
        [DELETE]: (state) => ({
            ...state,
            contents : state.contents.filter(
                content => content.id !== state.selectedId
            ),
            mode : "welcome"
        }),
        [SELECT]: (state, action) => ({
            ...state,
            selectedId: action.payload
        })
        },
        initialState
);