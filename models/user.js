var orm = require('../util/orm.js');

var user = {
	get: function (condition, cb) {
		orm.get('user', condition, cb);
	},

	all: function(condition, cb) {
		orm.all('user', condition, cb);
	},

	create: function(cols, vals, cb) {
		orm.create('user', cols, vals, cb);
	},

	update: function(objColVals, condition, cb) {
		orm.update('user', objColVals, condition, cb);
	}
};

module.exports = user;