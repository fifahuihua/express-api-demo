const convertUserInfo = function(userModelData) {
  if (!userModelData) {
    return null;
  }

  return {
    username: userModelData.username,
    email: userModelData.email,
    id: userModelData._id,
    displayName: userModelData.displayName
  };
};

module.exports = {
  convertUserInfo
};
