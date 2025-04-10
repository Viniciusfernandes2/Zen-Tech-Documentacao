import {
    BrowserRouter as Router,
    Routes,
    Route,
    useLocation,
  } from "react-router-dom";

import Login from "../pages/Login";
import HomePage from "../pages/HomePage";

export const AppRouter = () => {
    const location = useLocation();
    return (
      
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Login/>} />
          <Route path="/home-page" element={<HomePage />} />
          </Routes>
    );
  };
  