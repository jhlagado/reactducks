import { combineReducers } from 'redux';

import todos from './Todo/reducers';
import visibilityFilterReducer from './visibilityFilter/reducers';
import modalReducer from './Modal/reducers';
import authReducer from './auth/reducers';

export default combineReducers({
  auth: authReducer,
  todos: todos,
  visibilityFilter: visibilityFilterReducer,
  modals: modalReducer,
});
