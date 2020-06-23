const UserPermission = async (user) => {
  if (!user) {
    return false;
  }

  return true;
};

module.exports = UserPermission;
