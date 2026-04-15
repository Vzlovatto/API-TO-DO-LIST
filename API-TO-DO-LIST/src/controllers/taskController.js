const taskService = require('../services/taskService');

// Função auxiliar
const getRequestBody = (req) => {
  return new Promise((resolve) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk.toString();
    });

    req.on('end', () => {
      resolve(JSON.parse(body));
    });
  });
};

// Criar
const createTask = async (req, res) => {
  const body = await getRequestBody(req);
  const task = taskService.addTask(body.title);

  res.statusCode = 201;
  res.end(JSON.stringify(task));
};

// Listar
const listTasks = (req, res) => {
  const tasks = taskService.getTasks();
  res.end(JSON.stringify(tasks));
};

// Atualizar
const updateTask = async (req, res, id) => {
  const body = await getRequestBody(req);
  const task = taskService.updateTask(id, body);

  if (!task) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: 'Não encontrada' }));
  }

  res.end(JSON.stringify(task));
};

// Deletar
const deleteTask = (req, res, id) => {
  const success = taskService.deleteTask(id);

  if (!success) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: 'Não encontrada' }));
  }

  res.end(JSON.stringify({ message: 'Removida' }));
};

// ID
const getById = (req, res, id) => {
  const task = taskService.getTaskById(id);

  if (!task) {
    res.statusCode = 404;
    return res.end(JSON.stringify({ message: 'Tarefa não encontrada' }));
  }

  res.end(JSON.stringify(task));
};


module.exports = {
  createTask,
  listTasks,
  updateTask,
  deleteTask,
  getById
};
