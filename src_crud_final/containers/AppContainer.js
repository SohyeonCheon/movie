import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import App from '../components/App';
import * as crudActions from '../store/modules/crud';

class AppContainer extends Component {
    render () {
        const {mode, maxId, selectedId, subject, welcome, contents }  = this.props;
        return(
            <App
                mode={mode}
                maxId={maxId}
                selectedId={selectedId}
                subject={subject}
                welcome={welcome}
                contents={contents}
            />
        );
    }
}

const mapStateToProps = ( {crud} ) => {
    return{
    mode: crud.mode,
    maxId: crud.maxId,
    selectedId: crud.selectedId,
    subject: crud.subject,
    welcome: crud.welcome,
    contents: crud.contents
}
};

const mapDispatchToProps = dispatch => ({
    CrudActions : bindActionCreators(crudActions,dispatch)
});
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AppContainer);
