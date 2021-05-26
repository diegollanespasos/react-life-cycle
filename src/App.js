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
      isLoading: true,
    }
  }

  componentDidMount = () => {
    console.log('ComponentDidMount Call');
    this.fetchNotes();
  }

  fetchNotes = async () => {
    try {
        const fetchedNotes = await fetchingNotes();
        this.setState({ notes: fetchedNotes, isLoading: false });
    } catch(e){
        console.log(e.message);
    }
  }

  /*
  componentDidUpdate(prevProps, prevState) {
    if (prevState.notes !== this.state.notes) {
      console.log('ComponentDidUpdate');
    }
  }
  */

  render(){
    console.log('Render Call');
    const { notes, isLoading } = this.state;

    return (
      <div className='App'>
          <div className='notes-board'>
            <NoteList updateNotes={this.fetchNotes} listTitle='To Do' notes={notes} category={1} isLoading={isLoading}/>
            <NoteList updateNotes={this.fetchNotes} listTitle='Doing' notes={notes} category={2} isLoading={isLoading} />
            <NoteList updateNotes={this.fetchNotes} listTitle='Done' notes={notes} category={3} isLoading={isLoading} />
          </div>
          <div className='container-note-form'>
            <h2>Post & Modify</h2>
            <NoteForm updateNotes={this.fetchNotes} />
          </div>
      </div>
    );
  }
}

export default App;