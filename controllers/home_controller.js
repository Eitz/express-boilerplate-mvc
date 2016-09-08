const User = require('../models/user.js');

module.exports.controller = function(app) {

/**
 * Example usage of 'session' and 'all' from the orm
 */
app.get('/', (req, res) => {

	let times = (req.session.times || 0) + 1;
	req.session.times = times;

	User.all((data) => {
		res.render('index', { users : data, times: times });
	});

});

/**
 * Example usage of 'get' / 'update' from the orm
 */
app.get('/change-status/:user_id', (req, res) => {
	
	let user_id = req.params.user_id;

	User.get({ id: user_id}, function (data) { 
		User.update({ active: !data.active }, { id: user_id }, function () {
			res.redirect('/');
		});
	});

});

}