import { put, call, takeLatest } from 'redux-saga/effects';
import {
  ADD_USER,
  DEL_USER,
  GET_ADD_USER,
  GET_CHECK_USER,
  GET_DEL_USER,
} from '../types/userTypes';
import axios from 'axios';
const url = process.env.REACT_APP_URL;

const addUser = (user) => {
  return axios(`${url}/reg`, { user }).then((res) => res.data);
};
const delUser = () => {
  return axios(`${url}/logout`).then((res) => res.data);
};
const checkUser = () => {
  return axios(`${url}/check`).then((res) => res.data);
};

function* addUserWatcher(action) {
  try {
    const user = yield call(addUser, action.payload);
    yield put({ type: ADD_USER, payload: user });
  } catch (err) {
    yield put({ type: ADD_USER, payload: [{ name: 'ERROR' }] });
  }
}

function* delUserWatcher() {
  try {
    yield call(delUser);
    yield put({ type: DEL_USER, payload: null });
  } catch (err) {
    yield put({ type: DEL_USER, payload: [{ name: 'ERROR' }] });
  }
}

function* checkUserWatcher() {
  try {
    const user = yield call(checkUser);
    yield put({ type: DEL_USER, payload: user });
  } catch (err) {
    yield put({ type: DEL_USER, payload: [{ name: 'ERROR' }] });
  }
}

function* userWatcher() {
  yield takeLatest(GET_ADD_USER, addUserWatcher);
  yield takeLatest(GET_DEL_USER, delUserWatcher);
  yield takeLatest(GET_CHECK_USER, checkUserWatcher);
}

export default userWatcher;