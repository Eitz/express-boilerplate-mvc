const db = require('./db.js');

function printQuestionMarks(num) {
	let arr = [];

	for (let i = 0; i < num; i++) {
		arr.push('?');
	}

	return arr.toString();
}

function objToSql(ob) {
	let arr = [];

	for (let key in ob) {
		if (ob.hasOwnProperty(key)) {
			arr.push(key + '=' + ob[key]);
		}
	}

	return arr.toString();
}


const orm = {
	get: function (tableInput, condition, cb) {

		if (condition instanceof Number) {
			condition = { id: condition };
		}

		let queryString = 'SELECT * FROM ' + tableInput;

		if (condition) {
			queryString += ' WHERE ';
			queryString += objToSql(condition);
		}

		console.log(queryString);

		db.query(queryString, function(err, result) {
			if(err) throw err;
			cb(result[0]);
		});
	},

	all: function(tableInput, condition, cb) {
		
		if (typeof condition == 'function') {
			cb = condition;
			condition = undefined;
		}

		let queryString = 'SELECT * FROM ' + tableInput;

		if (condition) {
			queryString += ' WHERE ';
			queryString += objToSql(condition);
		}

		console.log(queryString);

		db.query(queryString, function(err, result) {
			if(err) throw err;
			cb(result);
		});
	},

	update: function(table, objColVals, condition, cb) {
		let queryString = 'UPDATE ' + table;

		queryString += ' SET ';
		queryString += objToSql(objColVals);
		queryString += ' WHERE ';
		queryString += objToSql(condition);

		// console.log(queryString);

		db.query(queryString, function(err, result) {
			if (err) throw err;
			cb(result);
		});
	},

	create: function (table, cols, vals, cb) {
		let queryString = 'INSERT INTO ' + table;

		queryString += ' (';
		queryString += cols.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += printQuestionMarks(vals.length);
		queryString += ') ';

		// console.log(queryString);

		db.query(queryString, vals, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	}
}

module.exports = orm;