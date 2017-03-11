import React, { Component, PropTypes } from 'react';
import classnames from 'classnames';

class TodoTextInput extends Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      text: this.props.text || ''
    };
  }


  render() {

    const handleSubmit = (e) => {
      const text = e.target.value.trim();
      if (e.which === 13) {
        this.props.onSave(text);
        if (this.props.newTodo) {
          this.setState({ text: '' });
        }
      }
    };

    const handleChange = (e) => this.setState({ text: e.target.value });

    const handleBlur = (e) => {
      if (!this.props.newTodo) {
        this.props.onSave(e.target.value);
      }
    };

    return (
      <input
        className={
          classnames({
            edit: this.props.editing,
            'new-todo': this.props.newTodo
          })}
        type="text"
        placeholder={this.props.placeholder}
        autoFocus="true"
        value={this.state.text}
        onBlur={handleBlur}
        onChange={handleChange}
        onKeyDown={handleSubmit}
      />
    );
  }
}

TodoTextInput.propTypes = {
  onSave: PropTypes.func.isRequired,
  text: PropTypes.string,
  placeholder: PropTypes.string,
  editing: PropTypes.bool,
  newTodo: PropTypes.bool
};

export default TodoTextInput;
