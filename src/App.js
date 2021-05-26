import React, { Component } from 'react';
import './App.css';
import NoteList from './components/NoteList/NoteList';
import NoteForm from './components/NoteForm/NoteForm';
import { fetchingNotes } from './services/notesService';

class App extends Component {
  constructor(props){
    console.log('Constructor Call');
    super(props);

    this.state = {
      notes: [],
      toDoNotes: [],
      doingNotes: [],
      doneNotes: [],
      isLoading: true,
    }
  }

  componentDidMount = () => {
    console.log('ComponentDidMount Call');
    this.fetchNotes();
  }

  fetchNotes = async () => {
    try {
        const notes = await fetchingNotes();
        const toDoNotes = notes.filter(note => note.category === 1);
        const doingNotes = notes.filter(note => note.category === 2);
        const doneNotes = notes.filter(note => note.category === 3);
        this.setState({ notes, toDoNotes, doingNotes, doneNotes, isLoading: false });
    } catch(e){
        console.log(e.message);
    }
  }

  handlerUpdateNotes = (notes, category) => {
    const newNotes = notes.filter(note => note.category === category);
    if(category === 1) this.setState({ toDoNotes: newNotes });
    if(category === 2) this.setState({ doingNotes: newNotes });
    if(category === 3) this.setState({ doneNotes: newNotes });
  }

  render(){
    console.log('Render Call');
    const { toDoNotes, doingNotes, doneNotes, isLoading } = this.state;

    return (
      <div className='App'>
          <div className='notes-board'>
            <NoteList 
              notes={toDoNotes} 
              updateNotes={this.handlerUpdateNotes}
              listTitle='To Do'
              category={1}
              isLoading={isLoading}
              />
            <NoteList
              notes={doingNotes}
              updateNotes={this.handlerUpdateNotes}
              listTitle='Doing' category={2}
              isLoading={isLoading}
              />
            <NoteList
              notes={doneNotes}
              updateNotes={this.handlerUpdateNotes}
              listTitle='Done'
              category={3}
              isLoading={isLoading}
            />
          </div>
          <div className='container-note-form'>
            <h2>Post & Modify</h2>
            <NoteForm 
              updateNotes={this.handlerUpdateNotes}
            />
          </div>
      </div>
    );
  }
}

export default App;