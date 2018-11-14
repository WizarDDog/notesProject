import React, {Component} from 'react';
import './App.css';

import {library} from '@fortawesome/fontawesome-svg-core'
import {faPlus, faStickyNote, faTrash} from '@fortawesome/free-solid-svg-icons'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'

library.add(faPlus, faTrash, faStickyNote);

class App extends Component {
    constructor(props) {
        super(props);
        this.onChange = (editorState) => this.setState({editorState})
        this.state = {
            note: "",
            notesName: "",
            isHidden: true,
            showNote: '',
            showEdit: false,
            newNotesName: "",
            newNote: "",
            isEnable: false,
            showMenu: false,
            colorPick: "",
            showNoteD: false,

            buttonNewNote: false,
        };
        this.color = [];
        this.writtenNotesName = [];
        this.allNotes = [];
        this.time = []
    }

    componentDidMount() {
        window.addEventListener('keydown', (event) => {
            if (event.code === 'Backspace') {
                this.isEnable()
            }
        })
    }

    ifHidden(i) {
        if (this.state.isHidden) {
            this.findNoteOfName(i);
            this.setState({
                isHidden: false,

                showNoteD: true

            })
        }
        if (!this.state.isHidden) {
            this.setState({
                savedNote: "",
                isHidden: true,
                showNote: "",
                showEdit: false,
                isBold: false,

            })
        }
    }

    saveNote(e) {
        this.state.note = e.target.value;
        this.isEnable()
    }

    saveNotesName(e) {
        this.state.notesName = e.target.value;
        this.isEnable()
    }

    getTime() {
        var date = new Date().toLocaleString('en-US', {hour12: false}).split(" ");

        var time1 = date[1];
        var mdy = date[0];

        mdy = mdy.split('/');
        var month = parseInt(mdy[0]);
        var day = parseInt(mdy[1]);
        var year = parseInt(mdy[2]);

        return year + '-' + month + '-' + day + ' ' + time1;
    }

    showSavedNotesAndName() {
        this.writtenNotesName.push(this.state.notesName);
        this.allNotes.push(this.state.note);
        this.time.push(this.getTime());
        this.color.push(this.state.colorPick)



        document.getElementById('text').value = '';
        document.getElementById('title').value = '';
        this.setState({
            note: "",
            notesName: "",
            buttonNewNote: false,
            isEnable: false,
            color: "",
            colorPick: ""
        })
    }

    findNoteOfName(i) {
        const result = this.allNotes[i];
        this.setState({
            showNote: result,
        })
    }

    deleteNote() {
        if (!this.state.isHidden) {
            const index = this.allNotes.findIndex(note => note === this.state.showNote);
            this.writtenNotesName.splice(index, 1);
            this.allNotes.splice(index, 1);
            this.color.splice(index, 1);
            this.setState({
                showNote: "",
                isHidden: true,
            })
        }
    }

    openEditNote() {
        if (this.state.showNote === "") {
        } else {
            const index = this.allNotes.findIndex(note => note === this.state.showNote)
            const oldNotesName = this.writtenNotesName[index];
            this.setState({
                note: this.state.showNote,
                notesName: oldNotesName,
                showEdit: true,
                showNoteD: false,
            });
            this.showEditNote()
        }
    }

    showEditNote() {
        if (this.state.showEdit) {
            return <div id="wrapper">
                <form id="paper" method="get" action="">
                    <div id="margin">Notes Name: <input id="title" type="text" name="title" placeholder="Notes name!"
                                                        onChange={(e) => this.state.newNotesName = e.target.value} defaultValue={this.state.notesName}/></div>
                    <textarea onChange={(e) => this.state.newNote = e.target.value}   id="text" name="text" rows="4"
                    >{this.state.showNote}</textarea>
                </form>
                <button id="button"  onClick={() => this.saveEditNote()}>
                    Save
                </button>
            </div>
        }
        if (!this.state.showEdit) {
            return <div>{}</div>
        }
    }

    checkIfChangedName() {
        if (this.state.newNotesName !== "") {
            const index = this.allNotes.findIndex(note => note === this.state.showNote)
            this.writtenNotesName.splice(index, 1, this.state.newNotesName)
        }
    }

    checkIfChangedNote() {
        if (this.state.newNote !== "") {
            const index = this.allNotes.findIndex(note => note === this.state.showNote);
            this.allNotes.splice(index, 1, this.state.newNote);
            this.setState({showNote: this.state.newNote, showEdit: false})
        } else {
            this.setState({showEdit: false})
        }
    }

    saveEditNote() {
        this.checkIfChangedName();
        this.checkIfChangedNote()
    }

    isEnable() {
        if (this.state.note.length > 0 && this.state.notesName.length > 0) {
            this.setState({isEnable: true})
        } else {
            this.setState({isEnable: false})
        }
    }

    makeGreen(){
        this.setState({
            showMenu: false,
            colorPick: "green"
        })
    }

    makeBlue(){
        this.setState({
            showMenu: false,
            colorPick: "blue"
        })
    }
    makeRed(){
        this.setState({
            showMenu: false,
            colorPick: "red"
        })
    }
    makeNone(){
        this.setState({
            showMenu: false,
            colorPick: null
        })
    }

    showColorPick(){
        if (this.state.showMenu){
           return <div>
                <button className="greenButton" onClick={()=> this.makeGreen()}>Green</button>
                <button className="blueButton" onClick={()=> this.makeBlue()}>Blue</button>
                <button className="redButton" onClick={()=> this.makeRed()}>Red</button>
                <button className="none" onClick={()=> this.makeNone()}>None</button>
            </div>
        }
    }

    toggleColorPick(){
        this.setState({
            showMenu: !this.state.showMenu
        })
    }

    newNote() {
        if (this.state.buttonNewNote) {
            return <div id="wrapper">

                <form id="paper" method="get" action="">

                    <div id="margin">Notes Name: <input id="title" type="text" name="title"
                                                        onChange={(e) => this.saveNotesName(e)} defaultValue={this.state.notesName}/></div>
                    <textarea onChange={(e) => this.saveNote(e)} defaultValue={this.state.note} placeholder="Write your note here!" id="text" name="text" rows="4"
                              >{}</textarea>
                </form>
                <button id="button"  className={this.state.colorPick}  onClick={()=>this.toggleColorPick()}>
                    Color
                </button>
                {this.showColorPick()}

            </div>
        }
    }

    showNoteDiv() {
        if (this.state.showNoteD) {
            return <div id="wrapper">
                <form id="paper" method="get" action="">
                <textarea onClick={() => this.openEditNote()} defaultValue={this.state.showNote} id="text" name="text" rows="4"
                >{}</textarea>
                </form>
            </div>
        } else {
            return <div>{}</div>
        }
    }
    render() {
        var showDiv = this.showEditNote();
        return (
            <div className="App ">
                <div className="Icons">
                    <button className="tooltip2" id="Icon3" onClick={() => (this.setState({buttonNewNote: true,showEdit: false})/this.newNote())}><FontAwesomeIcon
                        icon="sticky-note"/><span className="tooltiptext2">New Note</span>
                    </button>
                    <button type="submit" className="tooltip1" id="Icon1" disabled={!this.state.isEnable}
                            onClick={() => this.showSavedNotesAndName()} ><FontAwesomeIcon
                        icon="plus"/><span className="tooltiptext1">Save Note</span>
                    </button>
                    <button className="tooltip btn btn-warning" disabled={this.state.isHidden}
                            onClick={() => this.setState({showEdit: false, showNoteD: false, notesName: "", note: "" })/this.deleteNote()} id="Icon2"><FontAwesomeIcon
                        icon="trash"/>
                        <span className="tooltiptext">Delete Note</span>
                    </button>
                </div>
                <ul className="WrittenNotes">
                    {this.writtenNotesName.map((item, i) => {
                        return <div className={this.color[i]} id="allNotes" key={i + 1}>
                            <div id="justNotes" key={i} onClick={() => this.ifHidden(i)}>
                                {item}
                            </div>
                            <div id="justTime" key={i + 2}>{this.time[i]}</div>
                        </div>
                    })} </ul>

                <div className="nameAndNote">{this.newNote()}{this.showNoteDiv()}{showDiv}</div>
            </div>
        );
    }
}

export default App;

