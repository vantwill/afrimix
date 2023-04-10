import React, { useContext, useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import { BiArrowBack } from "react-icons/bi";
import { FaCloudDownloadAlt, FaHeart, FaPlay } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { getMusicByIdAction } from "../Redux/Actions/MusicsActions";
import Loader from "../Components/Notfications/Loader";
import { RiMusic2Line } from "react-icons/ri";
import {
  DownloadVideo,
  IfMusicLiked,
  LikeMusic,
} from "../Context/Functionalities";
import { SidebarContext } from "../Context/DrawerContext";
import FileSaver from "file-saver";

function WatchPage() {
  let { id } = useParams();
  const dispatch = useDispatch();
  const [play, setPlay] = useState(false);
  const { progress, setprogress } = useContext(SidebarContext);
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  // use Selector
  const { isLoading, isError, music } = useSelector(
    (state) => state.getMusicById
  );
  const { isLoading: likeLoading } = useSelector(
    (state) => state.userLikeMusic
  );
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = (music) => IfMusicLiked(music);

  // download music Video
  const DownloadMusicVideo = async (videoUrl, name) => {
    await DownloadVideo(videoUrl, setprogress).then((data) => {
      setprogress(0);
      FileSaver.saveAs(data, name);
    });
  };

  // use Effect
  useEffect(() => {
    //  music id
    dispatch(getMusicByIdAction(id));
  }, [dispatch, id]);

  return (
    <Layout>
      <div className="container mx-auto bg-dry p-6 mb-12">
        {!isError && (
          <div className="flex-btn flex-wrap mb-6 gap-2 bg-main rounded border border-gray-800 p-6">
            <Link
              to={`/music/${music?._id}`}
              className="md:text-xl text-sm flex gap-3 items-center font-bold text-dryGray"
            >
              <BiArrowBack /> {music?.name}
            </Link>
            <div className="flex-btn sm:w-auto w-full gap-5">
              <button
                onClick={() => LikeMusic(music, dispatch, userInfo)}
                disabled={isLiked(music) || likeLoading}
                className={`bg-white hover:text-subMain
               ${isLiked(music) ? "text-subMain" : "text-white"}
               transitions bg-opacity-30 rounded px-4 py-3 text-sm`}
              >
                <FaHeart />
              </button>
              <button
                disabled={progress > 0 && progress < 100}
                onClick={() => DownloadMusicVideo(music?.video, music?.name)}
                className="bg-subMain flex-rows gap-2 hover:text-main transitions text-white rounded px-8 font-medium py-3 text-sm"
              >
                <FaCloudDownloadAlt /> Download
              </button>
            </div>
          </div>
        )}

        {/* watch video */}
        {play ? (
          <video controls autoPlay={play} className="w-full h-full rounded">
            <source src={music?.video} type="video/mp4" title={music?.name} />
          </video>
        ) : (
          <div className="w-full h-screen rounded-lg overflow-hidden relative">
            {isLoading ? (
              <div className={sameClass}>
                <Loader />
              </div>
            ) : isError ? (
              <div className={sameClass}>
                <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-main text-subMain text-4xl">
                  <RiMusic2Line />
                </div>
                <p className="text-border text-sm">{isError}</p>
              </div>
            ) : (
              <>
                <div className="absolute top-0 left-0 bottom-0 right-0 bg-main bg-opacity-30 flex-colo">
                  <button
                    onClick={() => setPlay(true)}
                    className="bg-white text-subMain flex-colo border border-subMain rounded-full w-20 h-20 font-medium text-xl"
                  >
                    <FaPlay />
                  </button>
                </div>
                <img
                  src={music?.image ? music?.image : "images/user.png"}
                  alt={music?.name}
                  className="w-full h-full object-cover rounded-lg"
                />
              </>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}

export default WatchPage;
