import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';
import TodoTextInput from './TodoTextInput';
import { connect } from 'react-redux';

import { completeTodo, deleteTodo, editTodo } from '../store/Todo/actions';

class TodoItem extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      editing: false
    };
  }

  render() {
    const { todo, dispatch } = this.props;

    const handleChange = () => dispatch(completeTodo(todo.id));
    const handleDelete = () => dispatch(deleteTodo(todo.id));
    const handleEdit = () => this.setState({ editing: true });

    const handleSave = text => {
      if (text.length > 0) {
        dispatch(editTodo(this.props.todo.id, text));
      }
      this.setState({ editing: false });
    };

    let element;
    if (this.state.editing) {
      element = (
        <TodoTextInput
          text={todo.text}
          editing={this.state.editing}
          onSave={handleSave}
        />
      );
    } else {
      element = (
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={todo.completed}
            onChange={handleChange}
          />
          <label
            onDoubleClick={handleEdit}
          >
            {todo.text}
          </label>
          <button
            className="destroy"
            onClick={handleDelete}
          />
        </div>
      );
    }

    return (
      <li
        className={classnames({
          completed: todo.completed,
          editing: this.state.editing
        })}
      >
        {element}
      </li>
    );
  }
}

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapDispatchToProps
)(TodoItem);
