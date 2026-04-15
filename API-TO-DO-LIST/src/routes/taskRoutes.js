const taskController = require('../controllers/taskController');
const { getById } = require('../controllers/taskController');

module.exports = (req, res) => {
    const url = req.url;
    const method = req.method;

    //GET /tesks
    if(url === '/tasks' && method == 'GET'){
        return taskController.listTasks(req, res);
    }

    // POST /tasks
    if (url === '/tasks' && method === "POST"){
        return taskController.createTask(req, res);
    }

    // PUT /tasks/:id
    if (url.startsWith('/tasks/') && method === 'PUT'){
        const id = urs.split('/')[2];
        return taskController.updateTask(req,res,id);
    }

    // DELETE /tasks/:id
    if (url.startsWith('/tasks/') && method === 'DELETE'){
        const id = url.split('/')[2];
        return taskController.deleteTask(req,res,id);
    }

    
    if (req.method === 'GET' && req.url.startsWith('/tasks/')) {
      const id = req.url.split('/')[2];
      return getById(req, res, id);
    }

    // Rota não encontrada
    res.statusCode = 404;
    res.end(JSON.stringify({message : 'rota não encontrada'}))


};
