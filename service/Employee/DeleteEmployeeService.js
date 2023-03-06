var DeleteEmployeeService = function () {};
var mysqlConnection = require('../../mysql-connect');
let commonFunction = require('../../common/CommonFunction');
let commonQueries = require('../../utils/QueryUtility');
let Util = require('./../../utils/Util');
require('dotenv').config();

DeleteEmployeeService.prototype.deleteEmployeeDataMethod = async (
  reqParams,
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

    values = [reqParams.emp_no];

    conn.query(commonQuery.DELETE_EMPLOYEE, values, (err, data) => {
      if (err) {
        reject(err);
        return reject(util.INTERNAL_SERVER_ERROR);
      }
      conn.end();
      if (data.affectedRows == 0) {
        return reject(util.EMP_NOT_FOUND);
      } else {
        return resolve(util.DELETE_SUCCESS);
      }
    });
  });
  return getEmployeePromise;
};

module.exports = DeleteEmployeeService;
