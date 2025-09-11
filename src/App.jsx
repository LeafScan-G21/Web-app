import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ForumLayout from "./components/layout/ForumLayout";
import { Toaster } from "react-hot-toast";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Forum from "./pages/forum/index.jsx";
import PostView from "./pages/forum/PostView.jsx";
import AddPost from "./pages/forum/AddPost.jsx";
import Diagnosis from "./pages/Diagnosis";
import WeatherDataShow from "./pages/weather/WeatherDataShow.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import UserHistory from "./pages/UserHistory.jsx";
import HistoryTest from "./pages/HistoryTest.jsx"; 
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";


import Prediction from "./pages/Prediction.jsx";
function App() {
  return (
    <>
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            marginTop: "4rem",
          },
        }}
      />
      <Routes>
        {/* Main Layout */}
        <Route element={<MainLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/diagnosis" element={<Diagnosis />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/weather" element={<WeatherDataShow />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
        </Route>

        <Route element={
          <ProtectedRoute>
          <ForumLayout />
          </ProtectedRoute>
        }>
          <Route path="/forum/*" element={<Forum />} />
          <Route path="/forum/post/:id" element={<PostView />} />
          <Route path="/forum/add" element={<AddPost />} />
        </Route>

        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-history" element={<UserHistory />} />
        <Route path="/history-test" element={<HistoryTest />} /> {/* Add the /history-test route */}
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;
