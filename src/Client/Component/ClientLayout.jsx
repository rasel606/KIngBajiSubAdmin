
import React from "react";
import { MdCampaign, MdLeaderboard } from "react-icons/md";
import { FaHandshake, FaMessage } from "react-icons/fa6";
import { FaDownload, FaUsers } from "react-icons/fa";
import { IoLogoGameControllerB, IoMdSettings } from "react-icons/io";
import { FcAbout } from "react-icons/fc";
import { TbAffiliate } from "react-icons/tb";

import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/js/dist/dropdown";
import "bootstrap/js/dist/collapse";
import "./SideBar.css";
import { Outlet } from "react-router-dom";

import { useSystem } from "../../Utils/System";

import { Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import "./SideBar.css";
import { useState } from "react";
import TopMemuBar from "./TopMemuBar";



export default ({ system, rotateded }) => {
  // const { t } = system;

  return (
    <div className="" 
    >
      <TopMemuBar />
    </div>
  );
};
