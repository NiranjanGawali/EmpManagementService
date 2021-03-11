var DeleteEmployeeService = function () { };
var mysqlConnection = require('../../mysql-connect');
let commonFunction = require('../../common/CommonFunction');
let commonQueries = require('../../utils/QueryUtility');
require('dotenv').config()

DeleteEmployeeService.prototype.deleteEmployeeDataMethod = async (reqParams, tokenData, request) => {
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

        console.log(reqParams);

        values = [reqParams.emp_no];

        conn.query(commonQuery.DELETE_EMPLOYEE,values, (err, data) => {
            if (err) {
                reject(err);
                return console.error(err);
            }
            console.log('DATA');
            conn.end();
            if(data.affectedRows == 0) {
                reject('Employee with this emp_no not present!!!')
            } else
            resolve(data);
        });

    });
    return getEmployeePromise;
}

module.exports = DeleteEmployeeService;