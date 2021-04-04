import reducers from '../reducers';
//will import sagas here.
import mySaga from '../sagas'

import {applyMiddleware, createStore} from 'redux';
import createSagaMiddleware from 'redux-saga'
import {composeWithDevTools} from 'redux-devtools-extension';

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
  key: 'root',
  storage
};

const enhancedReducer = persistReducer(persistConfig, reducers);

//has created store here.
//this should be imported by Provider! which is in the index.js
//Saga를 설치는 했지만, 따로 작업을 하지는 않았습니다.
const sagaMiddleware = createSagaMiddleware()

export default function configureStore() {
  const store = createStore(
    enhancedReducer,
    {},
    composeWithDevTools(applyMiddleware(sagaMiddleware)),
  );
  const persistor = persistStore(store);
  sagaMiddleware.run(mySaga)
  return {store, persistor};
}