import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { TbPlayerTrackNext, TbPlayerTrackPrev } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import { Empty } from "../../../Components/Notfications/Empty";
import Loader from "../../../Components/Notfications/Loader";
import Table from "../../../Components/Table";
import {
  deleteAllMusicsAction,
  deleteMusicAction,
  getAllMusicsAction,
} from "../../../Redux/Actions/MusicsActions";
import SideBar from "../SideBar";

function MusicsList() {
  const dispatch = useDispatch();
  const sameClass =
    "text-white p-2 rounded font-semibold border-2 border-subMain hover:bg-subMain";
  // all musics
  const { isLoading, isError, musics, pages, page } = useSelector(
    (state) => state.getAllMusics
  );
  // delete
  const { isLoading: deleteLoading, isError: deleteError } = useSelector(
    (state) => state.deleteMusic
  );
  // delete all
  const { isLoading: allLoading, isError: allError } = useSelector(
    (state) => state.deleteAllMusics
  );

  // delete music handler
  const deleteMusicHandler = (id) => {
    window.confirm("Are you sure you want do delete this music?") &&
      dispatch(deleteMusicAction(id));
  };

  // delete all musics handler
  const deleteAllMusicsHandler = () => {
    window.confirm("Are you sure you want do delete all musics?") &&
      dispatch(deleteAllMusicsAction());
  };

  // useEffect
  useEffect(() => {
    dispatch(getAllMusicsAction({}));
    // errors
    if (isError || deleteError || allError) {
      toast.error(isError || deleteError || allError);
    }
  }, [dispatch, isError, deleteError, allError]);

  // pagination next and pev pages
  const nextPage = () => {
    dispatch(
      getAllMusicsAction({
        pageNumber: page + 1,
      })
    );
  };
  const prevPage = () => {
    dispatch(
      getAllMusicsAction({
        pageNumber: page - 1,
      })
    );
  };

  return (
    <SideBar>
      <div className="flex flex-col gap-6">
        <div className="flex-btn gap-2">
          <h2 className="text-xl font-bold">Musics List</h2>
          {musics?.length > 0 && (
            <button
              disabled={allLoading}
              onClick={deleteAllMusicsHandler}
              className="bg-main font-medium transitions hover:bg-subMain border border-subMain text-white py-3 px-6 rounded"
            >
              {allLoading ? "Deleting..." : "Delete All"}
            </button>
          )}
        </div>
        {isLoading || deleteLoading ? (
          <Loader />
        ) : musics?.length > 0 ? (
          <>
            <Table
              data={musics}
              admin={true}
              onDeleteHandler={deleteMusicHandler}
            />
            {/* Loading More */}
            <div className="w-full flex-rows gap-6 my-5">
              <button
                onClick={prevPage}
                disabled={page === 1}
                className={sameClass}
              >
                <TbPlayerTrackPrev className="text-xl" />
              </button>
              <button
                onClick={nextPage}
                disabled={page === pages}
                className={sameClass}
              >
                <TbPlayerTrackNext className="text-xl" />
              </button>
            </div>
          </>
        ) : (
          <Empty message="You have no musics" />
        )}
      </div>
    </SideBar>
  );
}

export default MusicsList;
