import React from "react";
import { useUserAuth } from "../../hooks/useUserAuth";

function UsersDashBoards() {
  useUserAuth();
  return <div>UsersDashBoards</div>;
}

export default UsersDashBoards;
