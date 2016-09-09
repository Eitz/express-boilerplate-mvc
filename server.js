// Requires
const express = require('express')
const bodyParser = require('body-parser')
const expressSession = require('express-session');
const exphbs = require('express-handlebars')
const fs = require('fs')
const path = require('path')
const app = express()

// secret for cookies
const cookieSecret = 'funny dogs'
const port = process.env.PORT || 3000;

// Setting up the view
app.engine('handlebars', exphbs({ defaultLayout: 'main' }))
app.set('view engine', 'handlebars')

// Parse the req.body as JSON
app.use(bodyParser.urlencoded({	extended: false }))

// Enable sessions with secret
app.use(expressSession({
    secret: cookieSecret,
    resave: true,
    saveUninitialized: true
}));

// serving static files in the public dir
app.use(express.static(path.join(__dirname, 'public')))

// dynamically include routes (Controllers)
function loadController(file) {
	if(file.substr(-3) === '.js') {
  	let route = require('./controllers/' + file)
  	route.controller(app)
  }	
}

fs.readdirSync('./controllers').forEach(loadController)

// Start!
function onServerStarted () {
	console.log(`\n[Server] Sucessfully started at http://localhost:${port}`)
}

app.listen(port, onServerStarted)