import React from "react";
import "./WaitingList.css";

const WaitingItem = ({ title, desc, entered, onEnter, onLeave }) => {
  return (
    <li>
      <div className={`title ${entered ? "entered" : ""}`}>{title}</div>
      <div className={`desc ${entered ? "entered" : ""}`}>{desc}</div>
      <div className="buttons">
        <button onClick={onEnter}>Check</button>
        <button onClick={onLeave}>Delete</button>
      </div>
    </li>
  );
};

const ReadItem = ({ title, desc, entered }) => {
  return (
    <li>
      <div className={`title ${entered ? "entered" : ""}`}>{title}</div>
      <div className={`desc ${entered ? "entered" : ""}`}>{desc}</div>
    </li>
  );
};

const WaitingList = ({
  inputTitle, // **** 추가됨
  inputDesc, // **** 추가됨
  waitingList,
  onChange, // **** 추가됨
  onSubmit, // **** 추가됨
  onEnter,
  onLeave
}) => {
  // **** 데이터를 컴포넌트 리스트로 변환
  const waitingItems = waitingList.map(w => (
    <WaitingItem
      key={w.id}
      title={w.name}
      desc={w.desc}
      entered={w.entered}
      id={w.id}
      onEnter={() => onEnter(w.id)}
      onLeave={() => onLeave(w.id)}
    />
  ));
  const readItems = waitingList.map(w => (
    <ReadItem
      key={w.id}
      title={w.name}
      desc={w.desc}
      entered={w.entered}
      id={w.id}
    />
  ));
  return (
    <div className="WaitingList">
      <h2>대기자 명단</h2>
      {/* form 과 input 에 이벤트 및 값 설정 */}
      <form onSubmit={onSubmit}>
        <input name="title" placeholder="title" value={inputTitle} onChange={onChange} />
        <textarea name="desc" placeholder="description" value={inputDesc} onChange={onChange} />
        <button>등록</button>
      </form>
      <ul>{waitingItems}</ul> {/* 하드코딩된것을 컴포넌트 배열로 교체 */}
      <ul>{readItems}</ul>
    </div>
  );
};

export default WaitingList;
