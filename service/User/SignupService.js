var SignUpUserService = function() {};
var mysqlConnection = require('./../../mysql-connect');
let commonFunction = require('../../common/CommonFunction');
let commonQueries = require('../../utils/QueryUtility');
let Util = require('./../../utils/Util');

SignUpUserService.prototype.signupUserMethod = async (reqBody, request) => {
    let userSignUpPromise = new Promise(async (resolve,reject) => {
        console.log('Inside the Signup service mehtod!!!');
        console.log(reqBody);
        let commonFunc = new commonFunction();
        let msyqlConn = new mysqlConnection();
        let commonQuery = new commonQueries();
        let conn = await msyqlConn.createDbConnection();
        let util = new Util();

        conn.connect();
        
        let hashPassword = await commonFunc.generateHashPassword(reqBody.password);

        let sql = commonQuery.USER_SIGNUP;
        let values = [reqBody.name,reqBody.email,hashPassword,reqBody.email,new Date(),reqBody.email];


        conn.query(sql, values, (err, data) => {
            if(err) {
                console.error(err);
                return reject(util.INTERNAL_SERVER_ERROR);
            }
            console.log('DATA');
            console.log(data);
            conn.end();
            resolve(util.SIGNUP_SUCCESS);
            // resolve(data);
        });
        
    });
    return userSignUpPromise;
}

module.exports = SignUpUserService;