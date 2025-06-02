
import React, { Suspense, useState } from "react";
import {
  BrowserRouter,
  createBrowserRouter,
  Outlet,
  Route,
  Router,
  RouterProvider,
  Routes,
  useLocation,
} from "react-router-dom";


import Client from "../Client/index";

import AuthContextProvider, { useAuth } from "../Client/Component/AuthContext";
// import { ChatProvider, SocketProvider } from "../Client/Component/ChatContext";






export default () => {

    const token = localStorage.getItem('authSubAdminToken');

  const router = createBrowserRouter([
    ...Client,
  ]);

  return (

      
    <AuthContextProvider>
  {/* <ChatProvider> */}
    <Suspense fallback={<div style={{background:"#4c086c", height:"100vh", width:"100%"}}> <p style={{color:"#fff"}}><img src="/img/Spinner-1s-200px.svg" alt="" /></p></div>}>
      <RouterProvider router={router} />
    </Suspense>
    {/* </ChatProvider> */}
    
    </AuthContextProvider>

  )
}
