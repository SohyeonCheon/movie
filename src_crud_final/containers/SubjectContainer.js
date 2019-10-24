import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as crudActions from '../store/modules/crud';
import Subject from '../components/Subject';

class SubjectContainer extends Component {
    onChangeMode = (mode) => {
        const { CrudActions } = this.props;
        CrudActions.onChangeMode(mode);
    }
    render () {
        const { mode, subject, selectedId } = this.props;
        return(
            <>
                <Subject
                    mode = {mode}
                    subject = {subject}
                    onChangeMode = {this.onChangeMode}
                    selectedId = {selectedId}
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
)(SubjectContainer);
