var express = require('express');
var router = express.Router();
var pg = require('pg');
var extract = require('pdf-text-extract');
var hummus = require('hummus');
var path = require('path');
var fs = require('fs');
var readline = require('readline');

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

router.post('/admin-upload', function(req, res, next) {
	if (!req.files || !('boletos' in req.files))
		return res.status(400).send('Nenhum arquivo foi encontrado.');

	req.files.boletos.mv('routes/boletos.pdf');

	//#############
	var sourcePDF = path.join(__dirname, 'boletos.pdf');
	console.log(sourcePDF);
 	var outputFolder = path.join(__dirname, '/output');

	extract(sourcePDF, (err, pages) => {
		if (err) console.log(err);

		var pdfWriter;

		for(var i = 0; i< pages.length; i++) {
			var indexStart = pages[i].indexOf("Pagador:",2000)+12;
			var indexEnd = pages[i].indexOf("-",3500)-1;
			var nome = pages[i].substring(indexStart,indexEnd);

			indexStart = pages[i].indexOf("Vencimento")+136;
			indexEnd = indexStart+10;

			var date = pages[i].substring(indexStart,indexEnd);

			date = date.replace(/\//g,'-');
			var nomeArq = nome.concat(" @ ",date,".pdf");
			console.log(nomeArq);

			if(nome != ""){
				pdfWriter = hummus.createWriter(path.join(outputFolder, nomeArq));
				pdfWriter.appendPDFPagesFromPDF(sourcePDF, {type:hummus.eRangeTypeSpecific,specificRanges: [ [ i , i]]});
				pdfWriter.end();	
			}
		}

		fs.readdirSync(outputFolder).forEach(file => {
			var mes = file.substring(file.indexOf("@")+5,file.indexOf("@")+7);
			var ano = file.substring(file.indexOf("@")+8,file.indexOf("@")+12);
			var nome = file.substring(0,file.indexOf("@")-1)
    		
			console.log("mes: " + mes);
			console.log("ano: " + ano);
			console.log("nome: " + nome);

    		//colocar aqui os SQL
			pg.connect(connectionString, (err, client, done) => {
		    // Handle connection errors
		    if(err) {
		    	done();
		    	console.log(err);
		    	return res.status(500).json({success: false, data: err});
		    }
		    // SQL Query > Insert Data
		    client.query('INSERT INTO bill(year, month, student_name, src) values($1, $2, $3, $4) ON CONFLICT(year, month, student_name) DO UPDATE SET src = $4 WHERE bill.year = $1 AND bill.month = $2 AND bill.student_name = $3',
		    	[ano, mes, nome, path.join(outputFolder, file)], 
		    	function(err, result) {
		    		if (err) {
		    			console.log(err);
		    		}
		    	});
		    });
		});
	});

	res.redirect('/');
});

router.get('/boletos', function(req, res, next) {
	res.render('boletos');
});

router.post('/boletos', function(req, res, next) {
	var studentName = req.body.student_name;
	res.redirect('student-search?student_name='+studentName);
});

router.get('/student-search', function(req, res, next) {
	var studentName = req.param('student_name', null);

	var results = [];

	if(studentName === null){
		return res.render('student_search', {'results': results});
	}

  	// Get a Postgres client from the connection pool
  	pg.connect(connectionString, (err, client, done) => {
    	// Handle connection errors
    	if(err) {
    		done();
    		console.log(err);
    		return res.status(500).json({success: false});
    	}
	    // SQL Query > Select Data
	    var query = client.query('SELECT student_name FROM bill WHERE student_name like $1 ORDER BY student_name', ['%'+studentName+'%']);
	    // Stream results back one row at a time
	    query.on('row', (row) => {
	    	results.push(row);
	    });
	    // After all data is returned, close connection and return results
	    query.on('end', () => {
	    	done();
	    	return res.render('student_search', {'student_name': studentName, 'results': results});
	    });
	});
  });

router.get('/student-boletos', function(req, res, next) {
	var studentName = req.param('student_name', null);

	if(studentName === null){
		return res.status(404).send("Not found");
	}

	var results = [];

  	// Get a Postgres client from the connection pool
  	pg.connect(connectionString, (err, client, done) => {
    	// Handle connection errors
    	if(err) {
    		done();
    		console.log(err);
    		return res.status(500).json({success: false});
    	}
	    // SQL Query > Select Data
	    var query = client.query('SELECT * FROM bill WHERE bill.student_name = $1 ORDER BY bill.year DESC, bill.month DESC', [studentName]);
	    // Stream results back one row at a time
	    query.on('row', (row) => {
	    	results.push(row);
	    });
	    // After all data is returned, close connection and return results
	    query.on('end', () => {
	    	done();
	    	console.log(results);
	    	return res.render('student_boletos', {'results': results, 'student_name': studentName});
	    });
	});
  });

router.get('/download', function(req, res){
	var src = req.param('src', null);
	res.download(src);
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
