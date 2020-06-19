const AdminPermission = async (user) => {
  if (!user) {
    return false;
  }
  if (user.userType !== 'Admin') {
    return false;
  }

  return true;
};

module.exports = AdminPermission;
