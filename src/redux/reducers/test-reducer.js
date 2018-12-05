import * as constants from '../constants';

const initialState = {
    test: ""
}

export const testReducer = (state = initialState, action) => {
  switch (action.type) {
    case constants.TEST_ACTION:
      return {
        ...state,
        test: action.payload.test
      }

    default:
      return state
  }
}