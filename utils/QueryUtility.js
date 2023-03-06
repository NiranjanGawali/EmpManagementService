function commonQueries () {};

commonQueries.prototype.USER_SIGNUP = `insert into manager(name,email,password,created_by,createdAt,updated_by) values(?,?,?,?,?,?)`;
commonQueries.prototype.CHECK_MANAGER_EMAIL = `select * from manager where email = ?`;

commonQueries.prototype.GET_ALL_EMPLOYEE = `select * from employees ORDER BY createdAt DESC LIMIT ? OFFSET ?`;
commonQueries.prototype.GET_EMPLOYEE_BY_ID = `select * from employees where emp_no = ?`;
commonQueries.prototype.SEARCH_EMPLOYEE_BY_FIRST_NAME = `select * from employees where (first_name LIKE ? OR emp_no LIKE ? OR last_name LIKE ?) LIMIT ? OFFSET ?`;

commonQueries.prototype.ADD_EMPLOYEE = `insert into employees(emp_no,birth_date,first_name,last_name,gender,hire_date,created_by,createdAt,updated_by) values (?)`;
commonQueries.prototype.DELETE_EMPLOYEE = `delete from employees where emp_no = ?`;

commonQueries.prototype.UPDATE_EMPLOYEE = `update employees set birth_date = ?,first_name = ?,last_name = ?,
gender = ?,hire_date = ?,updated_by = ?,updatedAt = ? where emp_no = ?`;

commonQueries.prototype.GET_ALL_EMP_COUNT = `select count(*) As totalCount from employees`;

module.exports = commonQueries;