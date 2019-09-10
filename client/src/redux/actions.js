export const CONNECT_SOCKET = 'CONNECT_SOCKET';
export const UPDATE_GAME_DATA = 'UPDATE_GAME_DATA';
export const SEND_START_GAME_REQUEST = 'SEND_START_GAME_REQUEST';
export const SEND_END_GAME_REQUEST = 'SEND_END_GAME_REQUEST';
export const SEND_CELL_DATA = 'SEND_CELL_DATA';
export const SET_SOCKET_COLOR = 'SET_SOCKET_COLOR';

export const connectSocket = () => ({
  type: CONNECT_SOCKET,
});

export const updateGameData = gameData => ({
  type: UPDATE_GAME_DATA,
  payload: gameData,
});

export const sendStartGameRequest = () => ({ type: SEND_START_GAME_REQUEST });

export const sendEndGameRequest = () => ({ type: SEND_END_GAME_REQUEST });

export const sendCellData = cellProps => ({ type: SEND_CELL_DATA, payload: cellProps });
