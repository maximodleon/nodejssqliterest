'user strict';

var sqlitedb = require('sqlite3').verbose();

exports.list_tasks = function(req, res){   
    var db = new sqlitedb.Database('todos.db');
   db.all("SELECT id, fecha, detalle FROM todo", function(err, rows){
       if (err) {
           return res.send(err);
       }
       
      if (rows.length == 0) {
       return res.send({"results":"No tasks in the database", "code":"-1"});
    }
     var rowArray = [];
        rows.forEach(function(row) {
            rowArray.push(row)
        })
        res.json(rowArray);
        db.close();
   });
};


exports.read_task = function(req, res) {
    var db = new sqlitedb.Database('todos.db');

    db.get("SELECT id, fecha, detalle FROM todo WHERE id=?", req.params.id, function(err, row){
        if (err) {
            return res.send(err);
        }

        if (!row) {
             res.json({"results":"Id does not exists", "code":"-1"});
        }

        res.json(row);
        db.close();        
    });

};

exports.create_task = function(req, res) {

    var db = new sqlitedb.Database('todos.db');

    db.serialize(function(){

        if (!req.body.fecha) {
            return res.send({"results":"Missing parameter fecha", "code":"-1"});

        } else if (!req.body.detalle) {
            return res.send({"results":"Missing parameter detalle", "code":"-1"});
        }

        db.run("INSERT INTO todo (fecha, detalle) VALUES(?,?)", req.body.fecha, req.body.detalle);
        return res.json({"results":"Record inserted", "code":"0"});
        db.close();
    });

    
};

exports.update_task = function(req, res) {

 var db = new sqlitedb.Database('todos.db');

 if (!req.body) {
     res.send({"results":"no request body", "code":"-1"})
 }

 db.get("SELECT id, detalle, fecha FROM todo WHERE id = ?", req.param.id, function(err, row){
     if (err) {
         return res.send(err);
     } 

     if (!row) {
         return res.send({"results":"Id does not exists", "code":"-1"});
     }

     var fecha = req.body.fecha;
     var detalle = req.body.detalle;

     if (!fecha) {
        fecha = row.fecha;
     }

     if (!detalle) {
         detalle = row.detalle;
     }

     var stmt = db.prepare("UPDATE todo SET fecha = ?, detalle = ? WHERE id= ?")
     stmt.run(fecha, detalle, req.body.id);

     stmt.finalize();
     res.json({"results": "Record updated", "code":"0"});
     db.close();
 });
 
}

exports.delete_task = function(req, res) {
    var db = new sqlitedb.Database('todos.db');

    db.run("DELETE FROM todo WHERE id= ?", [req.params.id], function(err){
            if (err) {
                return res.end(err);
            }
            else {
                res.json({"results": "Record deleted", "code":"0"});
            }

            db.close();
        });
}