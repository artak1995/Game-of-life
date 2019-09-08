export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const UPDATE_GAME_DATA = 'UPDATE_GAME_DATA';

export const connectSocket = () => ({
  type: CONNECT_SOCKET,
  // payload: color,
});

export const updateGameData = gameData => ({
  type: UPDATE_GAME_DATA,
  payload: gameData,
});
