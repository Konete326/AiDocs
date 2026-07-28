import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateMe, uploadAvatar, getMyStats, uploadBgImage } from '../services/userService';
import { getMySubscription } from '../services/subscriptionService';
import { getProjects } from '../services/projectService';

export const useProfileFetch = () => {
  const { user, updateUser } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [projectsCount, setProjectsCount] = useState(0);
  const [completedCount, setCompletedCount] = useState(0);
  const [totalDocs, setTotalDocs] = useState(0);
  const [stats, setStats] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [isUploadingBg, setIsUploadingBg] = useState(false);
  const [editData, setEditData] = useState({ displayName: '', bio: '' });

  useEffect(() => {
    (async () => {
      const [sub, projects, userStats] = await Promise.all([getMySubscription(), getProjects(), getMyStats()]);
      setSubscription(sub);
      setProjectsCount(projects.length);
      setCompletedCount(projects.filter(p => p.status === 'complete').length);
      setTotalDocs(projects.reduce((sum, p) => sum + (p.docsGenerated?.length || 0), 0));
      setStats(userStats);
      setEditData({ displayName: user?.displayName || '', bio: user?.bio || '' });
    })();
  }, [user]);

  const handleEditToggle = () => {
    setEditData({ displayName: user?.displayName || '', bio: user?.bio || '' });
    setSaveError('');
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    try {
      const updated = await updateMe({ displayName: editData.displayName, bio: editData.bio });
      updateUser(updated);
      setIsEditing(false);
    } catch { setSaveError('Save failed. Please try again.'); }
    finally { setIsSaving(false); }
  };

  const handleAvatarUpload = async (file) => {
    setIsUploadingAvatar(true);
    try {
      const updated = await uploadAvatar(file);
      updateUser(updated);
    } catch { }
    finally { setIsUploadingAvatar(false); }
  };

  const handleBgUpload = async (file) => {
    setIsUploadingBg(true);
    try {
      const updated = await uploadBgImage(file);
      updateUser(updated);
    } catch { }
    finally { setIsUploadingBg(false); }
  };

  return {
    user, subscription, projectsCount, completedCount, totalDocs, stats,
    isEditing, setIsEditing, isSaving, saveError,
    editData, setEditData, handleEditToggle, handleSave,
    handleAvatarUpload, isUploadingAvatar,
    handleBgUpload, isUploadingBg,
  };
};
