var express = require('express'),
  app = express(),
	bodyParser = require('body-parser'),
	conn = require('./config/conn'),
	mysql = require('mysql'),
	myConnection  = require('express-myconnection'),
	dbOptions = {
    host: conn.database.host,
    user: conn.database.user,
    password: conn.database.password,
    port: conn.database.port, 
    database: conn.database.db
	},	
  port = process.env.PORT || conn.server.port;

/**
 * 3 strategies can be used
 * single: Creates single database connection which is never closed.
 * pool: Creates pool of connections. Connection is auto release when response ends.
 * request: Creates new connection per new request. Connection is auto close when response ends.
 */ 

app.use(myConnection(mysql, dbOptions, 'pool'))
	
/**
 * This module let us use HTTP verbs such as PUT or DELETE 
 * in places where they are not supported
 */ 
const methodOverride = require('method-override');
/**
 * using custom logic to override method
 * 
 * there are other ways of overriding as well
 * like using header & using query value
 */ 
app.use(methodOverride((req, res) => {
  if (req.body && typeof req.body === 'object' && '_method' in req.body) {
    // look in urlencoded POST bodies and delete it
    const method = req.body._method
    delete req.body._method
    return method
  }
}))

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// session library
var session = require('express-session');
app.use(session({ 
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true,
  cookie: { maxAge: 1200000 }
}))

/**
 * setting up the templating view engine
 */ 
app.set('view engine', 'ejs')
app.use(express.static(__dirname + '/public'));
//routes
var home = require('./routes/home'),
    data = require('./routes/data');
//home page
app.use('/', home);
//data
app.use('/data', data);

app.listen(port, () => {
	console.log('Server running at port'+port+': http://127.0.0.1:'+port);
});