import { createStore, applyMiddleware, compose } from 'redux';
import createSagaMiddleware from 'redux-saga';
import rootReducer from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();

let composedMiddleware = compose(applyMiddleware(sagaMiddleware));
if (window.devToolsExtension && process.env.NODE_ENV !== 'production') {
  composedMiddleware = compose(
    applyMiddleware(sagaMiddleware),
    window.devToolsExtension ? window.__REDUX_DEVTOOLS_EXTENSION__() : f => f
  );
}
const store = createStore(rootReducer, composedMiddleware);

sagaMiddleware.run(rootSaga);

export default store;
