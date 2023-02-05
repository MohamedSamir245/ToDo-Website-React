const express = require("express");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

const mysql = require("mysql");
const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "password",
  database: "TodoProject",

});

app.post("/AddTask", (req, res) => {
  const tsk = req.body.usertask;

  db.query("INSERT INTO Tasks (title) VALUES (?)", tsk, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("values inserted");
    }
  });
});

app.post("/checktask", (req, res) => {
  const progress = req.body.progress;
  const id=req.body.id

  db.query("update todoproject.tasks set progress=? where id=?", [progress,id], (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send("Task Updated");
    }
  });
});

app.post("/deletetask", (req, res) => {
  const id = req.body.id
  db.query("delete from todoproject.tasks where id=?", id, (err, result) => {
    if (err)
      console.log(err)
    else
      res.send("Task Deleted")
  })
  
})

app.get('/tasks', (req, res) => {
  db.query("Select * from todoproject.tasks", (err, result) => {
    if (err) { console.log(err) }
    else
    {
      res.send(result)
    }
    
  })
     
})

app.listen(5000, () => console.log("server is running on port 5000"));
