import React, { Component } from 'react';
import FormContainer from "../containers/FormContainer";
import SubjectContainer from "../containers/SubjectContainer";
import TocInfoContainer from "../containers/TocInfoContainer";
import ReadContainer from "../containers/ReadContainer";
import ControlContainer from "../containers/ControlContainer";

class App extends Component {

    render() {
    const { mode } = this.props;
        return (
            <div>
                <SubjectContainer />
                <TocInfoContainer />
                <ReadContainer />
                {(mode === "create" || mode === "update") && <FormContainer />}
                <ControlContainer />
            </div>
        );
    }

}
export default App;