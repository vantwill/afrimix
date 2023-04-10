import { combineReducers, configureStore } from "@reduxjs/toolkit";
import * as User from "./Reducers/userReducers";
import * as categories from "./Reducers/CategoriesReducer";
import * as musics from "./Reducers/Musicsreducer";

const rootReducer = combineReducers({
  // user reducers
  userLogin: User.userLoginReducer,
  userRegister: User.userRegisterReducer,
  userUpdateProfile: User.userUpdateProfileReducer,
  userDeleteProfile: User.userDeleteProfileReducer,
  userchangepassword: User.userChangePasswordReducer,
  userGetFavoriteMusics: User.userGetFavoriteMusicsReducer,
  userDeleteFavoriteMusics: User.userDeleteFavoriteMusicsReducer,
  adminGetAllUsers: User.adminGetAllUsersReducer,
  adminDeleteUser: User.adminDeleteUserReducer,
  userLikeMusic: User.userLikeMusicReducer,

  // Category reducers
  categoryGetAll: categories.getAllCategoriesReducer,
  categoryCreate: categories.createCategoryReducer,
  categoryUpdate: categories.updateCategoryReducer,
  categoryDelete: categories.deleteCategoryReducer,

  // Musics reducers
  getAllMusics: musics.musicsListReducer,
  getRandomMusics: musics.musicsRandomReducer,
  getMusicById: musics.musicDetailsReducer,
  getTopRatedMusic: musics.musicTopRatedReducer,
  createReview: musics.createReviewReducer,
  deleteMusic: musics.deleteMusicReducer,
  deleteAllMusics: musics.deleteAllMusicsReducer,
  createMusic: musics.createMusicReducer,
  casts: musics.CastsReducer,
  updateMusic: musics.updateMusicReducer,
});

// get userInfo from localStorage
const userInfoFromStorage = localStorage.getItem("userInfo")
  ? JSON.parse(localStorage.getItem("userInfo"))
  : null;

// initialState
const initialState = {
  userLogin: { userInfo: userInfoFromStorage },
};

export const store = configureStore({
  reducer: rootReducer,
  preloadedState: initialState,
});
