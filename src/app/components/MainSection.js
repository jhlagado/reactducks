import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

import TodoItem from './TodoItem';
import Footer from './Footer';

import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from '../store/visibilityFilter/constants';

import {
  completeAll
} from '../store/Todo/actions';

const TODO_FILTERS = {
  [SHOW_ALL]: () => true,
  [SHOW_ACTIVE]: todo => !todo.completed,
  [SHOW_COMPLETED]: todo => todo.completed
};

export class MainSection extends Component {

  renderToggleAll(completedCount) {
    const { todos, dispatch } = this.props;
    const handleCompleteAll = () => dispatch(completeAll());

    if (todos.length > 0) {
      return (
        <input
          className="toggle-all"
          type="checkbox"
          checked={completedCount === todos.length}
          onChange={handleCompleteAll}
        />
      );
    }
  }

  renderFooter() {
    const { todos } = this.props;

    if (todos.length) {
      return (
        <Footer/>
      );
    }
  }

  render() {
    const { todos, filter } = this.props;

    const filteredTodos = todos.filter(TODO_FILTERS[filter]);
    const completedCount = todos.reduce((count, todo) =>
      todo.completed ? count + 1 : count,
      0
    );

    return (
      <section className="main">
        {this.renderToggleAll(completedCount)}
        <ul className="todo-list">
          {filteredTodos.map(todo =>
            <TodoItem
              key={todo.id}
              todo={todo}
            />
          )}
        </ul>
        {this.renderFooter()}
      </section>
    );
  }
}

MainSection.propTypes = {
  todos: PropTypes.array.isRequired,
  filter: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
};

function mapStateToProps(state) {
  return {
    todos: state.todos,
    filter: state.visibilityFilter,
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
)(MainSection);
