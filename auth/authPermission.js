const jwt = require('jsonwebtoken');

const UserPermission = (user) => {
  console.log('I am being called');
  console.log(user);
  try {
    console.log('I was reached');
    if (user) {
      console.log('I True was reached');

      return true;
    }
    console.log('I False was reached');

    return false;
  } catch (err) {
    console.log('I Catch False was reached');

    return false;
  }
};
const ManagerPermission = (user) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      return user;
    }
    return null;
  } catch (err) {
    return null;
  }
};
const ManagerAndSeniorManagementPermission = (user) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      return user;
    }
    return null;
  } catch (err) {
    return null;
  }
};
const SeniorManagementPermission = (user) => {
  try {
    if (token) {
      const user = jwt.verify(token, process.env.JWT_SECRET);

      return user;
    }
    return null;
  } catch (err) {
    return null;
  }
};

module.exports = UserPermission;
module.exports = ManagerPermission;
module.exports = SeniorManagementPermission;
module.exports = ManagerAndSeniorManagementPermission;
