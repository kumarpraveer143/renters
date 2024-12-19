import React from "react";
import { Outlet } from "react-router-dom";
import PageNotFound from "../../pages/PageNotFound";

const LandownerAuth = () => {
  const user = JSON.parse(localStorage.getItem("user"));

  return user?.userType === "landowner" ? <Outlet /> : <PageNotFound />;
};

export default LandownerAuth;
