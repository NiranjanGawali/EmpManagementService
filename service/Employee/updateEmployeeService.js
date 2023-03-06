var UpdateEmployeeService = function () {};
var mysqlConnection = require('../../mysql-connect');
let commonFunction = require('../../common/CommonFunction');
let commonQueries = require('../../utils/QueryUtility');
let Util = require('./../../utils/Util');
require('dotenv').config();

UpdateEmployeeService.prototype.updateEmployeeDataMethod = async (
  reqBody,
  tokenData,
  request
) => {
  let getEmployeePromise = new Promise(async (resolve, reject) => {
    var values = [];
    let commonFunc = new commonFunction();
    let msyqlConn = new mysqlConnection();
    let commonQuery = new commonQueries();
    let conn = await msyqlConn.createDbConnection();
    let util = new Util();
    conn.connect();

    let loggedInUserEmail = tokenData.data;

    values = [
      reqBody.birth_date,
      reqBody.first_name,
      reqBody.last_name,
      reqBody.gender,
      reqBody.hire_date,
      loggedInUserEmail,
      new Date(),
      reqBody.emp_no,
    ];

    conn.query(commonQuery.UPDATE_EMPLOYEE, values, (err, data) => {
      if (err) {
        reject(err);
        return reject(util.INTERNAL_SERVER_ERROR);
      }
      conn.end();
      resolve(util.EDIT_SUCCESS);
    });
  });
  return getEmployeePromise;
};

module.exports = UpdateEmployeeService;
