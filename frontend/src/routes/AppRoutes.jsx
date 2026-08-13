import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from '../pages/Home';
import Login from '../pages/Login';
import Register from '../pages/Register';
import ForgotPassword from '../pages/ForgotPassword';
import ResetPassword from '../pages/ResetPassword';
import Dashboard from '../pages/Dashboard';
import Profile from '../pages/Profile';
import Settings from '../pages/Settings';
import CreateProject from '../pages/CreateProject';
import ProjectDetail from '../pages/ProjectDetail';
import Pricing from '../pages/Pricing';
import Features from '../pages/Features';
import Workspace from '../pages/Workspace';
import PrivateRoute from '../components/common/PrivateRoute';
import PublicOnlyRoute from '../components/common/PublicOnlyRoute';
import ProjectChat from '../pages/ProjectChat';
import ProjectSkills from '../pages/ProjectSkills';
import ProjectDesignSystemPage from '../pages/ProjectDesignSystemPage';
import ProjectStackPage from '../pages/ProjectStackPage';
import CustomProjectStackPage from '../pages/CustomProjectStackPage';
import Feedback from '../pages/Feedback';
import ClarifyationSetupGuidePage from '../pages/ClarifyationSetupGuidePage';
import McpSetupGuidePage from '../pages/McpSetupGuidePage';
import Marketplace from '../pages/Marketplace';
import ComponentDetail from '../pages/ComponentDetail';
import EmbedComponent from '../pages/EmbedComponent';
import CreateComponent from '../pages/CreateComponent';
import PublicProfile from '../pages/PublicProfile';
import FollowersPage from '../pages/FollowersPage';
import Leaderboard from '../pages/Leaderboard';
import EditorPage from '../pages/EditorPage';

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/components" element={<Marketplace />} />
      <Route path="/components/:id" element={<ComponentDetail />} />
      <Route path="/leaderboard" element={<Leaderboard />} />
      <Route path="/profile/:userId" element={<PublicProfile />} />
      <Route path="/profile/:userId/followers" element={<FollowersPage />} />
      <Route path="/embed/components/:id" element={<EmbedComponent />} />
      <Route path="/feedback" element={<Feedback />} />

      <Route element={<PublicOnlyRoute />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Route>

      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/reset-password" element={<ResetPassword />} />
      <Route path="/pricing" element={<Pricing />} />
      <Route path="/features" element={<Features />} />

      <Route element={<PrivateRoute />}>
        <Route path="/components/create" element={<CreateComponent />} />
        <Route path="/components/edit/:id" element={<CreateComponent />} />
        <Route path="/editor/:id" element={<EditorPage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/docs/clarifyation-setup" element={<ClarifyationSetupGuidePage />} />
        <Route path="/docs/mcp-setup" element={<McpSetupGuidePage />} />
        <Route path="/projects/new" element={<CreateProject />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/projects/:id/workspace" element={<Workspace />} />
        <Route path="/projects/:id/chat" element={<ProjectChat />} />
        <Route path="/projects/:id/skills" element={<ProjectSkills />} />
        <Route path="/projects/:id/design-system" element={<ProjectDesignSystemPage />} />
        <Route path="/projects/:id/stack" element={<ProjectStackPage />} />
        <Route path="/projects/:id/stack/custom" element={<CustomProjectStackPage />} />
      </Route>
    </Routes>
  );
}
