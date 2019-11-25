var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var crypto = require('crypto');
const pg = require('pg');
var app = express();
var ejs = require('ejs');
var sequelize = require('sequelize');
var client = new pg.Client();
const config = require('./config');
const { performance } = require('perf_hooks');

// Set EJS as templating engine
app.set('view engine', 'html');
app.engine('html',require('ejs').renderFile);
app.use(bodyParser.urlencoded({ // to support URL-encoded bodies
    extended: true
}));

//var DATABASE_URL=$(heroku config:get DATABASE_URL -a dataflow-project) node


//enabling css style sheet
app.use(express.static(__dirname + '/public'));
app.set('views', __dirname + '/public');

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
});

// creating the server and default routes
app.get('/',function(req,res){
	res.set({
		'Access-Control-Allow-Origin' : '*' // creates access from any orgin
	});
	return res.redirect('/public/index.html');
}).listen(process.env.PORT || 3000);

console.log("Server listening at : 3000");
app.use('/public', express.static(__dirname + '/public'));

//To allow the storage of spaces in text fields
app.use(bodyParser.text({ type: 'text/html' }))
app.use(bodyParser.text({ type: 'text/xml' }))

function primary_key_generator(){
    return (
      Number(String(Math.random()).slice(2)) +
      Date.now() +
      Math.round(performance.now())
    ).toString(36);
}

 //recieve request from the front end and store it into the database
app.post('/add_client' , function(req,res){
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

    // checking if toggle switch is on or off
    if( companyStatus_input == "on" )
    {
        companyStatus = true;
    }

    else
    {
        companyStatus = false;
    }

    // reversing the date for postgreSQL
    startDate_input = startDate_input.split("/").reverse().join("-");

const client = new Client({
    user:config.db.user,
    host:config.db.host,
    database:config.db.database,
    password:config.db.password,
    port:config.db.port,
    ssl:config.db.ssl
  })

client.connect()

const insertText = 'INSERT INTO client_table (client_id, name, company, email, phone, phone_type, address_one,\
                    address_two, city, state, zip, county, start_date, company_status) VALUES ($1, $2, $3, $4, $5, $6,\
                    $7, $8, $9, $10, $11, $12, $13, $14)'

client.query(insertText, [clientId_input, clientName_input, company_input, email_input, phone_input, phoneType_input,
addressOne_input, addressTwo_input, city_input, state_input, zip_input, county_input, startDate_input, companyStatus],(err,res)=>{

    if (err)
    {
        console.log(err);
        client.end();
        //res.status(400).send(err);
    }
    else{
        console.log(err,res)
        console.log("DATA was succesfully inputed into database ");//+ JSON.stringify(data) );
        client.end();
    }
})

	res.set({
		'Access-Control-Allow-Origin' : '*'
	});
	return res.redirect('pos.html');
});

app.post('/pre_login', function(req, res) {


      return res.render("login.html",{success: 'none'});

  });

app.post('/get_clients', function(req, res) {

  client = new Client({
      user:config.db.user,
      host:config.db.host,
      database:config.db.database,
      password:config.db.password,
      port:config.db.port,
      ssl:config.db.ssl
    })

    client.connect()

    client.query("SELECT company FROM client_table", function(err, results) {
      if (err)
      {
          console.log(err);
          client.end();
      }
      else{
          //console.log(err,res)
          console.log("Success! Client sent!");
          client.end();
          }

      return res.render("edit_client.html",{names: results});

  });
});

app.post('/login', function(req, res) {

  client = new Client({
      user:config.db.user,
      host:config.db.host,
      database:config.db.database,
      password:config.db.password,
      port:config.db.port,
      ssl:config.db.ssl
    })

    client.connect()
    client.query("SELECT email, password, pin, access_rights, name FROM login_table", function(err, results) {
      if (err)
      {
          console.log(err);
          client.end();
      }
      else{
          //console.log(err,res)
          console.log("Success! Login info sent!");
          client.end();
          }

          var userName, user_pin, user_access_code;
          var user_email = req.body.email_id;
          var user_pass = req.body.pass_id;
          var emailBool = false;
          var passBool = false;
          var success = "false";

        //  for loop is how you can step through the database per row
          for(let step = 0;step < results.rows.length; step++)
          {
            if(results.rows[step].email == user_email)
            {
              emailBool = true;
              user_pin = results.rows[step].pin;
            }

            if(results.rows[step].password == user_pass)
            {
              passBool = true;
            }
          }

          if(emailBool == true && passBool == true)
          {
            success = "true";

          }
          else{
            success = "false";
          }

      client.end();

    if(success == "true")
    {
      return res.render("login_pin.html",{pin:user_pin, success: success});

    }

    if(success == "false")
    {
    //res.send('<script>alert("Login denied, re-enter email and password!")</script>');
     return res.render("login.html",{success: success});
     }

    });
  });

  app.post('/get_edit_client', function(req, res) {

    var company_name = req.body.key;

    var selectedCompany = company_name[0];

    client = new Client({
        user:config.db.user,
        host:config.db.host,
        database:config.db.database,
        password:config.db.password,
        port:config.db.port,
        ssl:config.db.ssl
      })

      client.connect()

      const getClient = 'SELECT *  FROM client_table WHERE company = $1'

      client.query(getClient, [selectedCompany], function(err,compResults){

        if (err)
          {
              console.log(err);
              client.end();
          }
          else{
              client.end();
              }




        return res.render("edit_selected_client.html",{client_info: compResults});

    });
  });

app.post('/update_client', function(req, res) {

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
  var clientId = req.body.key;
  var companyStatus_input = req.body.toggle;
  var companyStatus = false;
  //startDate_input = startDate_input.split("/").reverse().join("-");
  console.log(companyStatus_input);
  // checking if toggle switch is on or off
  if( companyStatus_input != "on" )
  {
      companyStatus = false;
  }

  else if(companyStatus_input == "on")
  {
      companyStatus = true;
  }

  // reversing the date for postgreSQL


  const client = new Client({
      user:config.db.user,
      host:config.db.host,
      database:config.db.database,
      password:config.db.password,
      port:config.db.port,
      ssl:config.db.ssl
  })


  client.connect()

  const updateTable = 'UPDATE client_table SET name = $1, company = $2, email = $3, phone = $4, phone_type = $5, address_one = $6,\
                      address_two = $7, city = $8, state = $9, zip = $10, county = $11, start_date = $12, company_status = $13\
                      WHERE client_id = $14'

  client.query(updateTable, [clientName_input, company_input, email_input, phone_input, phoneType_input, addressOne_input, addressTwo_input, city_input, state_input, zip_input, county_input, startDate_input, companyStatus, clientId],(err,res)=>{

      if (err)
      {
          console.log(err);
          client.end();
      }
      else{
          console.log(err,res);
          console.log("DATA was succesfully inputed into database ");//+ JSON.stringify(data) );
          client.end();
      }
  })
      return res.render("pos.html");

  });

  app.post('/view_clients', function(req, res) {

    client = new Client({
        user:config.db.user,
        host:config.db.host,
        database:config.db.database,
        password:config.db.password,
        port:config.db.port,
        ssl:config.db.ssl
      })

      client.connect()



        client.query("SELECT * FROM client_table ORDER BY company", function(err, results) {
          if (err)
          {
              console.log(err);
              client.end();
          }
          else{
              client.end();
              }

               //results.sort();
               //var myarray=["Bob", "Bully", "Amy"];
               //results.rows.company.sort();
               //results.sortBy('company');
                //Array now becomes ["Amy", "Bob", "Bully"]

              //console.log(myarray);

        return res.render("view_clients.html",{results: results});

    });
  });
