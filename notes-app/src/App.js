import React, {Component} from 'react';
import './App.css';


import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlus, faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

library.add(faPlus, faTrash)

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            note: "",
            notesName: "",
            writtenNotesAndName: [{
                name: "",
                note: ""
            }],
            writtenNotesName: [],
            isHidden: true,
            showNote: '',
            allNotes: [],
            showEdit: false,
            newNotesName: "",
            newNote: "",
            time: "",
        };
    }

    ifHidden(i) {
        if (this.state.isHidden) {
            this.findNoteOfName(i);
            this.setState({
                isHidden: false,
            })
        }
        if (!this.state.isHidden) {
            this.setState({
                savedNote: "",
                isHidden: true,
                showNote: "",
                showEdit: false
            })
        }
    }

    saveNote(e) {
        this.state.note = e.target.value;

    }

    saveNotesName(e) {
        this.state.notesName = e.target.value;
    }

    showSavedNotesAndName() {
        this.state.writtenNotesName.push(this.state.notesName)
        this.state.allNotes.push(this.state.note)

        document.getElementById('input2').value = ''
        document.getElementById('input1').value = ''
        this.setState({})
    }

    findNoteOfName(i) {
        const result = this.state.allNotes[i]
        this.setState({
            showNote: result,
        })
    }

    deleteNote() {
        const index = this.state.allNotes.findIndex(note => note === this.state.showNote)
        this.state.writtenNotesName.splice(index, 1)
        this.state.allNotes.splice(index, 1)
        this.setState({
            showNote: ""
        })
    }

    openEditNote() {
        const index = this.state.allNotes.findIndex(note => note === this.state.showNote)
        const oldNotesName = this.state.writtenNotesName[index]
        this.setState({
            note: this.state.showNote,
            notesName: oldNotesName,
            showEdit: true
        })
        this.showEditNote()
    }

    showEditNote() {
        if (this.state.showEdit) {
            return <div>
                <input defaultValue={this.state.showNote} onChange={(e) => this.state.newNote = e.target.value}/>
                <input defaultValue={this.state.notesName} onChange={(e) => this.state.newNotesName = e.target.value}/>
                <button onClick={() => this.saveEditNote()}>Save</button>
            </div>
        } if (!this.state.showEdit) {
            return <div></div>
        }
    }

    saveEditNote() {
        const index = this.state.allNotes.findIndex(note => note === this.state.showNote)
        this.state.allNotes.splice(index, 1, this.state.newNote)
        this.state.writtenNotesName.splice(index, 1, this.state.newNotesName)
        this.setState({showNote: this.state.newNote})
    }

    render() {
        var showDiv = this.showEditNote();
        return (
            <div className="App ">
                <div className="Name" id="1">Name</div>
                <div className="Icons">
                <button type="submit" id="Icon1" onClick={() => this.showSavedNotesAndName()} id="Icon1"><FontAwesomeIcon
                    icon="plus"/>
                </button>
                <button onClick={() => this.deleteNote()} id="Icon2"><FontAwesomeIcon icon="trash"/></button>
                </div>
                <ul className="WrittenNotes">
                    {this.state.writtenNotesName.map((item, i) => {
                        return <div>
                            <button key={i} onClick={() => this.ifHidden(i)}>
                                {item}
                            </button>
                        </div>
                    })} </ul>

                <div className="nameAndNote">
                    <div className="form-group">
                    <input className="notesName" id="input1" placeholder="Notes name!"
                       onChange={(e) => this.saveNotesName(e)} defaultValue={this.state.notesName}/>
                        <label htmlFor="dynamic-label-input">Notes name!</label>
                    </div>
                    <div>
                <input className="Note" id="input2" placeholder="Write your note here!"
                    onChange={(e) => this.saveNote(e)} defaultValue={this.state.note}/>
                    </div>
                </div>
                <div onClick={() => this.openEditNote()}>{this.state.showNote}</div>
                {showDiv}
            </div>
        );
    }
}

export default App;

