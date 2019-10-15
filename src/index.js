import React from "react";
import ReactDOM from "react-dom";
// createStore 와 루트 리듀서 불러오기
import { createStore } from "redux";
import rootReducer from "./store/modules";
import { Provider } from "react-redux";

import "./index.css";
import App from "./App";
import registerServiceWorker from "./registerServiceWorker";

// 리덕스 개발자도구 적용
const devTools =
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__();
const store = createStore(rootReducer, devTools);

//리액트 프로젝트에 스토어를 연동 할 때에는 react-redux 라이브러리 안에 들어있는 Provider 라는 컴포넌트를 사용합니다. 
ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);
registerServiceWorker();
