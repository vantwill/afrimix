import React from "react";
import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { IfMusicLiked, LikeMusic } from "../Context/Functionalities";

function Music({ music }) {
  const { isLoading } = useSelector((state) => state.userLikeMusic);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.userLogin);

  // if liked function
  const isLiked = IfMusicLiked(music);
  return (
    <>
      <div className="border border-border p-1 hover:scale-95 transitions relative rounded overflow-hidden">
        <Link to={`/music/${music?._id}`} className="w-full">
          <img
            src={music?.image ? music?.image : "/images/user.png"}
            alt={music?.name}
            className="w-full h-64 object-cover"
          />
        </Link>
        <div className="absolute flex-btn gap-2 bottom-0 right-0 left-0 bg-main bg-opacity-60 text-white px-4 py-3">
          <h3 className="font-semibold truncate">{music?.name}</h3>
          <button
            onClick={() => LikeMusic(music, dispatch, userInfo)}
            disabled={isLiked || isLoading}
            className={`h-9 w-9 text-sm flex-colo transitions
           ${isLiked ? "bg-transparent" : "bg-subMain"}
            hover:bg-transparent border-2 border-subMain rounded-md  text-white`}
          >
            <FaHeart />
          </button>
        </div>
      </div>
    </>
  );
}

export default Music;
