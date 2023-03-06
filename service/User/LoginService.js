var LoginUserService = function() {};
var mysqlConnection = require('../../mysql-connect');
let commonFunction = require('../../common/CommonFunction');
let Util = require('./../../utils/Util');
var jwt = require('jsonwebtoken');

LoginUserService.prototype.loginUserMethod = async (reqBody, request) => {
    let userSignUpPromise = new Promise(async (resolve,reject) => {
        let commonFunc = new commonFunction();
        let util = new Util();

        let isUserAlreadyRegistered = await commonFunc.checkIfAlreadyRegistered(reqBody.email);
        let userData = isUserAlreadyRegistered.data;

        let token = await commonFunc.encodeToken(reqBody.email);
        userData.token = token;

        let comparePasswordOutput = await commonFunc.compareHashPassword(reqBody.password,userData.password);
        if(comparePasswordOutput) {
            util.SUCCESS_WITH_DATA.data = userData;
            resolve(util.SUCCESS_WITH_DATA);
        }
        else {
            reject(util.UNAUTHORIZED_ACCESS);
        }
        
    });
    return userSignUpPromise;
}

module.exports = LoginUserService;