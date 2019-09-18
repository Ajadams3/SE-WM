var express = require('express');
var path = require('path'); 
var bodyParser = require('body-parser');
var crypto = require('crypto');

//initializing express and database packages
var app = express();
const pg = require('pg');

//enabling css style sheet 
app.use(express.static(__dirname + '/public'));

//creating the server and default routes
app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/signup.html');
}).listen(3000);

console.log("Server listening at : 3000");
app.use('/public', express.static(__dirname + '/public'));
app.use( bodyParser.json() );
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
	extended: true
}));

//function to hash the password
var getHash = ( pass , phone ) => {
    
    var hmac = crypto.createHmac('sha512', phone);
    
    //passing the data to be hashed
    data = hmac.update(pass);
    //Creating the hmac in the required format
    gen_hmac= data.digest('hex');
    //Printing the output on the console
    console.log("hmac : " + gen_hmac);
    return gen_hmac;
}

//recieve request from the front end and store it into the database
app.post('/sign_up' ,function(req,res){
	var email_input= req.body.email;
    var pass_input = req.body.password;
    var pass2_input = req.body.password2;
	var pin_input = req.body.pin;
    //var password = getHash( pass , phone ); 

//connecting to postgreSQL hosted by heroku
const {Pool,Client} = require('pg')
const pool = new Pool({
    user:"zvolwhfpjcaron",
    host:"ec2-107-20-185-16.compute-1.amazonaws.com",
    database:"de23q4p6jeqmso",
    password: "3138bce99d9158bb14b7a17832f1049c7f57a5429e1ffae0633ed00170c154b3",
    port:"5432",
    ssl:true
})

pool.query("INSERT INTO Login (email, password, pin)values('"+email_input+"' ,'"+pass_input+"','"+pin_input+"')",(err,res)=>{
    if (err) {
        console.log(err);
        res.status(400).send(err);
    }
    else{
        console.log(err,res)
        console.log("DATA was succesfully inputed into database ");//+ JSON.stringify(data) );    
        pool.end()
    }
})
    
	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('/public/success.html');  

});
