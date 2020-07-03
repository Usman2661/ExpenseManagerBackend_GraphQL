const ManagerSeniorManagementPermission = async (user) => {
  if (!user) {
    console.log('This is reached not user');
    return false;
  }
  if (user.userType !== 'Manager' && user.userType !== 'SeniorManagement') {
    console.log('This is reached');
    return false;
  }

  return true;
};

module.exports = ManagerSeniorManagementPermission;
