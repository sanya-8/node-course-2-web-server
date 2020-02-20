const express = require('express');
const hbs = require('hbs');
const fs = require('fs');

var app = express();

hbs.registerPartials(__dirname + '/views/partials');
app.set("public engine",'hbs');
app.use(express.static(__dirname + '/public'));

hbs.registerHelper('getCurrentYear' , () =>{
	return new Date().getFullYear();
});
hbs.registerHelper('screamIt' , (text) =>{
	return text.toUpperCase();
});

app.use((req,res,next) =>{

	var now = new Date().toString();
	var log = `${now} : ${req.method} ${req.url}`;

	console.log(log);
	fs.appendFile('server.log',log + '\n' , (err) =>{
		if(err)
			console.log('Unable to append');
	});
});
app.get('/about', (req,res) =>{

	res.render('about.hbs', {

		pageTitle : 'About Page',
		welcomeMessage : 'Welcome to my website'
	});
});

app.listen(3000,() =>{
	console.log('Server is up and running at 3000');
} );