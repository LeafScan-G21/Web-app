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
          <Route path="/weather" element={<WeatherDataShow />} />
        </Route>

        {/* Forum Layout */}
        <Route element={
          <ProtectedRoute>
          <ForumLayout />
          </ProtectedRoute>
        }>
          <Route path="/forum/*" element={<Forum />} />
          <Route path="/forum/post/:id" element={<PostView />} />
          <Route path="/forum/add" element={<AddPost />} />
          {/* Add other forum-related routes here */}
        </Route>

        {/* Catch-all */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/user-history" element={<UserHistory />} />
        <Route path="*" element={<NotFound />} />

      </Routes>
    </>
  );
}

export default App;
