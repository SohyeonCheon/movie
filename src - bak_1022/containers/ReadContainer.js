import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as crudActions from '../store/modules/crud';
import Read from '../components/Read';

class ReadContainer extends Component {
    render () {
        const { mode, welcome, contents, selectedId } = this.props;
        console.log('contents: '+contents);
        return(
            <>
                <Read
                    mode = {mode}
                    welcome = {welcome}
                    contents = {contents}
                    selectedId = {selectedId}
                />
            </>
        );
    }
}


const mapStateToProps = ( {crud} ) => {
    return{
    mode: crud.mode,
    welcome: crud.welcome,
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
)(ReadContainer);
