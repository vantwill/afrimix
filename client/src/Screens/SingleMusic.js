import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MusicCasts from "../Components/Single/MusicCasts";
import MusicInfo from "../Components/Single/MusicInfo";
import MusicRates from "../Components/Single/MusicRates";
import Titles from "../Components/Titles";
import Layout from "../Layout/Layout";
import { BsCollectionFill } from "react-icons/bs";
import Music from "../Components/Music";
import ShareMusicModal from "../Components/Modals/ShareModal";
import { useDispatch, useSelector } from "react-redux";
import { getMusicByIdAction } from "../Redux/Actions/MusicsActions";
import Loader from "../Components/Notfications/Loader";
import { RiMusic2Line } from "react-icons/ri";
import { SidebarContext } from "../Context/DrawerContext";
import { DownloadVideo } from "../Context/Functionalities";
import FileSaver from "file-saver";

function SingleMusic() {
  const [modalOpen, setModalOpen] = useState(false);
  const { progress, setprogress } = useContext(SidebarContext);
  const { id } = useParams();
  const dispatch = useDispatch();
  const sameClass = "w-full gap-6 flex-colo min-h-screen";
  // use Selector
  const { isLoading, isError, music } = useSelector(
    (state) => state.getMusicById
  );
  const { musics } = useSelector((state) => state.getAllMusics);
  // related musics
  const RelatedMusics = musics?.filter((m) => m.category === music?.category);

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
      {isLoading ? (
        <div className={sameClass}>
          <Loader />
        </div>
      ) : isError ? (
        <div className={sameClass}>
          <div className="flex-colo w-24 h-24 p-5 mb-4 rounded-full bg-dry text-subMain text-4xl">
            <RiMusic2Line />
          </div>
          <p className="text-border text-sm">Something went wrong</p>
        </div>
      ) : (
        <>
          <ShareMusicModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            music={music}
          />
          <MusicInfo
            music={music}
            setModalOpen={setModalOpen}
            DownloadVideo={DownloadMusicVideo}
            progress={progress}
          />
          <div className="container mx-auto min-h-screen px-2 my-6">
            <MusicCasts music={music} />
            {/* rate */}
            <MusicRates music={music} />
            {/* related */}
            {RelatedMusics?.length > 0 && (
              <div className="my-16">
                <Titles title="Related Musics" Icon={BsCollectionFill} />
                <div className="grid sm:mt-10 mt-6 xl:grid-cols-4 2xl:grid-cols-5 lg:grid-cols-3 sm:grid-cols-2 gap-6">
                  {RelatedMusics?.map((music) => (
                    <Music key={music?._id} music={music} />
                  ))}
                </div>
              </div>
            )}
          </div>
        </>
      )}
    </Layout>
  );
}

export default SingleMusic;
