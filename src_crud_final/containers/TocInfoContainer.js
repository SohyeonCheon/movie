import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as crudActions from '../store/modules/crud';
import TocInfo from '../components/TocInfo';

class TocInfoContainer extends Component {
    shouldComponentUpdate(newProps, newState) { 
        if(this.props.contents === newProps.contents) {
            return false;
        }
        return true; 
    }

    onChangeMode = (mode) =>{
        const { CrudActions } = this.props;
        CrudActions.onChangeMode(mode)
    }
    onSelect = (id) => {
        const { CrudActions } = this.props;
        CrudActions.onSelect(id);
    }
    render () {
        const { mode, selectedId, contents }  = this.props;

        const lists = contents.map(
            (content) => (
                <TocInfo 
                key = {content.id}
                contents = {content}
                selectedId = {selectedId}
                mode = {mode}
                onChangeMode = {this.onChangeMode}
                onSelect = {this.onSelect}
                />
            )
            );
            return (
            <nav>
                <ul>{lists}</ul>
            </nav>
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
)(TocInfoContainer);
