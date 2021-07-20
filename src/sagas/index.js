import { call, put, takeEvery, all} from 'redux-saga/effects'
import {firebaseLogin, someGetExample, getLandingCourses} from './functions';

function* fetchUser(action) {
  try {
    const user = yield call(firebaseLogin, action.payload.uid);
    // console.log(user);
    yield put({type: "SET_USER_PROFILE", payload: user.data()});
    action.payload.history.push("/createChat");    
  } catch (e) {
    yield put({type: "USER_FETCH_FAILED", message: e.message});
  }
}

function* fetchLandingCourses() {
  try {
    const data = yield call(getLandingCourses, {});
    console.log(data.landing_courses);
    yield put({type: "SET_LANDING_COURSES", payload: data.landing_courses});
  } catch (e) {
  }
}


function* someOtherWorkerSaga(action) {
  try{
    const result = yield call(someGetExample, action.payload);
    yield put({type: "SECOND_SAGA", payload: 'Good'});
  }catch(e){
    yield put({type: "SECOND_SAGA", payload: 'error'});
  }
}

function* mySaga() {
  yield takeEvery("USER_FETCH_REQUESTED", fetchUser);
  yield takeEvery("FETCH_LANDING_COURSES", fetchLandingCourses);
}

function* mySecondSaga(){
  yield takeEvery("API_ASYNC", someOtherWorkerSaga);
}

function *rootSaga() {
  yield all([
    mySaga(), 
    mySecondSaga()
  ])
}

export default rootSaga;
