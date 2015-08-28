import React from 'react';

export default class Note extends React.Component {
  constructor(props) {
    super(props)

    this.finishEdit = this.finishEdit.bind(this);
    this.checkEnter = this.checkEnter.bind(this);
    this.edit = this.edit.bind(this);
    this.renderEdit = this.renderEdit.bind(this);
    this.renderTask = this.renderTask.bind(this);

    this.state = {
      editing: false
    };
  }

  render() {
    const editing = this.state.editing;

    return <div>
      {editing ? this.renderEdit() : this.renderTask() }
    </div>;
  }

  renderEdit() {
    return <input type='text'
      autoFocus={true}
      defaultValue={this.props.task}
      onBlur={this.finishEdit}
      onKeyPress={this.checkEnter}
      ref="edit"/>
  }

  renderTask() {
    const onDelete = this.props.onDelete;

    return (
      <div>
        <span className='task'
          onClick={this.edit}>
          {this.props.task}
        </span>
        {onDelete ? this.renderDelete() : null}
      </div>);
  }

  edit() {
    this.setState({
      editing: true
    });
  }

  checkEnter(event) {
    if(event.key === 'Enter') {
      this.finishEdit(event);
    }
  }

  finishEdit(event) {
    this.props.onEdit(event.target.value);
    this.refs.edit.text = ''
    this.setState({
      editing: false
    });
  }

  renderDelete() {
    return <button className='delete' onClick={this.props.onDelete}>x</button>;
  }
}
