import React from 'react';
import './Note.css';
import deleteIcon from '../../assets/delete.webp';

const Note = ({ id, title, message, date, updateNotes }) => {

  const deleteNote= async () => {
    try {
      await fetch(`https://www.diegollanes.ml/api/${id}`, { method: 'DELETE' });
      updateNotes();
    } catch(e){
      console.log(e.message);
    }
  }

  const dateFormatted = () => {
    let newDate = new Date(date);
    return (((newDate.getMonth() > 8) ? (newDate.getMonth() + 1) : ('0' + (newDate.getMonth() + 1))) + '/' + ((newDate.getDate() > 9) ? newDate.getDate() : ('0' + newDate.getDate())) + '/' + newDate.getFullYear());
  }

  return (
    <React.Fragment>
      <div className='note'>
        <h3>{title}</h3>
        <p>{message}</p>
        <div id='bottom-section'>
          <button onClick={deleteNote}><img src={deleteIcon} alt='delete' width='30' height='30'/></button>
          <p>{dateFormatted()}</p> 
        </div>  
      </div>
    </React.Fragment>
  );
};

export default Note;