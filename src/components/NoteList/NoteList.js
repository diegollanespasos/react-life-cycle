import React from 'react';
import Note from '../Note/Note';
import './NoteList.css';

const NoteList = ({ notes, listTitle, category, isLoading, updateNotes }) => {
    if (isLoading) {
      return <p>Loading...</p>;
    }
    if (!isLoading) {
      return (
        <React.Fragment>
          <div className='note-list'>
            <div className={`header color${category}`}>
              <h2>{listTitle}</h2>
            </div>
          {
            notes.filter(note => note.category === category).map(note => 
              <Note
              key={note.id}
              id={note.id} 
              title={note.title} 
              message={note.message} 
              date={note.date}
              updateNotes={updateNotes}
              />)
          }   
          </div>
        </React.Fragment>
      );
    }
  };

  export default NoteList;