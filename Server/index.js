// Create the server
const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

// Middleware
app.use(cors());
app.use(express.json());

//ROUTES//

// Create a ToDo
app.post("/todos", async (req, res) => {
    try {
        const {description} = req.body;
        const newToDo = await pool.query("INSERT INTO todo(description) VALUES($1) RETURNING *", 
        [description]);

        res.json(newToDo.rows[0]);
    } catch(err){
        console.error(err.message);
    }
})

// Get all ToDo
app.get("/todos", async (req, res) => {
    try {
        const allToDos = await pool.query("SELECT * FROM todo");
        res.json(allToDos.rows);
    }catch(err){
        console.error(err.message);
    }
})

// Get a ToDo
app.get("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const todo = await pool.query("SELECT * FROM todo WHERE todo_id = $1", [id]);

        res.json(todo.rows[0]);
    }catch(err){
        console.error(err.message);
    }
})
// Update a ToDo
app.put("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const {description} = req.body;
        const updateToDo = await pool.query(
            "UPDATE todo SET description = $1 WHERE todo_id = $2", [description, id]);
    }catch(err){
        console.error(err.message);
    }
    res.json("ToDo was updated.");
});

// Delete a ToDo
app.delete("/todos/:id", async (req, res) => {
    try {
        const {id} = req.params;
        const deleteToDo = await pool.query("DELETE FROM todo WHERE todo_id = $1", [id]);

        res.json("A ToDo was deleted.")
    } catch (err) {
        console.log(err.message);
    }
})



app.listen(5000, () => {
    console.log("server has started on port 5000");
});