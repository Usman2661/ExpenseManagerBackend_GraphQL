const AdminSeniorManagementPermission = async (user) => {
  if (!user) {
    return false;
  }
  if (user.userType !== 'Admin' && user.userType !== 'SeniorManagement') {
    return false;
  }

  return true;
};

module.exports = AdminSeniorManagementPermission;
