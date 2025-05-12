import React, { Fragment, useRef, useState } from "react";
import { Accordion, Button, Container, Form, InputGroup, Modal, Navbar } from "react-bootstrap";
import { NavLink, Outlet } from "react-router-dom";
import {
  AiOutlineBank,
  AiOutlineUnorderedList,
  AiOutlineLogout,
  AiOutlineMenu,
  AiOutlineUser,
} from "react-icons/ai";
import {
  BsBagPlus,
  BsBagX,
  BsBox,
  BsCartPlus,
  BsCircle,
  BsGraphUp,
  BsPeople,
} from "react-icons/bs";
import { CiChat2 } from "react-icons/ci";
import { FaTelegram, FaUsers } from "react-icons/fa6";
import { MdEmail, MdLeaderboard } from "react-icons/md";
import { MdAccountBalance } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { PiHandDeposit, PiHandWithdraw } from "react-icons/pi";
import { RiDashboardLine } from "react-icons/ri";
import { TbCashBanknoteFilled, TbTruckDelivery } from "react-icons/tb";
import { IoCreateOutline } from "react-icons/io5";
// import AuthModels from "./Modals/AuthModels";
import { FaHistory } from "react-icons/fa";
import { useAuth } from "./AuthContext";
import AffiliateModal from "../Pages/AffiliateModal";
import AgentModal from "../Pages/AgentModal";
import SubAgentModal from "../Pages/SubAgentModal";
import CreateUserModal from "../Pages/CreateUserModal";
// import logo from "../../assets/images/Logo.svg";
// import {getUserDetails, removeSessions} from "../../helper/SessionHelper";
export default () => {
  const getUserDetails = "";
  let contentRef,
    sideNavRef,
    topNavRef = useRef();

  const [show, setShow] = useState(false);

  const { isAuthenticated, user, hasRole,logout } = useAuth();

  const [showAffiliate, setShowAffiliate] = useState(false);
  const [showAgent, setShowAgent] = useState(false);
  const [showSubAgent, setShowSubAgent] = useState(false);
  const [showUser, setShowUser] = useState(false);

  const MenuBarClickHandler = () => {
    let sideNav = sideNavRef;
    let content = contentRef;
    let topNav = topNavRef;
    if (sideNav.classList.contains("side-nav-open")) {
      sideNav.classList.add("side-nav-close");
      sideNav.classList.remove("side-nav-open");
      content.classList.add("content-expand");
      content.classList.remove("content");
      topNav.classList.remove("top-nav-open");
      topNav.classList.add("top-nav-close");
    } else {
      sideNav.classList.remove("side-nav-close");
      sideNav.classList.add("side-nav-open");
      content.classList.remove("content-expand");
      content.classList.add("content");
      topNav.classList.add("top-nav-open");
      topNav.classList.remove("top-nav-close");
    }
  };

  const isSidebarAccordionActive = () => {
    let urlList = [];
    sidebarItems.map((item) => {
      urlList.push(
        item.subMenu.map((subItem) => {
          return subItem?.url;
        })
      );
    });
    return urlList.findIndex((items) =>
      items.includes(window.location.pathname)
    );
  };



  const sidebarItems = [
    {
      title: "DashBoard",
      icon: <RiDashboardLine className="side-bar-item-icon" />,
      url: "/",
      subMenu: [],
    },
    {
      title: "Deposit",
      icon: <PiHandDeposit className="side-bar-item-icon" />,
      url: "subAdminDeposit",
      subMenu: [],
    },
    {
      title: "Widthraw",
      icon: <PiHandWithdraw className="side-bar-item-icon" />,
      url: "subAdminwidthrow",
      subMenu: [],
    },
    {
      title: "Getway",
      icon: <TbCashBanknoteFilled className="side-bar-item-icon" />,
      url: "subAdmingetway",
      subMenu: [],
    },
    {
      title: "All-Users",
      icon: <AiOutlineUser size={16} className="side-bar-item-icon" />,
      url: "userReport",
      subMenu: [],
    },
    // {
    //   title: "Affiliate",
    //   icon: <BsCartPlus className="side-bar-item-icon" />,

    //   subMenu: [
    //     {
    //       title: "Affiliate-List",
    //       icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
    //       url: "affiliate-list",
    //     },

    //     {
    //       title: "Widthrow History",
    //       icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
    //       url: "AffiliateWidthrow",
    //     },
    //   ],
    // },
    // {
    //   title: "All-Users",
    //   icon: <FaUsers className="side-bar-item-icon" />,
    //   url: "Affiliate-User",
    //   subMenu: [],
    // },

    // {
    //   title: "Leaderboard",
    //   icon: <MdLeaderboard className="side-bar-item-icon" />,
    //   url: "leaderboard",
    //   subMenu: [],
    // },

    {
      title: "LiveContact",
      icon: <BsCartPlus className="side-bar-item-icon" />,

      subMenu: [
        {
          title: "Live Chat",
          icon: <CiChat2 size={16} className="side-bar-subitem-icon" />,
          url: "contactus",
        },
        // {
        //   title: "Telegram",
        //   icon: <FaTelegram size={16} className="side-bar-subitem-icon" />,
        //   url: " ",
        // },
        // {
        //   title: "Admin Chat",
        //   icon: <CiChat2 size={16} className="side-bar-subitem-icon" />,
        //   url: " ",
        // },
        // {
        //   title: "Support-Email",
        //   icon: <MdEmail size={16} className="side-bar-subitem-icon" />,
        //   url: "",
        // },
      ],
    },

    {
      title: "My deposit",
      icon: <MdAccountBalance className="side-bar-item-icon" />,
      url: "MyDepisit",
      subMenu: [],
    },

    {
      title: "Report",
      icon: <BsGraphUp className="side-bar-item-icon" />,

      subMenu: [
        {
          title: "Deposit Report Approved",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "depositReportApproved",
        },
        {
          title: "deposit Report Reject",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "depositReportReject",
        },
        {
          title: "Widthraw Report Accept",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "widthrawReportAccept",
        },
        {
          title: "widthraw Report Reject",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "widthrawReportreject",
        },
        {
          title: "User Report",
          icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
          url: "userReport",
        },
        // {
        //   title: "Affiliate commission Report",
        //   icon: <BsCircle size={16} className="side-bar-subitem-icon" />,
        //   url: "affiliateCommissionReport",
        // },
      ],
    },
    {
      title: "My Account",
      icon: <CgProfile className="side-bar-item-icon" />,
      url: "profile",
      subMenu: [],
    },
    
  ];

  const onLogout = () => {
    // removeSessions();
  };
  return (
    <Fragment>
      <Navbar className="fixed-top px-0 ">
        <Container fluid={true}>
          <Navbar.Brand>
            <div
              ref={(div) => {
                topNavRef = div;
              }}
              className="top-nav-open"
            >
              <h4 className="text-white m-0 p-0">
                <a onClick={MenuBarClickHandler}>
                  <AiOutlineMenu />
                </a>
              </h4>
            </div>
          </Navbar.Brand>

          <div className="float-right h-auto d-flex align-items-center">
            <div className="header-desktop__former">
              <div className="header-desktop__latter">
                <div className="header-desktop__item header-desktop__auth-container auth-container ">
                  {/* <Button className="mx-2"
                    variant="primary"
                    onClick={() => setShowAffiliate(true)}
                  >
                    Affiliate
                  </Button>
                  <Button className="mx-2"
                    variant="secondary"
                    onClick={() => setShowAgent(true)}
                  >
                    Agent
                  </Button>
                  <Button className="mx-2"
                    variant="success"
                    onClick={() => setShowSubAgent(true)}
                  >
                    SubAgent
                  </Button> */}
                  <Button className="mx-2" onClick={() => setShowUser(true)}>
                    User
                  </Button>
                </div>

                <div className="header-desktop__item header-desktop__lang-switch">
                  <img
                    src="https://img.c88rx.com/cx/h5/assets/images/flag/BD.png?v=1732008579870&source=mcdsrc"
                    alt=""
                  />
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Navbar>

      <div
        ref={(div) => {
          sideNavRef = div;
        }}
        className="side-nav-open border-radius-0 "
      >
        <NavLink
          to="/"
          end
          className="d-flex  justify-content-center sticky-top "
        >
         <img src="https://ik.imagekit.io/fjs420h8f/kingbaji_2025-02-24_at_02.26.56_7859e755-removebg-preview.png?updatedAt=1740595806960" style={{width:"200px" , height:"40px", marginTop:"10px", marginBottom:"10px",marginLeft:"10px",marginRight:"10px"}} alt="" />
        </NavLink>

        <Accordion defaultActiveKey={`${isSidebarAccordionActive()}`}>
          {sidebarItems.map((item, index) => {
            return item.subMenu.length !== 0 ? (
              <Accordion.Item
                key={index.toString()}
                eventKey={`${index}`}
                className=" border-0"
              >
                <Accordion.Header>
                  <NavLink className="side-bar-item " to={item?.url}>
                    {item.icon}
                    <span className="side-bar-item-caption">{item.title}</span>
                  </NavLink>
                  
                </Accordion.Header>
                <Accordion.Body>
                  {item.subMenu.map((subItem, index) => (
                    <NavLink
                      key={index.toString()}
                      className={(navData) =>
                        navData.isActive
                          ? "side-bar-subitem-active side-bar-subitem "
                          : "side-bar-subitem"
                      }
                      to={subItem.url}
                      end
                    >
                      {subItem?.icon}
                      <span className="side-bar-subitem-caption">
                        {subItem?.title}
                      </span>
                    </NavLink>
                  ))}
                </Accordion.Body>
              </Accordion.Item>
            ) : (
              <NavLink
                className={(navData) =>
                  navData.isActive ? " side-bar-item " : "side-bar-item "
                }
                to={item.url}
                end
              >
                {item.icon}
                <span className="side-bar-item-caption">{item.title}</span>

              </NavLink>
              
            );
            
          })}
          
        </Accordion>
        <span className="side-bar-item " onClick={()=>logout()} style={{cursor:"pointer"}}><AiOutlineLogout className="side-bar-item-icon" /> logout</span>
      </div>

      <div ref={(div) => (contentRef = div)} className="content">
        <Outlet />
        <AffiliateModal show={showAffiliate} setShow={setShowAffiliate} />

        {/* Agent Modal */}
        <AgentModal show={showAgent} setShow={setShowAgent}>
 
        </AgentModal>

        {/* SubAgent Modal */}
        <SubAgentModal show={showSubAgent} setShow={setShowSubAgent}>
        </SubAgentModal>

        {/* User Modal */}
        <CreateUserModal show={showUser} setShow={setShowUser}>
         
        </CreateUserModal>
      </div>
    </Fragment>
  );
};
