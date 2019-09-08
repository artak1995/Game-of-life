import { UPDATE_GAME_DATA } from './actions';

const initialState = {
  gameData: [],
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_GAME_DATA:
      return {
        ...state,
        gameData: payload,
      };
    default:
      return state;
  }
};

export default reducer;
