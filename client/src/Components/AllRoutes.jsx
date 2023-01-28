import AboutUs from "Pages/AboutUs/AboutUs";
import ContactUsPage from "Pages/ContactUs/ContactUsPage";
import DashBoardAndUserView from "Pages/DashBoardAndBooking/DashBoardAndBooking";
import HomePage from "Pages/HomePage/HomePage";
import { LoginPage } from "Pages/LoginPage/LoginPage";
import { ProfilePage } from "Pages/ProfilePage/ProfilePage";
import React from "react";
import { Routes, Route } from "react-router-dom";
export const AllRoutes = () => {
  return (
    <Routes>
      <Route path={"/"} element={<HomePage />} />
      <Route path={"/login"} element={<LoginPage />} />
      <Route path={"/:page"} element={<LoginPage />} />
      <Route path={"/about"} element={<AboutUs />} />
      <Route path={"/contact"} element={<ContactUsPage />} />
      <Route path={"/contact"} element={<ContactUsPage />} />
      <Route path={"/profile/:UID"} element={<ProfilePage />} />
      <Route path={"/service/:UID/:SID"} element={<DashBoardAndUserView />} />
    </Routes>
  );
};
