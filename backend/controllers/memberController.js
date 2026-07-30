const memberService = require('../services/memberService');
const asyncWrapper = require('../utils/asyncWrapper');

exports.getMembers = asyncWrapper(async (req, res) => {
  const data = await memberService.getProjectMembers(req.params.id, req.user.id);
  res.status(200).json({ success: true, data });
});

exports.inviteMember = asyncWrapper(async (req, res) => {
  const { email, role } = req.body;
  const members = await memberService.inviteMember(req.params.id, req.user.id, { email, role });
  res.status(200).json({ success: true, data: members });
});

exports.updateMemberRole = asyncWrapper(async (req, res) => {
  const { role } = req.body;
  const members = await memberService.updateMemberRole(req.params.id, req.user.id, req.params.memberId, role);
  res.status(200).json({ success: true, data: members });
});

exports.removeMember = asyncWrapper(async (req, res) => {
  const members = await memberService.removeMember(req.params.id, req.user.id, req.params.memberId);
  res.status(200).json({ success: true, data: members });
});
