import { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { updateMe, uploadAvatar } from '../services/userService';
import { getMySubscription } from '../services/subscriptionService';
import { getProjects } from '../services/projectService';

export const useProfileFetch = () => {
  const { user, updateUser } = useAuth();
  const [subscription, setSubscription] = useState(null);
  const [projectsCount, setProjectsCount] = useState(0);
  const [totalDocs, setTotalDocs] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [saveError, setSaveError] = useState('');
  const [isUploadingAvatar, setIsUploadingAvatar] = useState(false);
  const [editData, setEditData] = useState({ displayName: '' });

  useEffect(() => {
    (async () => {
      const [sub, projects] = await Promise.all([getMySubscription(), getProjects()]);
      setSubscription(sub);
      setProjectsCount(projects.length);
      setTotalDocs(projects.reduce((sum, p) => sum + (p.docsGenerated?.length || 0), 0));
      setEditData({ displayName: user?.displayName || '' });
    })();
  }, [user]);

  const handleEditToggle = () => {
    setEditData({ displayName: user?.displayName || '' });
    setSaveError('');
    setIsEditing(true);
  };

  const handleSave = async () => {
    setIsSaving(true);
    setSaveError('');
    try {
      const updated = await updateMe({ displayName: editData.displayName });
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
    } catch { 
      // silent fail
    } finally {
      setIsUploadingAvatar(false);
    }
  };

  return {
    user, subscription, projectsCount, totalDocs,
    isEditing, setIsEditing, isSaving, saveError,
    editData, setEditData, handleEditToggle, handleSave, handleAvatarUpload,
    isUploadingAvatar
  };
};
