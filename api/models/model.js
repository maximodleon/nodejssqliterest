
var sqlitedb = require('sqlite3').verbose();
var db = new sqlitedb.Database('todos.db');

exports.create_db = function(req, res) {
    db.serialize(function(){
        db.run('CREATE TABLE IF NOT EXISTS todo (id integer primary key autoincrement, fecha text, detalle text)');
    });
     db.close(); 
};
   

   