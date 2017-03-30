'use strict';

module.exports = function(app) {
    var list = require('../controllers/controller.js');

    app.route('/tasks')
       .get(list.list_tasks)
       .post(list.create_task);

    app.route('/tasks/:id')
       .get(list.read_task)
       .put(list.update_task)
       .delete(list.delete_task);
}