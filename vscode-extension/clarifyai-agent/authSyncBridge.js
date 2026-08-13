let activeAuthToken = null;
let currentUser = null;

function setAuthToken(token, user = null) {
  activeAuthToken = token || null;
  currentUser = user || null;
}

function getAuthToken() {
  return activeAuthToken;
}

function getCurrentUser() {
  return currentUser;
}

function getAuthHeaders() {
  if (!activeAuthToken) return {};
  return {
    'Authorization': `Bearer ${activeAuthToken}`
  };
}

module.exports = {
  setAuthToken,
  getAuthToken,
  getCurrentUser,
  getAuthHeaders
};
