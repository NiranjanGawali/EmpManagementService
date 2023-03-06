var express = require('express');
var router = express.Router();
let employeeClass = require('../../classes/EmployeeClass');
let updateEmployeeService = require('../../service/Employee/updateEmployeeService');
let commonFunction = require('../../common/CommonFunction');

router.post('/updateEmployee', async (req, res) => {
  let employeeClassReq = new employeeClass();
  let updateEmployeeServiceReq = new updateEmployeeService();
  let commonFunc = new commonFunction();
  let reqBody = req.body;
  let reqHeaders = req.headers;

  req.check('emp_no', 'emp_no is mantoary field!').notEmpty();
  req.check('emp_no', 'emp_no should be numeric!').isNumeric();
  req.check('birth_date', 'birth_date is mantoary field!').notEmpty();
  req.check('first_name', 'first_name id mandatory field!').notEmpty();
  req.check('last_name', 'last_name     is mantoary field!').notEmpty();
  req.check('gender', 'gender is mantoary field!').notEmpty();
  req.check('hire_date', 'hire_date is mantoary field!').notEmpty();

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
    let result = await employeeClassReq.updateEmployeeData(
      reqBody,
      decodedToken,
      updateEmployeeServiceReq,
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
