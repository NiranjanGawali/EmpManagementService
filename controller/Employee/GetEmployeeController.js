var express = require('express');
var router = express.Router();
let employeeClass = require('../../classes/EmployeeClass');
let getEmployeeService = require('../../service/Employee/GetEmployeeService');
let commonFunction = require('../../common/CommonFunction');

router.get('/getEmployeeData',async (req, res) => {
    console.log('Inside get employee controller!!!');
    let employeeClassReq = new employeeClass();
    let getEmployeeServiceReq = new getEmployeeService();
    let commonFunc = new commonFunction();
    let reqParam = req.query;
    let reqHeaders = req.headers;

    if(!reqParam.empNo) {
        req.check('pageNo','pageNo is required field!').notEmpty();
        req.check('pageNo','pageNo should be numeric!').isNumeric();
    }
    
    
    const errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        return res.status(400).send({ message: await commonFunc.getValidationMessage(errors), status: false });
    }

    try {
        let decodedToken = await commonFunc.decodeToken(reqHeaders.token);
        console.log(decodedToken);

        let result = await employeeClassReq.getEmployeeData(reqParam,decodedToken,getEmployeeServiceReq,res);
        res.status(200).send({ message: 'Employee Data found!!!', status: true, data: result });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ err: err, status: false });
    }
});

module.exports = router;
