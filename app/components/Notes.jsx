
import React from 'react';
import Editable from './Editable';
import Note from './Note';
import LaneActions from '../actions/NoteActions';

export default class Notes extends React.Component {
  constructor(props) {
    super(props);

    this.renderNote = this.renderNote.bind(this);
  }

  render() {
    const notes = this.props.items;
    return (
      <ul className='notes'>
        {notes.map(this.renderNote)}
      </ul>
    )
  }

  renderNote(note) {
    return (
      <Note className='note' onMove={LaneActions.move}
        data={note}
        key={`note${note.id}`}
      >
        <Editable
          task={note.task}
          onEdit={this.props.onEdit.bind(null, note.id)}
          onDelete={this.props.onDelete.bind(null, note.id)}
        />
      </Note>
    );
  }
}
