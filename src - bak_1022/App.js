import React, { Component } from "react";
import TOC from "./components/TOC_2";
import ReadContent from "./components/ReadContent";
import Form from "./components/Form";
import Subject from "./components/Subject";
import Control from "./components/Control";

class App extends Component {
  constructor(props) {
    super(props);
    this.max_content_id = 3;
    this.state = {
      mode: "welcome",
      selected_content_id:null,
      subject: { title: "WEB wow", sub: "World Wide Web!" },
      welcome: { title: "welcome", desc: "Hello, React!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "CSS", desc: "CSS is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" }
      ]
    };
  }
  
  getReadContent() {
    const { contents, selected_content_id } = this.state;
    let content = contents.filter(data => data.id === selected_content_id );
    return content[0];
  }

  handleCreate = data => {
    const { contents } = this.state;
    this.setState({
      contents: contents.concat({id: ++this.max_content_id, ...data}),
      selected_content_id: this.max_content_id,
      mode: "read",
    });
    
  };

  handleUpdate = data => {
    const { contents } = this.state;
    this.setState({
      contents: contents.map(
        item => item.id === data.id
            ? { ...item, ...data }
            : item
    ),
      mode: "read"
    });
  };

  handleRemove = () => {
    console.log('handleRemove');
    const { contents, selected_content_id } = this.state;
    this.setState({
      mode: "welcome",
      contents: contents.filter(item => item.id !== selected_content_id? item : false)
    })
  };

  getContent() {
    let _title,
      _desc,
      _article,
      _content = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;

    } else if (this.state.mode === "read") {
      _content = this.getReadContent();
      _article = <ReadContent title={_content.title} desc={_content.desc} />;

    } else if (this.state.mode === "create") {
      _article = <Form mode="create" onSubmit={this.handleCreate} />;

    } else if (this.state.mode === "update") {
      _content = this.getReadContent();
      _article = (
        <Form mode="update" data={_content} onSubmit={this.handleUpdate} />
      );
    }
    return _article;
  }

  render() {
    return (
      <div>
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={() => {
            this.setState({ mode: "welcome" });
          }}
        />
        <TOC
          onChangePage={id => {
            this.setState({
              mode: "read",
              selected_content_id: Number(id)
            });
          }}
          data={this.state.contents}
        />

        <Control
          onChangeMode={_mode => {
            if (_mode === "delete") {
              if (window.confirm("really?")) {
                this.handleRemove();
                alert("deleted!");
              }
            } else {
              this.setState({
                mode: _mode
              });
            }
          }}
        />
        {this.getContent()}
      </div>
    );
  }
}

export default App;
