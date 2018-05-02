module.exports = function ( app ) {
  app.post('/task/add', urlencodedParser, function (request, response) {
    if (request.body.new_task != '') {
        request.session.taskslist.push(request.body.new_task);
    }
    response.redirect('/tasks');
  });

  app.get('/task/delete/:id', function(request, response) {
      if (request.params.id != '') {
          request.session.taskslist.splice(request.params.id, 1);
      }
      response.redirect('/tasks');
  })

  /* showing the list and the form */
  app.get('/tasks', function(request, response) {
      response.render('task.twig', {taskslist: request.session.taskslist});
  })
}
