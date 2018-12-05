import * as constants from '../constants';

/** Test Action */
export function testAction(param) {
    // dispatch and getState will be accessed when action comes from mapDispatchToProps.
    // return (dispatch, getState) => {
    const { test } = param;
    return {
        type: constants.TEST_ACTION,
        payload : {"test": test}
    }
    // }
}