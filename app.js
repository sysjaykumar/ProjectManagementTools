// app.js
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/project_management', { useNewUrlParser: true, useUnifiedTopology: true });

// Define Mongoose models
const Task = mongoose.model('Task', new mongoose.Schema({
    taskName: String,
    assignedTo: String,
    comments: [String],
}));

const Project = mongoose.model('Project', new mongoose.Schema({
    projectName: String,
    tasks: [Task],
}));

// API endpoints
app.get('/projects', async (req, res) => {
    const projects = await Project.find();
    res.json(projects);
});

app.post('/projects', async (req, res) => {
    const { projectName, tasks } = req.body;
    const newProject = new Project({ projectName, tasks });
    await newProject.save();
    res.json(newProject);
});

app.post('/tasks/:projectId/comment', async (req, res) => {
    const { projectId } = req.params;
    const { taskName, comment } = req.body;

    const project = await Project.findById(projectId);
    const task = project.tasks.find(task => task.taskName === taskName);
    task.comments.push(comment);

    await project.save();
    res.json(project);
});

app.listen(3000, () => {
    console.log('Server running on port 3000');
});
