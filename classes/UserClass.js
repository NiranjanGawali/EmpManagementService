var userClass = function () {};

userClass.prototype.signupUser = async (body, serviceCall, req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await serviceCall.signupUserMethod(body, req);
      resolve(result);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

userClass.prototype.loginUser = async (body, serviceCall, req) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await serviceCall.loginUserMethod(body, req);
      resolve(result);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

module.exports = userClass;
