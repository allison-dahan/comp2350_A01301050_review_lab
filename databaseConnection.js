const mysql = require('mysql2/promise');

const is_qoddi = process.env.IS_QODDI || false;

const dbConfigQoddi = {
    host: "localhost",
    user: "root",
    password: "Peachykeen23?",
    database: "event_booking",
    multipleStatements: false
};



const dbConfigLocal = {
    host: "localhost",
    user: "root",
    password: "Peachykeen23?",
    database: "event_booking",
    multipleStatements: false
};


if (is_qoddi) {
	var database = mysql.createPool(dbConfigQoddi);
}
else {
	var database = mysql.createPool(dbConfigLocal);
}

module.exports = database;
		