import {
  GET_DATA_START,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  SEND_DATA_START,
  SEND_DATA_SUCCESS,
  SEND_DATA_FAILED
} from "../constants";

const getDataStart = () => ({
  type: GET_DATA_START
});

const getDataSuccess = data => ({
  type: GET_DATA_SUCCESS,
  payload: data
});

const getDataFailed = error => ({
  type: GET_DATA_FAILED,
  payload: error
});

const sendDataStart = () => ({
  type: SEND_DATA_START
});

const sendDataSuccess = () => ({
  type: SEND_DATA_SUCCESS
});

const sendDataFailed = error => ({
  type: SEND_DATA_FAILED,
  payload: error
});

export const getData = () => async (dispatch, getState) => {
  dispatch(getDataStart());
  fetch("/users")
    .then(res => res.json())
    .then(data => dispatch(getDataSuccess(data)))

    .catch(error => {
      dispatch(getDataFailed(error));
    });
};

export const sendDataChanges = newData => async (dispatch, getState) => {
  dispatch(sendDataStart());
  await fetch("/users", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json"
    },
    body: JSON.stringify(newData)
  })
    .then(res => res.json())
    .then(() => dispatch(sendDataSuccess()), dispatch(getData()))
    .catch(error => {
      dispatch(sendDataFailed(error));
    });
};
