import React from "react";
import { IoArrowBackSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import Avatar from "react-avatar";

const Profile = () => {
  return (
    <div className="w-[50%] border-l border-r border-gray-200">
      <div className="flex items-center py-2">
        <Link
          to={"/"}
          className="p-2 rounded-full hover:bg-gray-100 cursor-pointer"
        >
          <IoArrowBackSharp size={"24px"} />
        </Link>
        <div className="ml-2">
          <h1 className="font-bold text-lg">Subrata Mahato</h1>
          <p className="text-gray-500 text-sm">57 posts</p>
        </div>
      </div>
      <div>
        <img
          src="https://pbs.twimg.com/profile_banners/1344601039387779073/1709661935/1080x360"
          alt=""
        />
        <div className="absolute top-52 ml-2 border-4 border-white rounded-full">
          <Avatar
            src="https://pbs.twimg.com/profile_images/1791364266190086144/dro7T6ca_400x400.jpg"
            size="120"
            round={true}
          />
        </div>
        <div className="text-right m-4">
          <button className="px-4 py-1 rounded-full hover:bg-gray-200 border border-gray-400">
            Edit Profile
          </button>
        </div>
        <div className="m-4">
            <h1 className="font-bold text-xl">Subrata Mahato</h1>
            <p>@2004subrata</p>
        </div>
        <div className="m-4 text-sm">
            <p>Web developer</p>
        </div>
      </div>
    </div>
  );
};

export default Profile;
