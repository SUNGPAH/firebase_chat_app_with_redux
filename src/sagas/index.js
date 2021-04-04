import { call, put, takeEvery } from 'redux-saga/effects'
import {firebaseLogin} from './functions';

function* fetchUser(action) {
  try {
    const user = yield call(firebaseLogin, action.payload.uid);
    yield put({type: "SET_USER_PROFILE", payload: user.data()});
    action.payload.history.push("/createChat");    
  } catch (e) {
    yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

//advantage of using Saga 
  // -> simple object

function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
}

export default mySaga;
