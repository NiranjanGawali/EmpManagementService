const bcrypt = require('bcrypt');
require('dotenv').config();
var commonFunc = function () {};
var mysqlConnection = require('./../mysql-connect');
var jwt = require('jsonwebtoken');
let commonQueries = require('../utils/QueryUtility');
let util = require('../utils/Util');

commonFunc.prototype.getValidationMessage = async (errArray) => {
  for (let y = 0; y < errArray.length; y++) {
    if (errArray[y].msg != null || errArray[y].msg != '') {
      return errArray[y].msg;
    }
  }
};

commonFunc.prototype.generateHashPassword = async (passwordText) => {
  let saltValue = parseInt(process.env.SALT_ROUND);
  let promisePasswordHash = new Promise((resolve, reject) => {
    bcrypt.hash(passwordText, saltValue, function (err, hash) {
      if (err) {
        console.error(err);
        reject(err);
      }

      resolve(hash);
    });
  });
  return promisePasswordHash;
};

commonFunc.prototype.compareHashPassword = async (
  passwordText,
  hashPassword
) => {
  let passwordComparePromise = new Promise((resolve, reject) => {
    bcrypt.compare(passwordText, hashPassword, function (err, result) {
      resolve(result);
    });
  });
  return passwordComparePromise;
};

commonFunc.prototype.checkIfAlreadyRegistered = async (email) => {
  let msyqlConn = new mysqlConnection();
  var resultObj = {};
  let userPresentPromise = new Promise(async (resolve, reject) => {
    let commonQuery = new commonQueries();

    let conn = await msyqlConn.createDbConnection();
    conn.connect();

    let sql = commonQuery.CHECK_MANAGER_EMAIL;
    let values = [email];

    conn.query(sql, values, (err, data) => {
      if (err) {
        reject(err);
        return console.error(err);
      }
      if (data.length == 0) {
        resultObj.isPresent = false;
        resultObj.data = null;
      } else {
        resultObj.isPresent = true;
        resultObj.data = data[0];
      }
      resolve(resultObj);
      conn.end();
    });
  });
  return userPresentPromise;
};

// Encode the JWT token and return user details
commonFunc.prototype.encodeToken = async (userEmail) => {
  let encodedToken = new Promise((resolve, reject) => {
    var token = jwt.sign({ data: userEmail }, process.env.TOKEN_SERCRET, {
      expiresIn: '1d',
    });
    resolve(token);
  });
  return encodedToken;
};

// Decode the JWT token and return user details
commonFunc.prototype.decodeToken = async (token) => {
  try {
    var utilfunc = new util();
    let decodedToken = new Promise((resolve, reject) => {
      jwt.verify(token, process.env.TOKEN_SERCRET, function (err, decoded) {
        if (err) {
          reject(utilfunc.TOKEN_EXPIRED);
          return console.error(err);
        }
        resolve(decoded);
      });
    });
    return decodedToken;
  } catch (err) {
    console.error('CATCHING ERROR HERE!!!!');
    reject(utilfunc.TOKEN_EXPIRED);
  }
};

// get all count of employees
commonFunc.prototype.getEmployeeCount = async () => {
  let msyqlConn = new mysqlConnection();
  let promiseCount = new Promise(async (resolve, reject) => {
    let commonQuery = new commonQueries();

    let conn = await msyqlConn.createDbConnection();
    conn.connect();

    let sql = commonQuery.GET_ALL_EMP_COUNT;

    conn.query(sql, (err, data) => {
      if (err) {
        reject(err);
        return console.error(err);
      }
      resolve(data[0].totalCount);
      conn.end();
    });
  });
  return promiseCount;
};

module.exports = commonFunc;
