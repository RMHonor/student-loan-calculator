import { CALCULATE_LOAN } from '../actions/calculator/action';

/* eslint-disable max-len */
export default function (state = null, action) {
  switch (action.type) {
    case CALCULATE_LOAN:
      return action.payload;
    default:
      return state;
  }
}
