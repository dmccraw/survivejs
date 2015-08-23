import React from 'react';
import Notes from './Notes';
// import uuid from 'node-uuid';
import NoteActions from '../actions/NoteActions';
import NoteStore from '../store/NoteStore';

export default class App extends React.Component {
  constructor(props) {
    super(props);

    this.storeChange = this.storeChanged.bind(this);
    this.state = NotesStore.getState();

    // this.state = {
    //   notes: [
    //     {
    //       id: uuid.v4(),
    //       task: 'Learn webpack'
    //     },
    //     {
    //       id: uuid.v4(),
    //       task: 'Learn React'
    //     },
    //     {
    //       id: uuid.v4(),
    //       task: 'Do laundry'
    //     }
    //   ],
    //   loaded: false
    // };

    this.findNote = this.findNote.bind(this);
    this.addNote = this.addNote.bind(this);
    this.editNote = this.editNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    // this.loadCollections = this.loadCollections.bind(this);
  }

  componentDidMount() {
    NoteStore.listen(this.storeChanged);
  }

  componentWillUnmount() {
    NoteStore.unlisten(this.storeChanged);
  }

  storeChanged(state) {
    this.setState(state);
  }

  // bulkLoad() {
  //   this.setState({bulkLoading: true});
  //   teamsnap.bulkLoad(1, function(err, items) {
  //     this.setState({bulkLoading: false});
  //     console.log(items);
  //   }.bind(this));
  // }

  // loadCollections() {
  //   var token = '7-js_frontend-dont_tell_the_cops';
  //   teamsnap.apiUrl = 'http://localhost:3000';

  //   var cachedCollections, cachedItems;
  //   try {
  //     cachedCollections = JSON.parse(sessionStorage.getItem('cachedCollections'));
  //     if (cachedCollections.sdkVersion !== teamsnap.version) {
  //       cachedCollections = null;
  //     }
  //   } catch (_error) {}

  //   try {
  //     cachedItems = JSON.parse(sessionStorage.getItem('cachedItems'));
  //   } catch (_error) {}

  //   if (token) {
  //     teamsnap.auth(token);
  //     this.setState({loaded: false, loading: true});
  //     teamsnap.loadCollections(typeof cachedCollections !== 'undefined' && cachedCollections !== null ? cachedCollections.collections : void 0).then(function() {

  //       var cachedItems;
  //       try {
  //         sessionStorage.setItem('cachedCollections', JSON.stringify({
  //           apiVersion: teamsnap.apiVersion,
  //           sdkVersion: teamsnap.version,
  //           collections: teamsnap.collections
  //         }));
  //       } catch (_error) {}
  //       if ((typeof cachedItems !== 'undefined' && cachedItems !== null ? cachedItems.apiVersion : void 0) !== teamsnap.apiVersion) {
  //         cachedItems = null;
  //       }
  //       window.cachedItems = teamsnap.enablePersistence(cachedItems !== null ? cachedItems.items : void 0);

  //       this.bulkLoad();

  //       this.setState({loading: false, loaded: true});
  //     }.bind(this));
  //   } else {
  //     this.bulkLoad();
  //     this.setState({loading: false, loaded: true});
  //   }

  // }

  render() {
    const notes = this.state.notes;

    return (
      <div>
        <button onClick={this.addNote}>+</button>
        <Notes
          items={notes}
          onEdit={this.editNote}
          onDelete={this.deleteNote}
        />
        // {this.state.loaded ? null : this.renderLoad()}
        // {this.state.bulkLoading ? 'Bulk loading' : ''}
      </div>
    );
  }

  renderLoad() {
    return (
      <button onClick={this.loadCollections}>{this.loading ? 'Loading' : 'Load'}</button>
    )
  }

  addNote() {
    NoteActions.create({task: 'New task'});
    // debugger
    // this.setState({
    //   notes: this.state.notes.concat(
    //     [
    //       {
    //         id: uuid.v4(),
    //         task: 'New Task'
    //       }
    //     ]
    //   )
    // });
  }

  editNote(id, task) {
    NoteActions.update({id, task});
    // let notes = this.state.notes;
    // const noteIndex = this.findNote(id);

    // if(noteIndex < 0) {
    //   return;
    // }

    // notes[noteIndex].task = task;

    // this.setState({notes})
  }

  // findNote(id) {
  //   let notes = this.state.notes;
  //   const noteIndex = notes.findIndex((note) => note.id === id);

  //   if(noteIndex < 0) {
  //     console.warn('Failed to find note', notes, id);
  //   }

  //   return noteIndex;
  // }

  deleteNote(id) {
    NoteActions.delete(id);
    // console.log('delete note', id);
    // const notes = this.state.notes;
    // const noteIndex = this.findNote(id);

    // if(noteIndex < 0) {
    //   return;
    // }

    // this.setState({
    //   notes: notes.slice(0, noteIndex).concat(notes.slice(noteIndex + 1))
    // });
  }
}
