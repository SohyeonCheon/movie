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
            mode : "create",
            title : "",
            desc : ""
        };
        } else { //update
            this.state = {
                mode : "update",
                id : content[0].id,
                title : content[0].title,
                desc : content[0].desc
            }
        }
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if(nextProps.mode !== prevState.mode){
            if(nextProps.mode === "create"){
                return {
                    mode : "create",
                    title : "",
                    desc : ""
                };
            }else{
                const content = nextProps.contents.filter(content => content.id === nextProps.selectedId); 
                return {
                    mode : "update",
                    id : content[0].id,
                    title : content[0].title,
                    desc : content[0].desc
                }
            }
        }
        return null;
    }
        
    handleChange = e => {
        this.setState({
        [e.target.name]: e.target.value
        });
    };
    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state);
        this.props.mode === "create" ?
            this.onCreate({title : this.state.title, desc : this.state.desc}) : this.onUpdate({id: this.state.id, title : this.state.title, desc : this.state.desc})
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
