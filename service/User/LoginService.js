var LoginUserService = function() {};
var mysqlConnection = require('../../mysql-connect');
let commonFunction = require('../../common/CommonFunction');
var jwt = require('jsonwebtoken');

LoginUserService.prototype.loginUserMethod = async (reqBody, request) => {
    let userSignUpPromise = new Promise(async (resolve,reject) => {
        let commonFunc = new commonFunction();

        let isUserAlreadyRegistered = await commonFunc.checkIfAlreadyRegistered(reqBody.email);
        let userData = isUserAlreadyRegistered.data;

        let token = await commonFunc.encodeToken(reqBody.email);
        userData.token = token;

        let comparePasswordOutput = await commonFunc.compareHashPassword(reqBody.password,userData.password);
        if(comparePasswordOutput) 
            resolve(userData);
        else
            reject('Please enter correct password!!');
        
    });
    return userSignUpPromise;
}

module.exports = LoginUserService;