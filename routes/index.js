var express = require('express');
var router = express.Router();
var pg = require('pg');

const connectionString = 'postgres://ivonetedb:123456@localhost:5432/ivonetedb'

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

router.post('/upsert-student', function(req, res, next) {
	var cpf = req.param('cpf', null);
	var name = req.param('name', null);

	console.log(cpf);
	console.log(name);

	if(cpf == null || name === null){
		return res.status(422).json({success: false, data: "É necessário informar o nome e o cpf do estudante utilizando as queries 'cpf' e 'name'"});
	}

	pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
    	done();
    	console.log(err);
    	return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO student(cpf, name) values($1, $2) ON CONFLICT(cpf) DO UPDATE SET name = $2 WHERE student.cpf = $1',
    	[cpf, name], 
    	function(err, result) {
            if (err) {
                console.log(err);
            }
        });
	});

	res.redirect('student-search');
});

router.post('/upsert-bill', function(req, res, next) {
	var year = req.param('year', null)
	var month = req.param('month', null)
	var studentCpf = req.param('student_cpf', null);
	// You must use '.' to denote decimal point instead of ','
	var value = req.param('value', null);
	var src = req.param('src', null);

	console.log(year);
	console.log(month);
	console.log(studentCpf);
	console.log(value);
	console.log(src);

	if(year == null || month === null || studentCpf === null || value === null || src == null){
		return res.status(422).json({success: false, data: "É necessário informar os parâmetros: 'year', 'month', 'student_cpf', 'value' e 'src'"});
	}

	pg.connect(connectionString, (err, client, done) => {
    // Handle connection errors
    if(err) {
    	done();
    	console.log(err);
    	return res.status(500).json({success: false, data: err});
    }
    // SQL Query > Insert Data
    client.query('INSERT INTO bill(year, month, student_cpf, value, src) values($1, $2, $3, $4, $5) ON CONFLICT(year, month, student_cpf) DO UPDATE SET value = $4, src = $5 WHERE bill.year = $1 AND bill.month = $2 AND bill.student_cpf = $3',
    	[year, month, studentCpf, value, src], 
    	function(err, result) {
            if (err) {
                console.log(err);
            }
        });
	});

	res.redirect('student-boletos');
});

module.exports = router;
