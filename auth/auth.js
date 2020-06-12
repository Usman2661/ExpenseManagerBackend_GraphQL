const jwt = require('jsonwebtoken');

const getUser = (token) => {
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

module.exports = getUser;
