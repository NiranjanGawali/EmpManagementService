var employeeClass = function () {};

employeeClass.prototype.getEmployeeData = async (
  param,
  tokenData,
  serviceCall,
  req
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await serviceCall.getEmployeeDataMethod(
        param,
        tokenData,
        req
      );
      resolve(result);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

employeeClass.prototype.addEmployeeData = async (
  reqBody,
  tokenData,
  serviceCall,
  req
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await serviceCall.addEmployeeDataMethod(
        reqBody,
        tokenData,
        req
      );
      resolve(result);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

employeeClass.prototype.deleteEmployeeData = async (
  param,
  tokenData,
  serviceCall,
  req
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await serviceCall.deleteEmployeeDataMethod(
        param,
        tokenData,
        req
      );
      resolve(result);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

employeeClass.prototype.updateEmployeeData = async (
  reqBody,
  tokenData,
  serviceCall,
  req
) => {
  return new Promise(async (resolve, reject) => {
    try {
      let result = await serviceCall.updateEmployeeDataMethod(
        reqBody,
        tokenData,
        req
      );
      resolve(result);
    } catch (err) {
      console.error(err);
      reject(err);
    }
  });
};

module.exports = employeeClass;
