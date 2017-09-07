import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';

import calculator from './calculator';

const rootReducer = combineReducers({
  form: formReducer,
  calculator,
});

export default rootReducer;
