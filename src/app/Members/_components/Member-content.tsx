import React from "react";
import ListMember from "./ListMember";
import ListUserRequest from "./ListUserRequest";

const MemberContent = () => {
  return (
    <div className="flex px-5">
      <div className="flex-1">
        <ListMember />
      </div>
      <div className="w-10"></div>
      <div className="w-1/3">
        <ListUserRequest />
      </div>
    </div>
  );
};

export default MemberContent;
