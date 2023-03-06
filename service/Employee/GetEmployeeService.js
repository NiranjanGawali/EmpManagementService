var GetEmployeeService = function () {};
var mysqlConnection = require('../../mysql-connect');
let commonFunction = require('../../common/CommonFunction');
let commonQueries = require('../../utils/QueryUtility');
let Util = require('./../../utils/Util');
require('dotenv').config();

GetEmployeeService.prototype.getEmployeeDataMethod = async (
  reqParams,
  tokenData,
  request
) => {
  var resultObj = {};
  let getEmployeePromise = new Promise(async (resolve, reject) => {
    var sql = null;
    var values = [];
    let commonFunc = new commonFunction();
    let msyqlConn = new mysqlConnection();
    let commonQuery = new commonQueries();
    let util = new Util();
    let conn = await msyqlConn.createDbConnection();
    conn.connect();

    let pageNo = parseInt(reqParams.pageNo);
    let limit = parseInt(process.env.DATE_PER_PAGE);
    let offset = (pageNo - 1) * limit;

    values = [limit, offset];
    sql = commonQuery.GET_ALL_EMPLOYEE;

    if (reqParams.hasOwnProperty('empNo')) {
      let empNo = parseInt(reqParams.empNo);
      sql = commonQuery.GET_EMPLOYEE_BY_ID;
      values.length = 0;
      values = [empNo];
    }

    if (reqParams.hasOwnProperty('firstName')) {
      let firstName = reqParams.firstName + '%';
      sql = commonQuery.SEARCH_EMPLOYEE_BY_FIRST_NAME;
      values.length = 0;
      values = [firstName, firstName, firstName, limit, offset];
    }

    conn.query(sql, values, async (err, data) => {
      if (err) {
        reject(err);
        return console.error(err);
      }
      let count = await commonFunc.getEmployeeCount();
      util.SUCCESS_DATA_COUNT.count = count;
      util.SUCCESS_DATA_COUNT.data = data;
      conn.end();
      resolve(util.SUCCESS_DATA_COUNT);
    });
  });
  return getEmployeePromise;
};

module.exports = GetEmployeeService;
