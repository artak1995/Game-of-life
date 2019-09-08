import { all, call, put, takeLatest, take } from 'redux-saga/effects';
import { eventChannel } from 'redux-saga';
import io from 'socket.io-client';
import { CONNECT_SOCKET, UPDATE_GAME_DATA } from './actions';

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
    const handler = data => {
      emit(data);
    };
    socket.on('updateGameData', handler);
    return () => {
      socket.off('updateGameData', handler);
    };
  });

const listenGameDataSaga = function* listenGameDataSaga() {
  // connect to the server
  const socket = yield call(connect);

  // then create a socket channel
  const socketChannel = yield call(createSocketChannel, socket);

  // then put the new data into the reducer
  while (true) {
    const payload = yield take(socketChannel);
    yield put({ type: UPDATE_GAME_DATA, payload });
  }
};

function* socketConnectionSaga() {
  yield takeLatest(CONNECT_SOCKET, listenGameDataSaga);
}

export default function* rootSaga() {
  yield all([socketConnectionSaga()]);
}
