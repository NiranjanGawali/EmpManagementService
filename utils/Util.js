function statusMgmt () {};

statusMgmt.prototype.CUSTOM_WRAPPER = {
    message: '',
    statusCode: 0,
    status: false
};

statusMgmt.prototype.UNAUTHORIZED_ACCESS = {
    message: 'Invalid Credentials',
    statusCode: 401,
    status: false
}

statusMgmt.prototype.USER_NOT_FOUND = {
    message: 'User not found!!!',
    statusCode: 404,
    status: false
}

statusMgmt.prototype.SUCCESS = {
    message: 'Success',
    statusCode: 200,
    status: true
}

statusMgmt.prototype.SUCCESS_WITH_DATA = {
    message: 'Success',
    statusCode: 200,
    status: true,
    data: {}
}

statusMgmt.prototype.SUCCESS_DATA_COUNT = {
    message: 'Success',
    statusCode: 200,
    status: true,
    data: [],
    count: 0
}

statusMgmt.prototype.BAD_REQUEST = {
    message: 'Bad Request!!',
    statusCode: 400,
    status: false
}

statusMgmt.prototype.INTERNAL_SERVER_ERROR = {
    message : 'Internal Server Error!!!',
    statusCode : 500,
    status : false
}

statusMgmt.prototype.PASSWORD_CONFLICT = {
    message: 'Password and confirm password should be same!!',
    statusCode: 409,
    status: false
}

statusMgmt.prototype.TOKEN_EXPIRED = {
    message: 'Token Expired!!',
    statusCode: 401,
    status: false
}

statusMgmt.prototype.EMP_ALERADY_EXISTS = {
    message: 'Employee with provided employee id already exists!!',
    statusCode: 409,
    status: false
}

statusMgmt.prototype.EMP_NOT_FOUND = {
    message: 'Employee with provided id is not present!!',
    statusCode: 404,
    status: false
}

statusMgmt.prototype.SIGNUP_SUCCESS = {
    message: 'User signup successfully!!',
    statusCode: 200,
    status: true
}

statusMgmt.prototype.DELETE_SUCCESS = {
    message: 'Employee deleted successfully!!',
    statusCode: 200,
    status: true
}

statusMgmt.prototype.EDIT_SUCCESS = {
    message: 'Employee edited successfully!!',
    statusCode: 200,
    status: true
}

statusMgmt.prototype.ADD_SUCCESS = {
    message: 'Employee added successfully!!',
    statusCode: 200,
    status: true
}

module.exports = statusMgmt;
