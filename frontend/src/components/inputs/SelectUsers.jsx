import React, { useEffect, useState } from "react";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATH } from "../../utils/apiPath";
import { LuUser, LuUsers } from "react-icons/lu";
import Model from "../Model";
import AvatarGroup from "../AvatarGroup";

function SelectUsers({ selectedUsers, setSelectedUsers }) {
  const [allUsers, setAllUsers] = useState([]);
  const [isModelOpen, setIsModelOpen] = useState(false);
  const [tempSelectedUsers, SetTempSelectedUsers] = useState([]);

  const getAllUsers = async () => {
    try {
      const res = await axiosInstance.get(API_PATH.USERS.GET_ALL_USERS);
      if (res.data?.length > 0) {
        setAllUsers(res.data);
      }
    } catch (error) {
      console.error("ERROR Fetching Users", error);
    }
  };

  const toggleUserSelection = (userId) => {
    SetTempSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId]
    );
  };

  const handelAssign = () => {
    setSelectedUsers(tempSelectedUsers);
    setIsModelOpen(false);
  };

  const selectedUserAvatars = allUsers
    .filter((user) => selectedUsers.includes(user._id))
    .map((user) => user.profileImageUrl);

  useEffect(() => {
    getAllUsers();
  }, []);

  useEffect(() => {
    if (selectedUsers.length === 0) {
      SetTempSelectedUsers([]);
    }

    return () => {};
  }, [selectedUsers]);

  return (
    <div className=" space-y-4 mt-2">
      {selectedUserAvatars.length === 0 && (
        <button className="card-btn" onClick={() => setIsModelOpen(true)}>
          <LuUsers className="text-sm" /> Add Member
        </button>
      )}

      {selectedUserAvatars.length > 0 && (
        <div className=" cursor-pointer" onClick={() => setIsModelOpen(true)}>
          <AvatarGroup avatars={selectedUserAvatars} maxvVisible={3} />
        </div>
      )}

      <Model
        isOpen={isModelOpen}
        onClose={() => setIsModelOpen(false)}
        title="Select Users"
      >
        <div className=" space-y-4 h-[60vh] overflow-y-auto">
          {allUsers.map((user) => (
            <div
              className=" flex items-center gap-4 p-3 border-b border-gray-200 "
              key={user._id}
            >
              <img
                className=" w-10 h-10 rounded-full"
                src={user.profileImageUrl}
                alt={user.name}
              />
              <div className=" flex-1">
                <p className=" font-medium text-gray-800 dark:text-white">
                  {user.name}
                </p>
                <p className=" text-[13px] text-gray-500">{user.email}</p>
              </div>
              <input
                type="checkbox"
                checked={tempSelectedUsers.includes(user._id)}
                onChange={() => toggleUserSelection(user._id)}
                className=" w-4 h-4 text-primary bg-gray-100 border-gray-300 rounded-sm outline-none"
              />
            </div>
          ))}
        </div>

        <div className=" flex justify-end gap-4 pt-4">
          <button className=" card-btn" onClick={() => setIsModelOpen(false)}>
            CANCLE
          </button>
          <button className="card-btn-fill" onClick={handelAssign}>
            DONE
          </button>
        </div>
      </Model>
    </div>
  );
}

export default SelectUsers;
