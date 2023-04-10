import React from "react";
import Titles from "../Titles";
import { BsCollectionFill } from "react-icons/bs";
import Music from "../Music";
import Loader from "../Notfications/Loader";
import { Empty } from "../Notfications/Empty";

function PopularMusics({ isLoading, musics }) {
  return (
    <div className="my-16">
      <Titles title="Popular Musics" Icon={BsCollectionFill} />
      {isLoading ? (
        <Loader />
      ) : musics?.length > 0 ? (
        <div className="grid sm:mt-12 mt-6 xl:grid-cols-4 lg:grid-cols-3 sm:grid-cols-2 grid-cols-1 gap-10">
          {musics?.slice(0, 8).map((music, index) => (
            <Music key={index} music={music} />
          ))}
        </div>
      ) : (
        <div className="mt-6">
          <Empty message="It seem's like we dont have any music" />
        </div>
      )}
    </div>
  );
}

export default PopularMusics;
