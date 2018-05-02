var http = require('http'),
    // path = require('path'),
    express = require('express');
    bodyParser = require('body-parser'),
    Twig = require('twig')
    session = require('cookie-session')
    urlencodedParser = bodyParser.urlencoded({ extended: false });

app = express();
server = http.createServer(app);
// we're using a session
app.use(session({
    secret:'secret',
    cookie:{
        maxAge:1000*60*30
    }
}));
// If there is no todolist in the session,
// we create an empty array before further
app.use(function(request, response, next){
    if (typeof(request.session.taskslist) == 'undefined') {
        request.session.taskslist = new Array();
    }
    next();
});

app.use(express.static(__dirname + '/public'));

app.get('/', function(request, response){
  response.render("task.twig");
});

require('./routes')(app);

// redirect to homepage when page not found
app.use(function(request, response, next){
    response.redirect('/tasks');
})
// protecting form with csrf
app.use(function(request, response, next) {
  response.locals._csrf = request.session._csrf;
  return next();
})

server.listen(8000);
