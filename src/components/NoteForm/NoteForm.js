import React from 'react';
import "./NoteForm.css";

const NoteForm = ({ id, title, message, category, setTitle, setMessage, setCategory, receiveNotes, resetForm }) => {  
    const handleSubmit = (event) => {
        event.preventDefault();
        postNote(title, message, category);   
    }

    const postNote = async (title, message, category) => {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
            body: JSON.stringify({ title: title, message: message, category: category })
        };
        try {
          await fetch('https://www.diegollanes.ml/api', requestOptions);
        } catch(e){
          console.log(e.message);
        }
        resetForm();
      }

    const updateNote = async () => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: title, message: message, category: category })
        };
        try{
            await fetch(`https://www.diegollanes.ml/api/${id}`, requestOptions);
            receiveNotes();
        } catch(e) {
            console.log(e.message);
        }
        resetForm();
    }

    return (
        <React.Fragment>
            <div className='note-form'>
                <form onSubmit={handleSubmit}>
                    <input 
                    type="text"
                    placeholder='Title'
                    value={title}
                    onChange={event => setTitle(event.target.value)}
                    />
                    <textarea 
                    onChange={event => setMessage(event.target.value)} 
                    placeholder='Description' 
                    value={message} 
                    name="message" 
                    rows="6" 
                    cols="30" />
                    <label>Category</label>
                        <select value={category} onChange={event => setCategory(event.target.value)} id="category" name="category">
                            <option value={1}>To Do</option>
                            <option value={2}>Doing</option>
                            <option value={3}>Done</option>
                        </select>
                        <div>
                            <input type="submit" value="Post" id='post-button'/>
                        </div>
                </form>
                <button id='modify-button' onClick={updateNote}>Modify</button>
            </div> 
        </React.Fragment>
    )
}
export default NoteForm;