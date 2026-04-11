import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import CreateProject from '../pages/CreateProject';
import ProjectDetail from '../pages/ProjectDetail';
import Pricing from '../pages/Pricing';
import Workspace from '../pages/Workspace';
import PrivateRoute from '../components/common/PrivateRoute';
import PublicOnlyRoute from '../components/common/PublicOnlyRoute';
import ProjectChat from '../pages/ProjectChat';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
      <Route path="/pricing" element={<Pricing />} />
      
      {/* Protected Routes */}
      <Route element={<PrivateRoute />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/:id/workspace" element={<Workspace />} />
        <Route path="/projects/:id/chat" element={<ProjectChat />} />
      </Route>
    </Routes>
  );
}
