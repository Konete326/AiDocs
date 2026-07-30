const Project = require('../models/Project');
const User = require('../models/User');
const AppError = require('../utils/AppError');

exports.getProjectMembers = async (projectId, currentUserId) => {
  const project = await Project.findById(projectId).populate('userId', 'displayName email avatarUrl');
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  const isOwner = project.userId._id.toString() === currentUserId;
  const isMember = project.members.some(m => m.userId?.toString() === currentUserId || m.email === currentUserId);
  if (!isOwner && !isMember) throw new AppError('Access denied', 403, 'FORBIDDEN');

  return {
    owner: {
      userId: project.userId._id,
      displayName: project.userId.displayName,
      email: project.userId.email,
      avatarUrl: project.userId.avatarUrl,
      role: 'owner'
    },
    members: project.members
  };
};

exports.inviteMember = async (projectId, currentUserId, { email, role }) => {
  const project = await Project.findById(projectId);
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  if (project.userId.toString() !== currentUserId) {
    const callerMember = project.members.find(m => m.userId?.toString() === currentUserId);
    if (!callerMember || callerMember.role !== 'admin') {
      throw new AppError('Only project owner or admin can invite members', 403, 'FORBIDDEN');
    }
  }

  const cleanEmail = email.toLowerCase().trim();
  if (project.members.some(m => m.email.toLowerCase() === cleanEmail)) {
    throw new AppError('User is already invited to this project', 400, 'ALREADY_EXISTS');
  }

  const targetUser = await User.findOne({ email: cleanEmail });

  project.members.push({
    email: cleanEmail,
    role: role || 'editor',
    userId: targetUser ? targetUser._id : undefined,
    invitedAt: new Date()
  });

  await project.save();
  return project.members;
};

exports.updateMemberRole = async (projectId, currentUserId, memberId, role) => {
  const project = await Project.findById(projectId);
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  if (project.userId.toString() !== currentUserId) {
    const callerMember = project.members.find(m => m.userId?.toString() === currentUserId);
    if (!callerMember || callerMember.role !== 'admin') {
      throw new AppError('Only project owner or admin can modify roles', 403, 'FORBIDDEN');
    }
  }

  const member = project.members.id(memberId);
  if (!member) throw new AppError('Member not found', 404, 'NOT_FOUND');

  member.role = role;
  await project.save();
  return project.members;
};

exports.removeMember = async (projectId, currentUserId, memberId) => {
  const project = await Project.findById(projectId);
  if (!project) throw new AppError('Project not found', 404, 'NOT_FOUND');

  if (project.userId.toString() !== currentUserId) {
    const callerMember = project.members.find(m => m.userId?.toString() === currentUserId);
    if (!callerMember || callerMember.role !== 'admin') {
      throw new AppError('Only project owner or admin can remove members', 403, 'FORBIDDEN');
    }
  }

  project.members.pull(memberId);
  await project.save();
  return project.members;
};
