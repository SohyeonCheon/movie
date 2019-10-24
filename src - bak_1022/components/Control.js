import React from 'react';
const Control = ({ selectedId, onChangeMode, onDelete }) => {
    return (
      <ul>
        <li>
          <a
            href="/create"
            onClick={e => {
              e.preventDefault();
              onChangeMode("create");
            }}
          >
            create
          </a>
        </li>
        <li>
          <a
            href="/update"
            onClick={e => {
              e.preventDefault();
              onChangeMode("update");
            }}
          >
            update
          </a>
        </li>
        <li>
          <input
            type="button"
            value="delete"
            onClick={e => {
              e.preventDefault();
              if (window.confirm("really?")) {
                onDelete(selectedId);
                alert("deleted!");  
              }
            }}
          />
        </li>
      </ul>
    );
}
export default Control;
