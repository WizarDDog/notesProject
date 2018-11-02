import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';


import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus, faTrash } from '@fortawesome/free-solid-svg-icons'
library.add(faPlus, faTrash)

class App extends Component {
  render() {
    return (
      <div className="App grid-container">
        <header className="App-header">
            <div className="Name grid-item">Name</div>
            <div className="grid-item">
                <div id="Icon" ><FontAwesomeIcon icon="plus" /></div>
                <div id="Icon" ><FontAwesomeIcon icon="trash" /></div>
                <div id="Icon" ><FontAwesomeIcon icon="ghost" /></div>
            </div>
        </header>
          <div className="Note grid-item"><textarea cols={40} rows={10}/></div>
      </div>
    );
  }
}

export default App;

