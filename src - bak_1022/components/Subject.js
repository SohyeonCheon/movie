import React from 'react';
const Subject = ({ subject, onChangeMode }) => {
    return (
        <header>
            <h1> 
                <a href="/" onClick={(e) => {
                    e.preventDefault();
                    onChangeMode('welcome');
                }}>{subject.title}</a>
            </h1>
            {subject.sub}
        </header>
    );
}
export default Subject;