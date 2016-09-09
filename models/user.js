const Model = require('./model.js');

class User extends Model {

	constructor (props) {
		this.name = props.name; 
		this.date = new Date(props.date);
		this.active = !!props.active;
	}

	static get tableName() {
		return 'user';
	}

}

module.exports = User;