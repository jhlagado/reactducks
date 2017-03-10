import React, { Component, PropTypes } from 'react';
import {connect} from 'react-redux';

import classnames from 'classnames';
import {
  SHOW_ALL,
  SHOW_COMPLETED,
  SHOW_ACTIVE,
} from '../store/visibilityFilter/constants';

import { setVisibilityFilter } from '../store/visibilityFilter/actions';

import { clearCompleted } from '../store/Todo/actions';

const FILTER_TITLES = {
  [SHOW_ALL]: 'All',
  [SHOW_ACTIVE]: 'Active',
  [SHOW_COMPLETED]: 'Completed'
};

class Footer extends Component {
  renderTodoCount() {
    const { activeCount } = this.props;
    const itemWord = activeCount === 1 ? 'item' : 'items';

    return (
      <span className="todo-count">
        <strong>{activeCount || 'No'}</strong> {itemWord} left
      </span>
    );
  }

  renderFilterLink(filter) {
    const title = FILTER_TITLES[filter];
    const { filter: selectedFilter, dispatch } = this.props;
    const handleSetFilter = () => dispatch(setVisibilityFilter(filter));

    return (
      <a
        className={classnames({ selected: filter === selectedFilter })}
        style={{ cursor: 'pointer' }}
        onClick={handleSetFilter} 
        >
        {title}
      </a>
    );
  }

  renderClearButton() {
    const { completedCount, dispatch } = this.props;
    const handleClearCompleted = () => dispatch(clearCompleted());
    if (completedCount > 0) {
      return (
        <button
          className="clear-completed"
          onClick={handleClearCompleted}
          >
          Clear completed
        </button>
      );
    }
  }

  render() {
    return (
      <footer className="footer">
        {this.renderTodoCount()}
        <ul className="filters">
          {[SHOW_ALL, SHOW_ACTIVE, SHOW_COMPLETED].map(filter =>
            <li key={filter}>
              {this.renderFilterLink(filter)}
            </li>
          )}
        </ul>
        {this.renderClearButton()}
      </footer>
    );
  }
}

Footer.propTypes = {
  filter: PropTypes.string.isRequired,
  completedCount: PropTypes.number.isRequired,
  activeCount: PropTypes.number.isRequired,
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
)(Footer);
