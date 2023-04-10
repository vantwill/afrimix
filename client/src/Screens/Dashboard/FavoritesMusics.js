import React, { useContext, useEffect } from "react";
import Table from "../../Components/Table";
import SideBar from "./SideBar";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteFavoriteMusicsAction,
  getFavoriteMusicsAction,
} from "../../Redux/Actions/userActions";
import toast from "react-hot-toast";
import Loader from "../../Components/Notfications/Loader";
import { Empty } from "../../Components/Notfications/Empty";
import { SidebarContext } from "../../Context/DrawerContext";
import { DownloadVideo } from "../../Context/Functionalities";
import FileSaver from "file-saver";

function FavoritesMusics() {
  const dispatch = useDispatch();
  const { progress, setprogress } = useContext(SidebarContext);
  const { isLoading, isError, likedMusics } = useSelector(
    (state) => state.userGetFavoriteMusics
  );
  // delete
  const {
    isLoading: deleteLoading,
    isError: deleteError,
    isSuccess,
  } = useSelector((state) => state.userDeleteFavoriteMusics);

  // delete musics handler
  const deleteMusicsHandler = () => {
    window.confirm("Are you sure you want to delete all musics?") &&
      dispatch(deleteFavoriteMusicsAction());
  };

  // download music Video
  const DownloadMusicVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setprogress).then((data) => {
      setprogress(0);
      FileSaver.saveAs(data, name);
    });
  };

  // useEffect
  useEffect(() => {
    dispatch(getFavoriteMusicsAction());
    if (isError || deleteError) {
      toast.error(isError || deleteError);
      dispatch({
        type: isError
          ? "GET_FAVORITE_MusicS_RESET"
          : "DELETE_FAVORITE_MusicS_RESET",
      });
    }
  }, [dispatch, isError, deleteError, isSuccess]);

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Favorites Musics</h2>
          {likedMusics?.length > 0 && (
            <button
              disabled={deleteLoading}
              onClick={deleteMusicsHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {deleteLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading ? (
          <Loader />
        ) : likedMusics.length > 0 ? (
          <Table
            data={likedMusics}
            admin={false}
            downloadVideo={DownloadMusicVideo}
            progress={progress}
          />
        ) : (
          <Empty message="You have no favorites musics" />
        )}
      </div>
    </SideBar>
  );
}

export default FavoritesMusics;
