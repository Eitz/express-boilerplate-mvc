const db = require('./db.js');

class Orm {
	static get (tableInput, condition, cb) {

		if (condition instanceof Number) {
			condition = { id: condition };
		}

		let queryString = 'SELECT * FROM ' + tableInput;

		if (condition) {
			queryString += ' WHERE ';
			queryString += objToSql(condition);
		}

		// debug
		// console.log(queryString);

		db.query(queryString, function(err, result) {
			if(err) throw err;
			cb(result[0]);
		});
	}

	static all (tableInput, condition, cb) {
		
		if (typeof condition == 'function') {
			cb = condition;
			condition = undefined;
		}

		let queryString = 'SELECT * FROM ' + tableInput;

		if (condition) {
			queryString += ' WHERE ';
			queryString += objToSql(condition);
		}

		// debug
		// console.log(queryString);

		db.query(queryString, function(err, result) {
			if(err) throw err;
			cb(result);
		});
	}

	static update (table, objColVals, condition, cb) {
		let queryString = 'UPDATE ' + table;

		queryString += ' SET ';
		queryString += objToSql(objColVals);
		queryString += ' WHERE ';
		queryString += objToSql(condition);

		// debug
		// console.log(queryString);

		db.query(queryString, function(err, result) {
			if (err) throw err;
			cb(result);
		});
	}

	static create (table, cols, vals, cb) {
		let queryString = 'INSERT INTO ' + table;

		queryString += ' (';
		queryString += cols.toString();
		queryString += ') ';
		queryString += 'VALUES (';
		queryString += printQuestionMarks(vals.length);
		queryString += ') ';

		// debug
		// console.log(queryString);

		db.query(queryString, vals, function (err, result) {
			if (err) throw err;
			cb(result);
		});
	}
}

module.exports = Orm;

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