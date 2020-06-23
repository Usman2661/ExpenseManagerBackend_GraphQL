const ManagerSeniorManagementPermission = async (user) => {
  if (!user) {
    return false;
  }
  if (user.userType !== 'Manager' && user.userType !== 'SeniorManagement') {
    return false;
  }

  return true;
};

module.exports = ManagerSeniorManagementPermission;
