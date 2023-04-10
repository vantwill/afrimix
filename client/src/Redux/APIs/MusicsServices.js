import Axios from "./Axios";

// ************ PUBLIC APIs ************

// get all musics Function
export const getAllMusicsService = async (
  category,
  time,
  language,
  rate,
  year,
  search,
  pageNumber
) => {
  const { data } = await Axios.get(
    `/musics?category=${category}&time=${time}&language=${language}&rate=${rate}&year=${year}&search=${search}&pageNumber=${pageNumber}`
  );
  return data;
};

// get random musics Function
export const getRandomMusicsService = async () => {
  const { data } = await Axios.get(`/musics/random/all`);
  return data;
};

// get music by id Function
export const getMusicByIdService = async (id) => {
  const { data } = await Axios.get(`/musics/${id}`);
  return data;
};

// get top rated music Function
export const getTopRatedMusicService = async () => {
  const { data } = await Axios.get(`/musics/rated/top`);
  return data;
};

// review music Function
export const reviewMusicService = async (token, id, review) => {
  const { data } = await Axios.post(`/musics/${id}/reviews`, review, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete music Function
export const deleteMusicService = async (token, id) => {
  const { data } = await Axios.delete(`/musics/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// delete all musics function
export const deleteAllMusicsService = async (token) => {
  const { data } = await Axios.delete(`/musics`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// create music Function
export const createMusicService = async (token, music) => {
  const { data } = await Axios.post(`/musics`, music, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};

// update music Function
export const updateMusicService = async (token, id, music) => {
  const { data } = await Axios.put(`/musics/${id}`, music, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return data;
};
