const UserModel = require('../models/user.js');

module.exports.controller = function(app) {
	
	app.get('/', UserController.index);
	app.get('/change-status/:user_id', UserController.changeStatus); 

}

class UserController {

	/**
	 * Example usage of 'express-session' and 'all' from the orm
	 */
	static index (req, res)
	{
		let times = (req.session.times || 0) + 1;
		req.session.times = times;

		UserModel.getMany((users) => {
			res.render('index', { users : users, times: times });
		});
	}

	/**
	 * Example usage of 'get' / 'update' from the orm
	 */
	static changeStatus(req, res)
	{
		let user_id = req.params.user_id;
		
		UserModel.get({ id: user_id}, function (data) { 
			UserModel.update({ active: !data.active }, { id: user_id }, function () {
				res.redirect('/');
			});
		});
	}
}