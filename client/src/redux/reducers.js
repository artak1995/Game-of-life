import { UPDATE_GAME_DATA, SET_SOCKET_COLOR } from './actions';

const initialState = {
  gameData: { grid: [] },
  socketColor: 'black',
};

const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case UPDATE_GAME_DATA:
      return {
        ...state,
        gameData: payload,
      };
    case SET_SOCKET_COLOR:
      return {
        ...state,
        socketColor: payload,
      };
    default:
      return state;
  }
};

export default reducer;
