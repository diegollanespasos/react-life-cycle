import React, { Component } from 'react';
import Note from '../Note/Note';
import './NoteList.css';

class NoteList extends Component{

  shouldComponentUpdate(nextProps, nextState){
    if(nextProps.notes !== this.props.notes){
      return true;
    }
    return false;
  }

  componentDidUpdate(){
    console.log("ComponentDidUpdate for category: ", this.props.category);
  }

  render() {
    const { notes, listTitle, category, isLoading, updateNotes } = this.props;

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
              notes.map(note => 
                <Note
                key={note.id}
                id={note.id} 
                title={note.title} 
                message={note.message} 
                date={note.date}
                category={category}
                updateNotes={updateNotes}
                />)
            }   
            </div>
          </React.Fragment>
        );
      }
  }

}

export default NoteList;