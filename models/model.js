const Orm = require('../util/orm.js');

module.exports =
class Model {

	static get tableName() {
		throw new Error(`"${staticClass.name}" Class is laking a tableName static property. No query will be done!`);
	}

	static get (condition, cb) {
		Orm.get(this.tableName, condition, cb);
	}

	static getMany (condition, cb) {
		const Class = this;
		Orm.all(this.tableName, condition, (result) => {
			let instances = new Array();
			for (res in result)
				instances.push(new Class(res))
			return instances;
		});
	}

	static create (cols, vals, cb) {
		Orm.create(this.tableName, cols, vals, cb);
	}

	static update (objColVals, condition, cb) {
		Orm.update(this.tableName, objColVals, condition, cb);
	}
}