import React from "react";
import { Routes, Route } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import ForumLayout from "./components/layout/ForumLayout";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Forum from "./pages/forum/index.jsx";
import PostView from "./pages/forum/PostView.jsx"; // Importing PostView for forum post details

function App() {
  return (
    <Routes>
      {/* Main Layout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      {/* Forum Layout */}
      <Route element={<ForumLayout />}>
        <Route path="/forum/*" element={<Forum />} />
        <Route path="/forum/post/:id" element={<PostView />} />
        {/* Add other forum-related routes here */}
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
