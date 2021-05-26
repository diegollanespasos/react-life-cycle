import React, { Component } from 'react';
import { fetchingNotes } from '../../services/notesService';
import "./NoteForm.css";

class NoteForm extends Component {
    constructor(props){
        super(props);
        this.state = {
            title: '',
            message: '',
            category: 1,
        }
    }

    handleSubmit = (event) => {
        event.preventDefault();
        this.postNote(this.state.title, this.state.message, this.state.category);
    }

    postNote = async (title, message, category) => {
        try {
            const requestOptions = {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
                body: JSON.stringify({ title: title, message: message, category: category })
            };
            await fetch('https://www.diegollanes.ml/api', requestOptions);
            const fetchedNotes = await fetchingNotes();
            this.props.updateNotes(fetchedNotes,category);

        } catch(e){
          console.log(e.message);
        }
    }

    render(){
        const { title, message, category } = this.state;

        return (
            <React.Fragment>
                <div className='note-form'>
                    <form onSubmit={this.handleSubmit}>
                        <input 
                        type="text"
                        placeholder='Title'
                        value={title}
                        onChange={e => this.setState({ title: e.target.value })}
                        />
                        <textarea
                        onChange={e => this.setState({ message: e.target.value })} 
                        placeholder='Description' 
                        value={message}
                        name="message"
                        rows="6" 
                        cols="30" />
                        <label>Category</label>
                        <select value={category} onChange={ e => this.setState({ category: Number(e.target.value) })} id="category" name="category">
                            <option value={1}>To Do</option>
                            <option value={2}>Doing</option>
                            <option value={3}>Done</option>
                        </select>
                        <div>
                            <input type="submit" value="Post" id='post-button'/>
                        </div>
                    </form>
                </div> 
            </React.Fragment>
        )
    }
}

export default NoteForm;