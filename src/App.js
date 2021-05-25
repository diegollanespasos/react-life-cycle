import React, { Component } from 'react';
import './App.css';
import NoteList from './components/NoteList/NoteList';
const REQUEST_URL = "https://www.diegollanes.ml/api";

class App extends Component {
  constructor(props){
    console.log('Constructor Call');
    super(props);

    this.state = {
      notes: [],
      id: null,
      title: '',
      message: '',
      category: 1,
      isLoading: true,
    }
  }

  componentDidMount = () => {
    console.log('ComponentDidMount Call');
    this.fetchNotes();
  }

  fetchNotes = async () => {
    try {
      const response = await fetch(REQUEST_URL);
      const data = await response.json();
        this.setState({ notes: data });
        this.setState({ isLoading: false });
    } catch(e){
        console.log(e.message)
    }
  }

  render(){
    console.log('Render Call');
    const { notes, isLoading } = this.state;

    return (
      <div className="App">
          <div className='notes-board'>
            <NoteList  listTitle='To Do' notes={notes} category={1} isLoading={isLoading}/>
            <NoteList listTitle='Doing' notes={notes} category={2} isLoading={isLoading} />
            <NoteList listTitle='Done' notes={notes} category={3} isLoading={isLoading} />
          </div>
      </div>
    );
  }
}

export default App;