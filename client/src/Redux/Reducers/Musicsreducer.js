import * as musicsConstants from "../Constants/MusicsConstants";

// GET ALL MusicS
export const musicsListReducer = (state = { musics: [] }, action) => {
  switch (action.type) {
    case musicsConstants.MusicS_LIST_REQUEST:
      return { isLoading: true };
    case musicsConstants.MusicS_LIST_SUCCESS:
      return {
        isLoading: false,
        musics: action.payload.musics,
        pages: action.payload.pages,
        page: action.payload.page,
        totalMusics: action.payload.totalMusics,
      };
    case musicsConstants.MusicS_LIST_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET RANDOM MusicS
export const musicsRandomReducer = (state = { musics: [] }, action) => {
  switch (action.type) {
    case musicsConstants.MusicS_RANDOM_REQUEST:
      return { isLoading: true };
    case musicsConstants.MusicS_RANDOM_SUCCESS:
      return { isLoading: false, musics: action.payload };
    case musicsConstants.MusicS_RANDOM_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// GET Music BY ID
export const musicDetailsReducer = (state = { music: {} }, action) => {
  switch (action.type) {
    case musicsConstants.Music_DETAILS_REQUEST:
      return { isLoading: true };
    case musicsConstants.Music_DETAILS_SUCCESS:
      return { isLoading: false, music: action.payload };
    case musicsConstants.Music_DETAILS_FAIL:
      return { isLoading: false, isError: action.payload };
    case musicsConstants.Music_DETAILS_RESET:
      return { music: {} };
    default:
      return state;
  }
};

// GET TOP RATED MusicS
export const musicTopRatedReducer = (state = { musics: [] }, action) => {
  switch (action.type) {
    case musicsConstants.Music_TOP_RATED_REQUEST:
      return { isLoading: true };
    case musicsConstants.Music_TOP_RATED_SUCCESS:
      return { isLoading: false, musics: action.payload };
    case musicsConstants.Music_TOP_RATED_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE REVIEW
export const createReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case musicsConstants.CREATE_REVIEW_REQUEST:
      return { isLoading: true };
    case musicsConstants.CREATE_REVIEW_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case musicsConstants.CREATE_REVIEW_FAIL:
      return { isLoading: false, isError: action.payload };
    case musicsConstants.CREATE_REVIEW_RESET:
      return {};
    default:
      return state;
  }
};

// DELETE Music
export const deleteMusicReducer = (state = {}, action) => {
  switch (action.type) {
    case musicsConstants.DELETE_Music_REQUEST:
      return { isLoading: true };
    case musicsConstants.DELETE_Music_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case musicsConstants.DELETE_Music_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// DELETE ALL MusicS
export const deleteAllMusicsReducer = (state = {}, action) => {
  switch (action.type) {
    case musicsConstants.DELETE_ALL_MusicS_REQUEST:
      return { isLoading: true };
    case musicsConstants.DELETE_ALL_MusicS_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case musicsConstants.DELETE_ALL_MusicS_FAIL:
      return { isLoading: false, isError: action.payload };
    default:
      return state;
  }
};

// CREATE Music
export const createMusicReducer = (state = {}, action) => {
  switch (action.type) {
    case musicsConstants.CREATE_Music_REQUEST:
      return { isLoading: true };
    case musicsConstants.CREATE_Music_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case musicsConstants.CREATE_Music_FAIL:
      return { isLoading: false, isError: action.payload };
    case musicsConstants.CREATE_Music_RESET:
      return {};
    default:
      return state;
  }
};

// CASTS
export const CastsReducer = (state = { casts: [] }, action) => {
  switch (action.type) {
    case musicsConstants.ADD_CAST:
      return { casts: [...state.casts, action.payload] };
    case musicsConstants.EDIT_CAST:
      const updatedCasts = state.casts.map((cast) =>
        cast.id === action.payload.id ? action.payload : cast
      );
      return {
        casts: updatedCasts,
      };
    case musicsConstants.DELETE_CAST:
      return {
        ...state,
        casts: state.casts.filter((cast) => cast.id !== action.payload),
      };
    case musicsConstants.RESET_CAST:
      return { casts: [] };
    default:
      return state;
  }
};

// UPDATE Music
export const updateMusicReducer = (state = {}, action) => {
  switch (action.type) {
    case musicsConstants.UPDATE_Music_REQUEST:
      return { isLoading: true };
    case musicsConstants.UPDATE_Music_SUCCESS:
      return { isLoading: false, isSuccess: true };
    case musicsConstants.UPDATE_Music_FAIL:
      return { isLoading: false, isError: action.payload };
    case musicsConstants.UPDATE_Music_RESET:
      return {};
    default:
      return state;
  }
};
