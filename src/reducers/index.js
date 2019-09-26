import {
  GET_DATA_START,
  GET_DATA_SUCCESS,
  GET_DATA_FAILED,
  SEND_DATA_START,
  SEND_DATA_SUCCESS,
  SEND_DATA_FAILED
} from "../constants";

let initialState = {
  data: [],
  isLoading: false,
  isFailed: false,
  isSending: false,
  issendingFail: false
};

export default (state = initialState, { type, payload, item }) => {
  switch (type) {
    case GET_DATA_START:
      return {
        ...state,
        isLoading: true,
        isFailed: false
      };
    case GET_DATA_SUCCESS:
      return {
        ...state,
        data: payload,
        isLoading: false
      };
    case GET_DATA_FAILED:
      return {
        ...state,
        isFailed: true,
        isLoading: false
      };
    case SEND_DATA_START:
      return {
        ...state,
        isSending: true
      };
    case SEND_DATA_SUCCESS:
      return {
        ...state,
        isSending: false
      };
    case SEND_DATA_FAILED:
      return {
        ...state,
        isSendingFail: true,
        error: payload
      };

    default:
      return { ...state };
  }
};
