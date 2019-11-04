var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
const pg = require('pg');
var app = express();
//var ejs = require('ejs');
//var ejs = require('ejs');
var sequelize = require('sequelize');
var client = new pg.Client();
const config = require('./config');

// Set EJS as templating engine
//app.set('view engine', 'html');
//app.engine('html',require('ejs').renderFile);


// Set EJS as templating engine
//app.set('view engine', 'html');
//app.engine('html',require('ejs').renderFile);

app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
//app.set('views', __dirname + '/views');
    extended: true

}));

//enabling css style sheet
app.use(express.static(__dirname + '/public'));
//app.set('views', __dirname + '/views');


var configs = {
    user:config.db.user,
    host:config.db.host,
    database:config.db.database,
    password:config.db.password,
    port:config.db.port,
    ssl:config.db.ssl
}

// initializes a connection pool, keps idle connection open for 30 seconds, max 10 idle clients
var pool = new pg.Pool(configs);

const { Pool, Client } = require('pg')

// before conducting a query, acquire a client from the pool, run a query on the client, return client to pool
pool.connect(function(err, client, done) {
    if(err) {
        return console.error('Error fetching client from pool', err);
    }
	return res.redirect('/public/index.html');

// creating the server and default routes
app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*' // creates access from any orgin
	});
	return res.redirect('/public/index.html');
}).listen(process.env.PORT || 3000);

console.log("Server listening at : 3000");
//To allow the storage of spaces in text fields
      Number(String(Math.random()).slice(2)) +
      Date.now() +
      Math.round(performance.now())
    ).toString(36);
      Number(String(Math.random()).slice(2)) +
      Date.now() +
    //recieve request from the front end and store it into the database
app.post('/add_client' , function(req,res){
      Math.round(performance.now())
    var company_input = req.body.company;
    var clientName_input = req.body.name;
    var email_input = req.body.email;
    var phone_input = req.body.phone;
    var phoneType_input= req.body.phoneType;
    var addressOne_input = req.body.addressOne;
    var addressTwo_input = req.body.addressTwo;
    var city_input= req.body.city;
    var state_input = req.body.state;
    var zip_input = req.body.zip;
    var county_input = req.body.county;
    var startDate_input = req.body.startDate;
    var clientId_input = primary_key_generator();
    var companyStatus_input = req.body.toggle;
    var companyStatus = false;
}
    // checking if toggle switch is on or off
    if( companyStatus_input == "on" )
    if( companyStatus_input == "on" )
        companyStatus = true;

    startDate_input = startDate_input.split("/").reverse().join("-");
    else
        console.log("DATA was succesfully inputed into database ");//+ JSON.stringify(data) );
        companyStatus = false;

app.post('/login', function(req, res) {
    // reversing the date for postgreSQL
    startDate_input = startDate_input.split("/").reverse().join("-");
      password:config.db.password,
    client.connect()

    client.query("SELECT email, password, pin, access_rights, name FROM login_table", function(err, results) {
      if (err)
      {
          console.log(err);
          client.end();
      }
      else{
          console.log("Success! Login info sent!");
          client.end();
const insertText = 'INSERT INTO client_table (client_id, name, company, email, phone, phone_type, address_one,\
                    address_two, city, state, zip, county, start_date, company_status) VALUES ($1, $2, $3, $4, $5, $6,\
                    $7, $8, $9, $10, $11, $12, $13, $14)'

client.query(insertText, [clientId_input, clientName_input, company_input, email_input, phone_input, phoneType_input,
addressOne_input, addressTwo_input, city_input, state_input, zip_input, county_input, startDate_input, companyStatus],(err,res)=>{
          var user_email = req.body.email_id;
          var user_pass = req.body.pass_id;
          var emailBool = false;
          var passBool = false;
          var success = false;
        //res.status(400).send(err);
        //  for loop is how you can step through the database per row
          for(let step = 0;step < results.rows.length; step++)
        console.log(err,res)
            if(results.rows[step].email == user_email)
            {
              emailBool = true;
              user_pin = results.rows[step].pin;
            }

            if(results.rows[step].password == user_pass)
            {
	return res.redirect('/public/success.html');
            }
          }
app.post('/login', function(req, res) {
          if(emailBool == true && passBool == true)
  client = new Client({
          //  window.location.href="login_pin.html";
          }
          else{
            success = false;
          }

      client.end();

      {
        //res.send('<script>alert("Login Succesfull!")</script>');
    client.query("SELECT email, password, pin, access_rights, name FROM login_table", function(err, results) {
    //  return res.sendFile('login_pin.html');


      }
      else
      {
          //console.log(err,res)
          console.log("Success! Login info sent!");
      }


          var userName, user_pin, user_access_code;
          var user_email = req.body.email_id;
          var user_pass = req.body.pass_id;
          var emailBool = false;
          var passBool = false;
          var success = false;
        //  for loop is how you can step through the database per row
          for(let step = 0;step < results.rows.length; step++)
            if(results.rows[step].email == user_email)
            {
              emailBool = true;
              user_pin = results.rows[step].pin;
            if(results.rows[step].password == user_pass)
              passBool = true;
          if(emailBool == true && passBool == true)
            success = true;

          //  window.location.href="login_pin.html";
            success = false;
      if(success)
        //res.send('<script>alert("Login Succesfull!")</script>');
      res.redirect('/login_pin.html');
      //res.send('<script>alert("Login Succesfull!")</script>');
      //var data = 0;
      //return res.sendFile('login_pin.html', { data: data });
    //  return res.sendFile('login_pin.html');
      else
      {
      //res.send('<script>alert("Login denied, re-enter email and password!")</script>');
      return res.redirect('login.html');
      }
