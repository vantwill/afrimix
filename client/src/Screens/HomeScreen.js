import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import Banner from "../Components/Home/Banner";
import PopularMusics from "../Components/Home/PopularMusics";
import Promos from "../Components/Home/Promos";
import TopRated from "../Components/Home/TopRated";
import Layout from "../Layout/Layout";
import {
  getAllMusicsAction,
  getRandomMusicsAction,
  getTopRatedMusicAction,
} from "../Redux/Actions/MusicsActions";

function HomeScreen() {
  const dispatch = useDispatch();
  // useSelectors
  const {
    isLoading: randomLoading,
    isError: randomError,
    musics: randomMusics,
  } = useSelector((state) => state.getRandomMusics);
  const {
    isLoading: topLoading,
    isError: topError,
    musics: topMusics,
  } = useSelector((state) => state.getTopRatedMusic);
  const { isLoading, isError, musics } = useSelector(
    (state) => state.getAllMusics
  );

  // useEffect
  useEffect(() => {
    // get random musics
    dispatch(getRandomMusicsAction());
    // get all musics
    dispatch(getAllMusicsAction({}));
    // get top rated musics
    dispatch(getTopRatedMusicAction());
    // errors
    if (isError || randomError || topError) {
      toast.error("Something went wrong!");
    }
  }, [dispatch, isError, randomError, topError]);

  return (
    <Layout>
      <div className="container mx-auto min-h-screen px-2 mb-6">
        <Banner musics={musics} isLoading={isLoading} />
        <PopularMusics musics={randomMusics} isLoading={randomLoading} />
        <Promos />
        <TopRated musics={topMusics} isLoading={topLoading} />
      </div>
    </Layout>
  );
}

export default HomeScreen;
