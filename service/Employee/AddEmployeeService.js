var AddEmployeeService = function () { };
var mysqlConnection = require('../../mysql-connect');
let commonFunction = require('../../common/CommonFunction');
let commonQueries = require('../../utils/QueryUtility');
require('dotenv').config()

AddEmployeeService.prototype.addEmployeeDataMethod = async (reqBody, tokenData, request) => {
    console.log('Inside addEmployeeDataMethod method...');
    let getEmployeePromise = new Promise(async (resolve, reject) => {
        var values = [];
        let commonFunc = new commonFunction();
        let msyqlConn = new mysqlConnection();
        let commonQuery = new commonQueries();
        let conn = await msyqlConn.createDbConnection();
        conn.connect();

        let loggedInUserEmail = tokenData.data;
        console.log(loggedInUserEmail);

        let valArr = [reqBody.emp_no,reqBody.birth_date,reqBody.first_name,reqBody.last_name,reqBody.gender,reqBody.hire_date,loggedInUserEmail,new Date(),loggedInUserEmail];
        values = [valArr];

        conn.query(commonQuery.ADD_EMPLOYEE,values, (err, data) => {
            if (err) {
                reject(err);
                return console.error(err);
            }
            console.log('DATA');
            conn.end();
            resolve(data);
        });

    });
    return getEmployeePromise;
}

module.exports = AddEmployeeService;