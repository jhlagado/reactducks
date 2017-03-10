import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';
import { connect } from 'react-redux';
import { addTodo } from '../store/Todo/actions';

class Header extends Component {
  constructor(props) {
    super(props);
    this.handleSave = this.handleSave.bind(this);
  }

  handleSave(text) {
    if (text.length !== 0) {
      this.props.dispatch(addTodo(text));
    }
  }

  render() {
    return (
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={this.handleSave}
          placeholder="What needs to be done?"
          />
      </header>
    );
  }
}

Header.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  const todos = state.todos;
  const completedCount = todos.reduce((count, todo) => todo.completed ? count + 1 : count, 0);
  const activeCount = todos.length - this.completedCount;

  return {
    filter: state.visibilityFilter,
    completedCount,
    activeCount
  };
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Header);
