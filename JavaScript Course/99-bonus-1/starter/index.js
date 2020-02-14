const fs  = require('fs');
const http = require('http');
const url = require('url');

const json = fs.readFileSync(`${__dirname}/data/data.json`, 'utf-8'); // specifying absolute path and encoding - without encoding method will return a buffer

const laptopData = JSON.parse(json); // parsing JSON data into a JS object



// creating server
const server = http.createServer((req, res) => {

	const fullURL = url.parse(req.url, true); // url, t/f for object
	
	const pathName = fullURL.pathname;
	const id = fullURL.query.id;


	if (pathName === '/products' || pathName === '/') {
		res.writeHead(200, {'Content-type': 'text/html'}); // header are small messages letting the browser know what kind of data is coming - statusCode, headerObject	

		fs.readFile(`${__dirname}/templates/template-overview.html`, 'utf-8', (err, data) => {
	
			let overviewOutput = data;
			fs.readFile(`${__dirname}/templates/template-cards.html`, 'utf-8', (errC, dataC) => {
				
				// looping over each laptop and getting replaced html string
				const cardsOutput = laptopData.map(el => replaceTemplate(dataC, el)).join('');

				overviewOutput = overviewOutput.replace('{%CARDS%}', cardsOutput);

				res.end(overviewOutput);
			});
		});

	} else if (pathName === '/laptop' && id < laptopData.length && id >= 0) {


		res.writeHead(200, {'Content-type': 'text/html'}); // header are small messages letting the browser know what kind of data is coming - statusCode, headerObject
		
		fs.readFile(`${__dirname}/templates/template-laptop.html`, 'utf-8', (err, data) => {
			const laptop = laptopData[id];
			
			const output = replaceTemplate(data, laptop);			

			res.end(output);
		});


	} else if ((/\.(jpg|jpeg|png|gif)$/i).test(pathName)) {  //testing of pathname contains image file extensions

		fs.readFile(`${__dirname}/data/img/${pathName}`, (err, data) => {
			res.writeHead(200, {'Content-type': 'image/jpg'});
			res.end(data);
		});

	} else {
		res.writeHead(404, {'Content-type': 'text/html'}); // header are small messages letting the browser know what kind of data is coming - statusCode, headerObject
		res.end('Was not found!'); // actual response
	}	
});

// server listens on port, IP for server - 127.0.0.1 is localhost
server.listen(1337, '127.0.0.1', () => {
	console.log('server is listening on port 1337...');
});



function replaceTemplate(originalHTML, laptop) {
	let output = originalHTML.replace(/{%PRODUCTNAME%}/g, laptop.productName);
	output = output.replace(/{%IMAGE%}/g, laptop.image);
	output = output.replace(/{%PRICE%}/g, laptop.price);
	output = output.replace(/{%SCREEN%}/g, laptop.screen);
	output = output.replace(/{%CPU%}/g, laptop.cpu);
	output = output.replace(/{%RAM%}/g, laptop.ram);
	output = output.replace(/{%STORAGE%}/g, laptop.storage);
	output = output.replace(/{%DESCRIPTION%}/g, laptop.description);
	output = output.replace(/{%ID%}/g, laptop.id);

	return output;
}