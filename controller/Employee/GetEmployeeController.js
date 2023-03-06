var express = require('express');
var router = express.Router();
let employeeClass = require('../../classes/EmployeeClass');
let getEmployeeService = require('../../service/Employee/GetEmployeeService');
let commonFunction = require('../../common/CommonFunction');

router.get('/getEmployeeData', async (req, res) => {
  let employeeClassReq = new employeeClass();
  let getEmployeeServiceReq = new getEmployeeService();
  let commonFunc = new commonFunction();
  let reqParam = req.query;
  let reqHeaders = req.headers;

  if (!reqParam.empNo) {
    req.check('pageNo', 'pageNo is required field!').notEmpty();
    req.check('pageNo', 'pageNo should be numeric!').isNumeric();
  }

  const errors = req.validationErrors();
  if (errors) {
    console.error(errors);
    return res
      .status(400)
      .send({
        message: await commonFunc.getValidationMessage(errors),
        status: false,
      });
  }

  try {
    let decodedToken = await commonFunc.decodeToken(reqHeaders.token);
    let result = await employeeClassReq.getEmployeeData(
      reqParam,
      decodedToken,
      getEmployeeServiceReq,
      res
    );
    res.statusCode = result.statusCode;
    res.send(result);
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode;
    return res.send(err);
  }
});

module.exports = router;
