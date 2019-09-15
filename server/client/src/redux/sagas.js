import { all, call, put, takeLatest, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import { notification } from 'antd';
import io from 'socket.io-client';
import {
  CONNECT_SOCKET,
  UPDATE_GAME_DATA,
  SEND_START_GAME_REQUEST,
  SEND_END_GAME_REQUEST,
  SEND_CELL_DATA,
  SET_SOCKET_COLOR,
  SEND_CELL_TEMPLATE,
} from './actions';

notification.config({
  placement: 'bottomRight',
  bottom: 50,
  duration: 3,
});

const connect = () => {
  const socket = io(':3000');
  return new Promise(resolve => {
    socket.on('connect', () => {
      notification.success({
        message: 'Connected to server successfully',
        description: 'Enjoy the game :)',
      });
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
    socket.on('notification', ({ type, payload }) => notification[type](payload));
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

function* addCellTemplateRequest(socket, { payload }) {
  yield socket.emit('add-cell-template', payload);
}

const listenGameDataSaga = function* listenGameDataSaga() {
  // connect to the server
  const socket = yield call(connect);
  // then create a socket channel
  const socketChannel = yield call(createSocketChannel, socket);

  yield takeLatest(SEND_START_GAME_REQUEST, startGameRequest, socket);
  yield takeLatest(SEND_END_GAME_REQUEST, endGameRequest, socket);
  yield takeLatest(SEND_CELL_DATA, updateCellDataRequest, socket);
  yield takeLatest(SEND_CELL_TEMPLATE, addCellTemplateRequest, socket);

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
