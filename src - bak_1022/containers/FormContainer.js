import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as crudActions from '../store/modules/crud';

class FormContainer extends Component {
    constructor(props) {
        super(props);
        const { contents, selectedId } = this.props;
        const content = contents.filter(content => content.id === selectedId); 
        console.log('content : '+ content);
        if (this.props.mode === "create") {
        this.state = {
            title : "",
            desc : "",
            selectedId : selectedId
        };
        } else { //update
            this.state = {
                id : content[0].id,
                title : content[0].title,
                desc : content[0].desc
            }
        }
    }
        
    handleChange = e => {
        this.setState({
        [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        this.props.mode === "create" ?
            this.onCreate(this.state) : this.onUpdate(this.state)
    };

    onChangeMode = (mode) => {
        const { CrudActions } = this.props;
        CrudActions.onChangeMode(mode);
    }
    onCreate = (mode) => {
        const { CrudActions } = this.props;
        CrudActions.onCreate(mode);
    }
    onUpdate = (mode) => {
        const { CrudActions } = this.props;
        CrudActions.onUpdate(mode);
    }

    render () {
        const { mode, selectedId } = this.props;
        const { title, desc } = this.state;
        return(
            <article>
                <h2>{mode === "create" ? "CREATE" : "UPDATE"}</h2>
                <form
                    action={mode === "create" ? "/create_process" : "/update_process"}
                    method="post"
                    onSubmit={this.handleSubmit}
                >
                    <input type="hidden" name={selectedId} value={selectedId} />
                    <p>
                        <input
                            type="text"
                            name="title"
                            placeholder="title"
                            value={title}
                            onChange={this.handleChange}
                        />
                    </p>
                    <p>
                        <textarea
                            name="desc"
                            placeholder="description"
                            value={desc}
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
}


const mapStateToProps = ( {crud} ) => {
    return{
    mode: crud.mode,
    selectedId: crud.selectedId,
    contents: crud.contents
}
};

const mapDispatchToProps = dispatch => ({
    CrudActions : bindActionCreators(crudActions,dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FormContainer);
