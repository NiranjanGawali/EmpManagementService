var express = require('express');
var router = express.Router();
let userClass = require('../../classes/UserClass');
let loginService = require('../../service/User/LoginService');
let commonFunction = require('../../common/CommonFunction');

router.post('/login',async (req, res) => {
    console.log('Inside signup user controller!!!');
    let userClassReq = new userClass();
    let loginServiceReq = new loginService();
    let commonFunc = new commonFunction();

    let reqBody = req.body;

    req.check('email','email is mantoary field!').notEmpty();
    req.check('email','Please enter email field in proper format').isEmail();
    req.check('password','password is mantoary field!').notEmpty();
    
    const errors = req.validationErrors();
    if (errors) {
        console.log(errors);
        return res.status(400).send({ message: await commonFunc.getValidationMessage(errors), status: false });
    }

    let isUserAlreadyRegistered = await commonFunc.checkIfAlreadyRegistered(reqBody.email);
    if(!isUserAlreadyRegistered.isPresent) {
        return res.status(404).send({ message: `User with ${reqBody.email} emailid not registered!!!`, status: false });
    }

    try {
        let result = await userClassReq.loginUser(reqBody,loginServiceReq,res);
        res.status(200).send({ message: 'User Login Seccessfully!!!', status: true, data: result });
    } catch (err) {
        console.error(err);
        return res.status(400).send({ err: err, status: false });
    }
});

module.exports = router;
