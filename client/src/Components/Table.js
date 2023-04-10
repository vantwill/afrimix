import React from "react";
import { FaCloudDownloadAlt, FaEdit } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { Link } from "react-router-dom";
import { GoEye } from "react-icons/go";

const Head = "text-xs text-left text-main font-semibold px-6 py-2 uppercase";
const Text = "text-sm text-left leading-6 whitespace-nowrap px-5 py-3";

// rows
const Rows = (music, i, onDeleteHandler, admin, downloadVideo, progress) => {
  return (
    <tr key={i}>
      <td className={`${Text}`}>
        <div className="w-12 p-1 bg-dry border border-border h-12 rounded overflow-hidden">
          <img
            className="h-full w-full object-cover"
            src={music?.image ? music?.image : "/images/user.png"}
            alt={music?.name}
          />
        </div>
      </td>
      <td className={`${Text} truncate`}>{music.name}</td>
      <td className={`${Text}`}>{music.category}</td>
      <td className={`${Text}`}>{music.language}</td>
      <td className={`${Text}`}>{music.year}</td>
      <td className={`${Text}`}>{music.time}hr</td>
      <td className={`${Text} float-right flex-rows gap-2`}>
        {admin ? (
          <>
            <Link
              to={`/edit/${music?._id}`}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2"
            >
              Edit <FaEdit className="text-green-500" />
            </Link>
            <button
              onClick={() => onDeleteHandler(music?._id)}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <MdDelete />
            </button>
          </>
        ) : (
          <>
            <button
              onClick={() => downloadVideo(music?.video, music?.name)}
              disabled={progress > 0 && progress < 100}
              className="border border-border bg-dry flex-rows gap-2 text-border rounded py-1 px-2"
            >
              Download <FaCloudDownloadAlt className="text-green-500" />
            </button>
            <Link
              to={`/music/${music?._id}`}
              className="bg-subMain text-white rounded flex-colo w-6 h-6"
            >
              <GoEye />
            </Link>
          </>
        )}
      </td>
    </tr>
  );
};

// table
function Table({ data, admin, onDeleteHandler, downloadVideo, progress }) {
  return (
    <div className="overflow-x-scroll overflow-hidden relative w-full">
      <table className="w-full table-auto border border-border divide-y divide-border">
        <thead>
          <tr className="bg-dryGray">
            <th scope="col" className={`${Head}`}>
              Image
            </th>
            <th scope="col" className={`${Head}`}>
              Name
            </th>
            <th scope="col" className={`${Head}`}>
              Category
            </th>
            <th scope="col" className={`${Head}`}>
              Language
            </th>
            <th scope="col" className={`${Head}`}>
              Year
            </th>
            <th scope="col" className={`${Head}`}>
              Hours
            </th>
            <th scope="col" className={`${Head} text-end`}>
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-main divide-y divide-gray-800">
          {data.map((music, i) =>
            Rows(music, i, onDeleteHandler, admin, downloadVideo, progress)
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
