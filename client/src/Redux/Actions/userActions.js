import * as userConstants from "../Constants/userConstants";
import * as musicConstants from "../Constants/MusicsConstants";
import * as categoriesConstants from "../Constants/CategoriesConstants";
import * as userApi from "../APIs/userServices";
import toast from "react-hot-toast";
import { ErrorsAction, tokenProtection } from "../Protection";

// login action
const loginAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_LOGIN_REQUEST });
    const response = await userApi.loginService(datas);
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_LOGIN_FAIL);
  }
};

// register action
const registerAction = (datas) => async (dispatch) => {
  try {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });
    const response = await userApi.registerService(datas);
    dispatch({ type: userConstants.USER_REGISTER_SUCCESS, payload: response });
    dispatch({ type: userConstants.USER_LOGIN_SUCCESS, payload: response });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_REGISTER_FAIL);
  }
};

// logout action
const logoutAction = () => (dispatch) => {
  userApi.logoutService();
  dispatch({ type: userConstants.USER_LOGOUT });
  dispatch({ type: userConstants.USER_LOGIN_RESET });
  dispatch({ type: userConstants.USER_REGISTER_RESET });
  dispatch({ type: userConstants.DELETE_FAVORITE_MusicS_RESET });
  dispatch({ type: userConstants.USER_UPDATE_PROFILE_RESET });
  dispatch({ type: userConstants.USER_DELETE_PROFILE_RESET });
  dispatch({ type: userConstants.USER_CHANGE_PASSWORD_RESET });
  dispatch({ type: userConstants.GET_FAVORITE_MusicS_RESET });
  dispatch({ type: userConstants.GET_ALL_USERS_RESET });
  dispatch({ type: userConstants.DELETE_USER_RESET });
  dispatch({ type: userConstants.LIKE_Music_RESET });
  dispatch({ type: musicConstants.Music_DETAILS_RESET });
  dispatch({ type: musicConstants.CREATE_REVIEW_RESET });
  dispatch({ type: musicConstants.CREATE_Music_RESET });
  dispatch({ type: musicConstants.RESET_CAST });
  dispatch({ type: musicConstants.UPDATE_Music_RESET });
  dispatch({ type: categoriesConstants.CREATE_CATEGORY_RESET });
  dispatch({ type: categoriesConstants.UPDATE_CATEGORY_RESET });
  dispatch({ type: categoriesConstants.DELETE_CATEGORY_RESET });
};

// update profile action
const updateProfileAction = (user) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_UPDATE_PROFILE_REQUEST });
    const response = await userApi.updateProfileService(
      user,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_UPDATE_PROFILE_SUCCESS,
      payload: response,
    });
    toast.success("Profile Updated");
    dispatch({
      type: userConstants.USER_LOGIN_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_UPDATE_PROFILE_FAIL);
  }
};

// delete profile action
const deleteProfileAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_DELETE_PROFILE_REQUEST });
    await userApi.deleteProfileService(tokenProtection(getState));
    dispatch({ type: userConstants.USER_DELETE_PROFILE_SUCCESS });
    toast.success("Profile Deleted");
    dispatch(logoutAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_DELETE_PROFILE_FAIL);
  }
};

// change password action
const changePasswordAction = (passwords) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.USER_CHANGE_PASSWORD_REQUEST });
    const response = await userApi.changePasswordService(
      passwords,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.USER_CHANGE_PASSWORD_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.USER_CHANGE_PASSWORD_FAIL);
  }
};

// get all favorite musics action
const getFavoriteMusicsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_FAVORITE_MusicS_REQUEST });
    const response = await userApi.getFavoriteMusics(tokenProtection(getState));
    dispatch({
      type: userConstants.GET_FAVORITE_MusicS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_FAVORITE_MusicS_FAIL);
  }
};

// delete all favorite musics action
const deleteFavoriteMusicsAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_FAVORITE_MusicS_REQUEST });
    await userApi.deleteFavoriteMusics(tokenProtection(getState));
    dispatch({
      type: userConstants.DELETE_FAVORITE_MusicS_SUCCESS,
    });
    toast.success("Favorite Musics Deleted");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_FAVORITE_MusicS_FAIL);
  }
};

// admin get all users action
const getAllUsersAction = () => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.GET_ALL_USERS_REQUEST });
    const response = await userApi.getAllUsersService(
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.GET_ALL_USERS_SUCCESS,
      payload: response,
    });
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.GET_ALL_USERS_FAIL);
  }
};

// admin delete user action
const deleteUserAction = (id) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    await userApi.deleteUserService(id, tokenProtection(getState));
    dispatch({
      type: userConstants.DELETE_USER_SUCCESS,
    });
    toast.success("User Deleted");
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.DELETE_USER_FAIL);
  }
};

// user like music action
const likeMusicAction = (musicId) => async (dispatch, getState) => {
  try {
    dispatch({ type: userConstants.LIKE_Music_REQUEST });
    const response = await userApi.likeMusicService(
      musicId,
      tokenProtection(getState)
    );
    dispatch({
      type: userConstants.LIKE_Music_SUCCESS,
      payload: response,
    });
    toast.success("Added to your favorites");
    dispatch(getFavoriteMusicsAction());
  } catch (error) {
    ErrorsAction(error, dispatch, userConstants.LIKE_Music_FAIL);
  }
};

export {
  loginAction,
  registerAction,
  logoutAction,
  updateProfileAction,
  deleteProfileAction,
  changePasswordAction,
  getFavoriteMusicsAction,
  deleteFavoriteMusicsAction,
  deleteUserAction,
  getAllUsersAction,
  likeMusicAction,
};
