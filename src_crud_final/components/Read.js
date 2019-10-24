import React from 'react';
const Read = ({ mode, welcome, contents, selectedId }) => {
      
    const content = contents.filter(content => content.id === selectedId);
    
    let { title, desc } = contents;    
    {(mode === 'welcome' || mode === 'create') ? { title, desc } = welcome : { title, desc } = content[0] }

      return (
        <article>
            <h2>{title}</h2>
            {desc}
        </article>
      );
}

export default Read;