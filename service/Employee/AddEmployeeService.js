var AddEmployeeService = function () {};
var mysqlConnection = require('../../mysql-connect');
let commonFunction = require('../../common/CommonFunction');
let commonQueries = require('../../utils/QueryUtility');
let Util = require('./../../utils/Util');
require('dotenv').config();

AddEmployeeService.prototype.addEmployeeDataMethod = async (
  reqBody,
  tokenData,
  request
) => {
  let getEmployeePromise = new Promise(async (resolve, reject) => {
    var values = [];
    let commonFunc = new commonFunction();
    let msyqlConn = new mysqlConnection();
    let commonQuery = new commonQueries();
    let util = new Util();
    let conn = await msyqlConn.createDbConnection();
    conn.connect();

    let loggedInUserEmail = tokenData.data;

    let valArr = [
      reqBody.emp_no,
      reqBody.birth_date,
      reqBody.first_name,
      reqBody.last_name,
      reqBody.gender,
      reqBody.hire_date,
      loggedInUserEmail,
      new Date(),
      loggedInUserEmail,
    ];
    values = [valArr];

    conn.query(commonQuery.ADD_EMPLOYEE, values, (err, data) => {
      if (err) {
        console.error(err);
        if (err.code == 'ER_DUP_ENTRY') {
          return reject(util.EMP_ALERADY_EXISTS);
        } else return reject(util.INTERNAL_SERVER_ERROR);
      }
      conn.end();
      resolve(util.ADD_SUCCESS);
    });
  });
  return getEmployeePromise;
};

module.exports = AddEmployeeService;
