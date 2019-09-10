import { all, call, put, takeLatest, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import {
  CONNECT_SOCKET,
  UPDATE_GAME_DATA,
  SEND_START_GAME_REQUEST,
  SEND_END_GAME_REQUEST,
  SEND_CELL_DATA,
  SET_SOCKET_COLOR,
} from './actions';

const connect = () => {
  const socket = io(':3000');
  return new Promise(resolve => {
    socket.on('connect', () => {
      resolve(socket);
    });
  });
};

const createSocketChannel = socket =>
  eventChannel(emit => {
    const handler = event => payload => {
      emit({ event, payload } || []);
    };

    socket.on('updateGameData', handler(UPDATE_GAME_DATA));
    socket.on('setSocketColor', handler(SET_SOCKET_COLOR));
    return () => {
      socket.off('updateGameData', handler);
    };
  });

function* startGameRequest(socket) {
  yield socket.emit('start-game');
}

function* endGameRequest(socket) {
  yield socket.emit('end-game');
}

function* updateCellDataRequest(socket, { payload }) {
  yield socket.emit('update-cell', payload);
}

const listenGameDataSaga = function* listenGameDataSaga() {
  // connect to the server
  const socket = yield call(connect);
  // then create a socket channel
  const socketChannel = yield call(createSocketChannel, socket);

  yield takeLatest(SEND_START_GAME_REQUEST, startGameRequest, socket);
  yield takeLatest(SEND_END_GAME_REQUEST, endGameRequest, socket);
  yield takeLatest(SEND_CELL_DATA, updateCellDataRequest, socket);

  // then put the new data into the reducer
  while (true) {
    const data = yield take(socketChannel);
    const { event, payload } = data;
    yield put({ type: event, payload });
  }
};

function* socketConnectionSaga() {
  yield takeLatest(CONNECT_SOCKET, listenGameDataSaga);
}

export default function* rootSaga() {
  yield all([socketConnectionSaga()]);
}
