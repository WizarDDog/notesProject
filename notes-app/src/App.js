import React, {Component} from 'react';
import './App.css';


import {library} from '@fortawesome/fontawesome-svg-core'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'

library.add(faPlus, faTrash)

class App extends Component {
    constructor(props){
        super(props);
        this.state = {
            note: "",
            savedNote: "",
            writtenNotes: []
        }
    }

    saveNote(e){
        this.state.note = e.target.value;

    }

    showSavedNote() {
        var newNote = this.state.note
        this.setState({
            savedNote : newNote,
        })
        this.state.writtenNotes.push(newNote)
        document.getElementById('input').value = ''
    }


    render() {
        return (
            <div className="App ">
                <div className="Name ">Name</div>
                <button type="submit" onClick={()=> this.showSavedNote()} id="Icon1"><FontAwesomeIcon icon="plus"/></button>
                <button disabled id="Icon2"><FontAwesomeIcon icon="trash"/></button>
                <ul className="WrittenNotes">
                    {this.state.writtenNotes.map((item ,i) => {
                        return <li key={i} >{item}</li>
                    })}</ul>
                <input className="Note" id="input" placeholder="Write your note here!" cols={40} rows={10}
                          onChange={(e) => this.saveNote(e)} defaultValue={this.state.note}/>
            </div>
        );
    }
}

export default App;

