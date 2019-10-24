import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as crudActions from '../store/modules/crud';
import Control from '../components/Control';

class ControlContainer extends Component {
    onChangeMode = (mode) => {
        const { CrudActions } = this.props;
        CrudActions.onChangeMode(mode);
    }
    onDelete = (id) => {
        const { CrudActions } = this.props;
        CrudActions.onDelete(id);
    }
    render () {
        const { mode, subject, selectedId } = this.props;
        return(
            <>
                <Control
                    mode = {mode}
                    subject = {subject}
                    selectedId = {selectedId}
                    onDelete = {this.onDelete}
                    onChangeMode = {this.onChangeMode}
                />
            </>
        );
    }
}


const mapStateToProps = ( {crud} ) => {
    return{
    mode: crud.mode,
    subject: crud.subject,
    selectedId: crud.selectedId,
    onChangeMode: crud.onChangeMode
}
};

const mapDispatchToProps = dispatch => ({
    CrudActions : bindActionCreators(crudActions,dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(ControlContainer);
