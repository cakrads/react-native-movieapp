import * as TYPE from './type';

export const setFinishedOnboarding = value => {
  return async (dispatch, getState) => {
    dispatch({
      type: TYPE.SET_FINISHED_ONBOARDING,
    });
    console.log('finishedboarding', getState().globalState);
  };
};
