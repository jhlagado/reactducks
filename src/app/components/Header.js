import React, { PropTypes, Component } from 'react';
import TodoTextInput from './TodoTextInput';
import { connect } from 'react-redux';
import { addTodo } from '../store/Todo/actions';

export class Header extends Component {

  render() {
    const { dispatch } = this.props;
    const handleSave = text => {
      if (text.length !== 0) {
        dispatch(addTodo(text));
      }
    };

    return ( 
      <header className="header">
        <h1>todos</h1>
        <TodoTextInput
          newTodo
          onSave={handleSave}
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
