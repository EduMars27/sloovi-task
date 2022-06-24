const express = require('express')
const app = express()
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')

// connect to database
const mongoose = require('mongoose')

const Task = require('./models/Task')

dotenv.config();

const PORT = process.env.PORT || 8080;

app.use(cors({origin: true, credentials: true}));

app.use(express.json())
app.use(express.urlencoded({extended: true}))

app.use(express.static(path.join(__dirname, "client", "build")))

// 'mongodb://127.0.0.1:27017/Tasks' -> for keep in case i need the offline db

mongoose.connect(process.env.MONGO_DB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then((res) => {
        console.log('Successfully connected to DB')
    })
    .catch((err) => {
        console.log(err)
    })


// GET ALL Tasks FROM THE DATABASE
app.get('/api', async (req, res) => {
    let allTasks;

    try {
        allTasks = await Task.find().sort({createdAt: -1})
        res.status(200).json(allTasks)
    } catch (err) {
        res.status(500).json(err)
    }
})

// ADD Task TO THE DATABASE
app.post('/api', async (req, res) => {
    
    const newTask = new Task(req.body)

    try {
        const savedTask = await newTask.save()
        res.status(200).json(savedTask)
    } catch (err) {
        res.status(500).json(err)
    }
})

// EDIT Task IN THE DATABASE
app.put('/api/update/:id', async (req, res) => {
    try {
        const updateTask = await Task.findByIdAndUpdate(req.params.id, { $set: req.body}, {new: true});
        res.status(200).json(updateTask)
    } catch (error) {
        res.status(500).json(error)
    }
})

// DELETE TASK FROM DATABASE
app.delete('/api/task-delete/:id', async (req, res) =>{
    try {
        await Task.findByIdAndDelete(req.params.id)
        res.status(200).json({msg: 'Task has been successfully delete'})
    }

    catch(err) {
        res.status(500).json('Unable to delete task')
    }
})

app.get("*", (req, res) => {
    res.sendFile(path.join(__dirname, "client", "build", "index.html"));
});

app.listen(PORT, () => {
    console.log('Server running on Port 5000')
})