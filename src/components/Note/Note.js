import React, { Component } from 'react';
import './Note.css';
import deleteIcon from '../../assets/delete.webp';
import { fetchingNotes } from '../../services/notesService';

class Note extends Component {

  deleteNote= async () => {
    try {
      await fetch(`https://www.diegollanes.ml/api/${this.props.id}`, { method: 'DELETE' });
      const newNotes = await fetchingNotes();
      this.props.updateNotes(newNotes,this.props.category);
    } catch(e){
      console.log(e.message);
    }
  }

  dateFormatted = () => {
    let newDate = new Date(this.props.date);
    return (((newDate.getMonth() > 8) ? (newDate.getMonth() + 1) : ('0' + (newDate.getMonth() + 1))) + '/' + ((newDate.getDate() > 9) ? newDate.getDate() : ('0' + newDate.getDate())) + '/' + newDate.getFullYear());
  }

  componentWillUnmount(){
    console.log(`ComponentWillUnmount`);
    this.props.addCountDeleted();
  }

  render(){
    const { title, message } = this.props;

    return (
      <React.Fragment>
        <div className='note'>
          <h3>{title}</h3>
          <p>{message}</p>
          <div id='bottom-section'>
            <button onClick={this.deleteNote}>
              <img src={deleteIcon} alt='delete' width='30' height='30'/>
            </button>
            <p>{this.dateFormatted()}</p> 
          </div>  
        </div>
      </React.Fragment>
    );
  }
};

export default Note;