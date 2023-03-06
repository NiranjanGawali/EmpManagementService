var express = require('express');
var router = express.Router();
let employeeClass = require('../../classes/EmployeeClass');
let deleteEmployeeService = require('../../service/Employee/DeleteEmployeeService');
let commonFunction = require('../../common/CommonFunction');

router.delete('/deleteEmployee', async (req, res) => {
  let employeeClassReq = new employeeClass();
  let deleteEmployeeServiceReq = new deleteEmployeeService();
  let commonFunc = new commonFunction();
  let reqQuery = req.query;
  let reqHeaders = req.headers;

  req.check('emp_no', 'emp_no is required field!').notEmpty();
  req.check('emp_no', 'emp_no should be numeric!').isNumeric();

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
    let result = await employeeClassReq.deleteEmployeeData(
      reqQuery,
      decodedToken,
      deleteEmployeeServiceReq,
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
