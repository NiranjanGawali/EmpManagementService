var express = require('express');
var router = express.Router();
let userClass = require('../../classes/UserClass');
let loginService = require('../../service/User/LoginService');
let commonFunction = require('../../common/CommonFunction');
let utlity = require('./../../utils/Util');

router.post('/login', async (req, res) => {
  let userClassReq = new userClass();
  let loginServiceReq = new loginService();
  let commonFunc = new commonFunction();
  let util = new utlity();

  let reqBody = req.body;

  req.check('email', 'email is mantoary field!').notEmpty();
  req.check('email', 'Please enter email field in proper format').isEmail();
  req.check('password', 'password is mantoary field!').notEmpty();

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

  let isUserAlreadyRegistered = await commonFunc.checkIfAlreadyRegistered(
    reqBody.email
  );
  if (!isUserAlreadyRegistered.isPresent) {
    res.statusCode = util.USER_NOT_FOUND.statusCode;
    return res.send(util.USER_NOT_FOUND);
  }

  try {
    let result = await userClassReq.loginUser(reqBody, loginServiceReq, res);
    res.statusCode = result.statusCode;
    res.send(result);
  } catch (err) {
    console.error(err);
    res.statusCode = err.statusCode;
    return res.send(err);
  }
});

module.exports = router;
