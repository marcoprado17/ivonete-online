var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
	res.render('index');
});

router.get('/admin-login', function(req, res, next) {
	res.render('admin_login');
});

router.post('/admin-login', function(req, res, next) {
	console.log(req.body.email);
	console.log();
	if(req.body.email == "ivonete@gmail.com" && req.body.password == "ivonete123"){
		res.redirect('admin-upload');
	}
	else{
		res.render('admin_login', {invalid_login: true});
	}
});

router.get('/admin-upload', function(req, res, next) {
	res.render('admin_upload');
});

router.get('/boletos', function(req, res, next) {
	res.render('boletos');
});

router.get('/student-search', function(req, res, next) {
	res.render('student_search');
});

router.get('/student-boletos', function(req, res, next) {
	res.render('student_boletos');
});

module.exports = router;
