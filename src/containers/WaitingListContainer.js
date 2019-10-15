import React, { Component } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as waitingActions from "../store/modules/waiting";
import WaitingList from "../components/WaitingList";

class WaitingListContainer extends Component {
  // 인풋 변경 이벤트
  handleChange = e => {
    e.preventDefault();
    this.setState({
      [e.target.name] : e.target.value
    });
    //{title : "sdfsdf", desc : "sdfsdf"}
    
    //const { WaitingActions } = this.props;
    //WaitingActions.changeInput(e.target.value);
  };
  // 등록 이벤트
  handleSubmit = e => {
    e.preventDefault();
    const { WaitingActions } = this.props;
    WaitingActions.create(this.state); // 등록 this.state에 내가 저장한 setState값이 들어오는 거야. create함수에 파라미터로 this.state값을 주는거야.
    WaitingActions.changeInput(""); // 인풋 값 초기화
  };
  // 입장
  handleEnter = id => {
    const { WaitingActions } = this.props;
    WaitingActions.enter(id);
  };
  // 나가기
  handleLeave = id => {
    const { WaitingActions } = this.props;
    WaitingActions.leave(id);
  };
  render() {
    const { input, textarea, list } = this.props;
    return (
      <WaitingList
        input={input}
        textarea={textarea}
        waitingList={list}
        onChange={this.handleChange}
        onSubmit={this.handleSubmit}
        onEnter={this.handleEnter}
        onLeave={this.handleLeave}
      />
    );
  }
}

const mapStateToProps = ({ waiting }) => ({
  input: waiting.input,
  textarea: waiting.textarea,
  list: waiting.list
});

// 이런 구조로 하면 나중에 다양한 리덕스 모듈을 적용해야 하는 상황에서 유용합니다.
const mapDispatchToProps = dispatch => ({
  WaitingActions: bindActionCreators(waitingActions, dispatch)
  // AnotherActions: bindActionCreators(anotherActions, dispatch)
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WaitingListContainer);
