const fs = require('fs');
const formidable = require('formidable');

const uploadedPath = './storage';


exports.homePage = function(request, response) {
	fs.readFile('public/start.html', function(err, html){
		if (err) throw err;
		response.writeHead(200, {"Content-Type": "text/html; charset=utf-8"});
	  	response.write(html);
		response.end();
	});
}

exports.uploadImage = function(request, response) {
	var form = new formidable.IncomingForm();
	form.uploadDir = "./temp";
	form.parse(request, function(err, fields, files){
		if (err) return console.warn(err);

		const ext = files.upload.name.split('.')[1];
		const fileName = `${fields.title}.${ext}`;

		fs.renameSync(files.upload.path, `${uploadedPath}/${fileName}`);
		response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
		response.write('received image:<br>');
		response.write(`<img src="/images/${fileName}" />`);
		response.end();
	});
}

exports.getImage = function(request, response) {
	const pattern = /[^/]+[.][a-z/0-9]{1,}/gi
	const fileName = pattern.exec(decodeURI(request.url));
	
	fs.readFile(`${uploadedPath}/${fileName}`, "binary", function(err, file){
		if (err) return console.warn(err);
		response.writeHead(200, {'Content-Type': 'image/png'});
		response.write(file, "binary");
		response.end();
	})
}


exports.getBootstrap = function(request, response) {
	serveCss('public/bootstrap.min.css', response);
}


exports.getMainStyle = function(request, response) {
	serveCss('public/style.css', response);
}


exports.error = function(request, response) {
	console.log('I don\'t know what to do');
	response.write('404 :(');
	response.end();
}


function serveCss(path, res) {
	fs.readFile(path, function(err, css){
		if (err) throw err;
		res.writeHead(200, {"Content-Type": "text/css; charset=utf-8"});
	  	res.write(css);
		res.end();
	});
}





