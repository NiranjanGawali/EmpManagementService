var express = require('express');
var router = express.Router();
let userClass = require('../../classes/UserClass');
let signupService = require('./../../service/User/SignupService');
let commonFunction = require('../../common/CommonFunction');
let utlity = require('./../../utils/Util');

router.post('/signup', async (req, res) => {
  let userClassReq = new userClass();
  let signupServiceReq = new signupService();
  let commonFunc = new commonFunction();
  let util = new utlity();

  let reqBody = req.body;

  req.check('name', 'name is mantoary field!').notEmpty();
  req.check('email', 'email is mantoary field!').notEmpty();
  req.check('email', 'Please enter email field in proper format').isEmail();
  req.check('password', 'password is mantoary field!').notEmpty();
  req.check('confirmPassword', 'confirmPassword is mantoary field!').notEmpty();

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

  if (reqBody.password != reqBody.confirmPassword) {
    res.statusCode = util.PASSWORD_CONFLICT.statusCode;
    return res.send(util.PASSWORD_CONFLICT);
  }

  let isUserAlreadyRegistered = await commonFunc.checkIfAlreadyRegistered(
    reqBody.email
  );
  if (isUserAlreadyRegistered.isPresent) {
    util.CUSTOM_WRAPPER.statusCode = util.PASSWORD_CONFLICT.statusCode;
    res.statusCode = util.PASSWORD_CONFLICT.statusCode;
    util.CUSTOM_WRAPPER.message = 'User Already Registered!!!';
    return res.send(util.CUSTOM_WRAPPER);
  }

  try {
    let result = await userClassReq.signupUser(reqBody, signupServiceReq, res);
    res.statusCode = result.statusCode;
    res.send(result);
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode;
    return res.send(err);
  }
});

module.exports = router;
