import React, { Component } from "react";

class Form extends Component {
  constructor(props) {
    super(props);
    //console.log(this.props.mode);
    if (this.props.mode === "update") {
      this.state = {
        id: this.props.data.id,
        title: this.props.data.title,
        desc: this.props.data.desc,
      };
    }
  }
  handleChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };
  handleCreate = e => {
    e.preventDefault();
    this.props.onSubmit(this.state);
  };
  handleUpdate = e => {
    e.preventDefault();
    //console.log('hey here'+this.state);
    this.props.onSubmit(this.state);
  };
  render() {
    if (this.props.mode === "create") {
      return (
        <article>
          <h2>create</h2>
          <form
            action="/create_process"
            method="post"
            onSubmit={this.handleCreate}
          >
            <p>
              <input type="text" name="title" placeholder="title" onChange={this.handleChange}/>
            </p>
            <p>
              <textarea name="desc" placeholder="description"  onChange={this.handleChange}/>
            </p>
            <p>
              <input type="submit" />
            </p>
          </form>
        </article>
      );
    } else if (this.props.mode === "update") {
      return (
        <article>
          <h2>update</h2>
          <form
            action="/update_process"
            method="post"
            onSubmit={this.handleUpdate}
          >
            <input type="hidden" name="id" value={this.state.id} />
            <p>
              <input
                type="text"
                name="title"
                placeholder="title"
                value={this.state.title}
                onChange={this.handleChange}
              />
            </p>
            <p>
              <textarea
                name="desc"
                placeholder="description"
                value={this.state.desc}
                onChange={this.handleChange}
              />
            </p>
            <p>
              <input type="submit" />
            </p>
          </form>
        </article>
      );
    }
    return (
      <article>
        <h2>create? update?</h2>
      </article>
    );
  }
}

export default Form;
