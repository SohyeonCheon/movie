import React, { Component } from 'react';

class TocInfo extends Component{

    render() {
        const { contents, onChangeMode, onSelect } = this.props;
        const { title } = contents;

        return (
            <li>
                <a href="/"
                    onClick={(e)=>{
                        e.preventDefault();
                        onChangeMode('read');
                        onSelect(contents.id);
                    }}>
                {title}</a>
            </li>
        )
    }
}
export default TocInfo;