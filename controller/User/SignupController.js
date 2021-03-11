var express = require('express');
var router = express.Router();
let userClass = require('../../classes/UserClass');
let signupService = require('./../../service/User/SignupService');
let commonFunction = require('../../common/CommonFunction');

router.post('/signup',async (req, res) => {
    console.log('Inside signup user controller!!!');
    let userClassReq = new userClass();
    let signupServiceReq = new signupService();
    let commonFunc = new commonFunction();

    let reqBody = req.body;

    req.check('name','name is mantoary field!').notEmpty();
    req.check('email','email is mantoary field!').notEmpty();
    req.check('email','Please enter email field in proper format').isEmail();
    req.check('password','password is mantoary field!').notEmpty();
    req.check('confirmPassword','confirmPassword is mantoary field!').notEmpty();    
    
    const errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        return res.status(400).send({ message: await commonFunc.getValidationMessage(errors), status: false });
    }

    if(reqBody.password != reqBody.confirmPassword)
        return res.status(401).send({ message: 'Password and Confirm password fields value should be same!!!', status: false });

    let isUserAlreadyRegistered = await commonFunc.checkIfAlreadyRegistered(reqBody.email);
    if(isUserAlreadyRegistered.isPresent) {
        return res.status(409).send({ message: 'User Already Registered!!!', status: false });
    }

    try {
        let result = await userClassReq.signupUser(reqBody, signupServiceReq,res);
        res.status(200).send({ message: 'User Signup Seccessfully!!!', status: true, data: result });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ err: err, status: false });
    }
});

module.exports = router;
