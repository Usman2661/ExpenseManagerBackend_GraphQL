const SeniorManagementPermission = async (user) => {
  if (!user) {
    return false;
  }
  if (user.userType !== 'SeniorManagement') {
    return false;
  }

  return true;
};

module.exports = SeniorManagementPermission;
