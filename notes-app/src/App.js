import React, {Component} from 'react';
import './App.css';


import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'

library.add(faPlus, faTrash)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: "",
            savedNote: "",
            savedNotesName: "",
            notesName: "",
            writtenNotes: [],
            writtenNotesName: [],
            isHidden: true
        };
    }

    showNotes(item) {
        if(this.state.isHidden) {
            this.setState({
                isHidden: !this.state.isHidden
            })
            return <div  className='showNote'>
                {item}
            </div>
        }
        if (!this.state.isHidden) {
            this.setState({
                isHidden: !this.state.isHidden
            })
            return <div className='showNote'>
                <div>{item}</div>
                <div>{this.state.savedNote}</div>
            </div>
        }
    }





    saveNote(e) {
        this.state.note = e.target.value;

    }

    saveNotesName(e) {
        this.state.notesName = e.target.value;
    }

    showSavedNote() {
        var newNote = this.state.note
        this.setState({
            savedNote: newNote,
        })
        this.state.writtenNotes.push(newNote)
        document.getElementById('input1').value = ''
    }

    showSavedNotesName() {
        var newNotesName = this.state.notesName;
        this.setState({
            savedNotesName: newNotesName,
        })
        this.state.writtenNotesName.push(newNotesName)
        document.getElementById('input2').value = ''
        document.getElementById('input1').value = ''

    }



                render() {
                    return (
                    <div className="App ">
                    <div className="Name ">Name</div>
                    <button type="submit" onClick={() => this.showSavedNotesName()} id="Icon1"><FontAwesomeIcon icon="plus"/></button>
                    <button disabled id="Icon2"><FontAwesomeIcon icon="trash"/></button>
                    <ul className="WrittenNotes">
                    {this.state.writtenNotesName.map((item, i) => {
                        return <div>
                                <button onClick={() => this.showNotes(item)} key={i}>
                            {this.showNotes(item)}
                        </button>
                        </div>
                    }) }</ul>
                    <input className="Note" id="input1" placeholder="Write your note here!"
                    onChange={(e) => this.saveNote(e)} defaultValue={this.state.note}/>
                    <input className="notesName" id="input2" placeholder="Notes name!"
                    onChange={(e) => this.saveNotesName(e)} defaultValue={this.state.notesName}/>
                    </div>
                    );
                }
                }

                export default App;

