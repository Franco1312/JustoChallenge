import axios from 'axios';

export function getHits(id) {
  return async function (dispatch) {
    var json = await axios(`http://localhost:3001/hits/${id}`);
    return dispatch({
      type: 'GET_HITS',
      payload: json.data,
    });
  };
}

export function getHitmansAndManagers() {
  return async function (dispatch) {
    var json = await axios(`//localhost:3001/users/hitmensAndManagers`);
    return dispatch({
      type: 'GET_HITMANS_AND_MANAGERS',
      payload: json.data,
    });
  };
}

export function getHitById(id) {
  return async function (dispatch) {
    var json = await axios(`//localhost:3001/hits/getById/${id}`);
    return dispatch({
      type: 'GET_HIT_BY_ID',
      payload: json.data,
    });
  };
}

export function getHitmanById(id) {
  return async function (dispatch) {
    var json = await axios(`//localhost:3001/users/getHitmanById/${id}`);
    return dispatch({
      type: 'GET_HITMAN_BY_ID',
      payload: json.data,
    });
  };
}

export function getAssociatedHitman(id) {
  return async function (dispatch) {
    var json = await axios(`//localhost:3001/users/getAssociatedHitmans/${id}`);
    return dispatch({
      type: 'GET_ASSOCIATED_HITMANS',
      payload: json.data,
    });
  };
}

export function updateHit(body) {
  return async function (dispatch) {
    var json = await axios.put(`//localhost:3001/hits/update`, body);
    return dispatch({
      type: 'UPDATE_HIT',
      payload: json.data,
    });
  };
}

export function markAsNonActiveHitman(body) {
  return async function (dispatch) {
    var json = await axios.put(`//localhost:3001/users/markAsNonActive`, body);
    return dispatch({
      type: 'MARK_HITMAN_AS_NON_ACTIVE',
      payload: json.data,
    });
  };
}

export function createHit(body) {
  return async function (dispatch) {
    var json = await axios.post(`//localhost:3001/hits/create`, body);
    return dispatch({
      type: 'CREATE_HIT',
      payload: json.data,
    });
  };
}

export function loginUser(body) {
  return async function (dispatch) {
    var json = await axios.post(`//localhost:3001/auth/login`, body);
    return dispatch({
      type: 'LOGIN_USER',
      payload: json.data,
    });
  };
}

export function registerUser(body) {
  return async function (dispatch) {
    var json = await axios.post(`//localhost:3001/users/register`, body);
    return dispatch({
      type: 'REGISTER_USER',
      payload: json.data,
    });
  };
}
