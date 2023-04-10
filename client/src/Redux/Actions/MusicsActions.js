import * as musicsConstants from "../Constants/MusicsConstants";
import * as musicsAPIs from "../APIs/MusicsServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// get all musics action
export const getAllMusicsAction =
  ({
    category = "",
    time = "",
    language = "",
    rate = "",
    year = "",
    search = "",
    pageNumber = "",
  }) =>
  async (dispatch) => {
    try {
      dispatch({ type: musicsConstants.MusicS_LIST_REQUEST });
      const response = await musicsAPIs.getAllMusicsService(
        category,
        time,
        language,
        rate,
        year,
        search,
        pageNumber
      );
      dispatch({
        type: musicsConstants.MusicS_LIST_SUCCESS,
        payload: response,
      });
    } catch (error) {
      ErrorsAction(error, dispatch, musicsConstants.MusicS_LIST_FAIL);
    }
  };

// get random musics action
export const getRandomMusicsAction = () => async (dispatch) => {
  try {
    dispatch({ type: musicsConstants.MusicS_RANDOM_REQUEST });
    const response = await musicsAPIs.getRandomMusicsService();
    dispatch({
      type: musicsConstants.MusicS_RANDOM_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, musicsConstants.MusicS_RANDOM_FAIL);
  }
};

// get music by id action
export const getMusicByIdAction = (id) => async (dispatch) => {
  try {
    dispatch({ type: musicsConstants.Music_DETAILS_REQUEST });
    const response = await musicsAPIs.getMusicByIdService(id);
    dispatch({
      type: musicsConstants.Music_DETAILS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, musicsConstants.Music_DETAILS_FAIL);
  }
};

// get top rated music action
export const getTopRatedMusicAction = () => async (dispatch) => {
  try {
    dispatch({ type: musicsConstants.Music_TOP_RATED_REQUEST });
    const response = await musicsAPIs.getTopRatedMusicService();
    dispatch({
      type: musicsConstants.Music_TOP_RATED_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, musicsConstants.Music_TOP_RATED_FAIL);
  }
};

// review music action
export const reviewMusicAction =
  ({ id, review }) =>
  async (dispatch, getState) => {
    try {
      dispatch({ type: musicsConstants.CREATE_REVIEW_REQUEST });
      const response = await musicsAPIs.reviewMusicService(
        tokenProtection(getState),
        id,
        review
      );
      dispatch({
        type: musicsConstants.CREATE_REVIEW_SUCCESS,
        payload: response,
      });
      toast.success("Review added successfully");
      dispatch({ type: musicsConstants.CREATE_REVIEW_RESET });
      dispatch(getMusicByIdAction(id));
    } catch (error) {
      ErrorsAction(error, dispatch, musicsConstants.CREATE_REVIEW_FAIL);
    }
  };

// delete music action
export const deleteMusicAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: musicsConstants.DELETE_Music_REQUEST });
    const response = await musicsAPIs.deleteMusicService(
      tokenProtection(getState),
      id
    );
    dispatch({
      type: musicsConstants.DELETE_Music_SUCCESS,
      payload: response,
    });
    toast.success("Music deleted successfully");
    dispatch(getAllMusicsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, musicsConstants.DELETE_Music_FAIL);
  }
};

// delete all musics action
export const deleteAllMusicsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: musicsConstants.DELETE_ALL_MusicS_REQUEST });
    const response = await musicsAPIs.deleteAllMusicsService(
      tokenProtection(getState)
    );
    dispatch({
      type: musicsConstants.DELETE_ALL_MusicS_SUCCESS,
      payload: response,
    });
    toast.success("All musics deleted successfully");
    dispatch(getAllMusicsAction({}));
  } catch (error) {
    ErrorsAction(error, dispatch, musicsConstants.DELETE_ALL_MusicS_FAIL);
  }
};

// create music action
export const createMusicAction = (music) => async (dispatch, getState) => {
  try {
    dispatch({ type: musicsConstants.CREATE_Music_REQUEST });
    const response = await musicsAPIs.createMusicService(
      tokenProtection(getState),
      music
    );
    dispatch({
      type: musicsConstants.CREATE_Music_SUCCESS,
      payload: response,
    });
    toast.success("Music created successfully");
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, musicsConstants.CREATE_Music_FAIL);
  }
};

// *******CASTS**********

// add cast
export const addCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: musicsConstants.ADD_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// remove cast
export const removeCastAction = (id) => async (dispatch, getState) => {
  dispatch({ type: musicsConstants.DELETE_CAST, payload: id });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// update cast
export const updateCastAction = (cast) => async (dispatch, getState) => {
  dispatch({ type: musicsConstants.EDIT_CAST, payload: cast });
  localStorage.setItem("casts", JSON.stringify(getState().casts.casts));
};

// delete all cast
export const deleteAllCastAction = () => async (dispatch) => {
  dispatch({ type: musicsConstants.RESET_CAST });
  localStorage.removeItem("casts");
};

// Update music action
export const updateMusicAction = (id, music) => async (dispatch, getState) => {
  try {
    dispatch({ type: musicsConstants.UPDATE_Music_REQUEST });
    const response = await musicsAPIs.updateMusicService(
      tokenProtection(getState),
      id,
      music
    );
    dispatch({
      type: musicsConstants.UPDATE_Music_SUCCESS,
      payload: response,
    });
    toast.success("Music updated successfully");
    dispatch(getMusicByIdAction(id));
    dispatch(deleteAllCastAction());
  } catch (error) {
    ErrorsAction(error, dispatch, musicsConstants.UPDATE_Music_FAIL);
  }
};
