"use client";
import React from "react";
import ProfilePage from "./page";
import { useAppContext } from "../context-provider";

const ProfileLayout = () => {
  const { user } = useAppContext();
  return <div>{user && <ProfilePage user={user} />}</div>;
};

export default ProfileLayout;
