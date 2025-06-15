import React from "react";

function AvatarGroup({ avatars, maxvVisible }) {
  return (
    <div className=" flex items-center">
      {avatars.slice(0, maxvVisible).map((avatar, index) => (
        <img
          className=" w-9 h-9 rounded-full border-2 border-white -ml-3 first:ml-0"
          key={index}
          src={avatar}
          alt={`Avatar ${index}`}
        />
      ))}
      {avatars.length > maxvVisible && (
        <div className=" w-9 h-9 flex justify-center items-center bg-blue-50 text-sm font-medium rounded-full border-2 border-white -ml-3">
          +{avatars.length - maxvVisible}
        </div>
      )}
    </div>
  );
}

export default AvatarGroup;
