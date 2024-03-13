const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const tasks = [];

app.use(express.json());

//Creating a task
app.post('/tasks', (req, res) => {
    const { id, dueDate, category, priority } = req.body;
    const newTask = {
        id,
        dueDate,
        category,
        priority,
        completed: false,
    };
    tasks.push(newTask);
    res.json(newTask);
});

//Displaying all task
app.get('/tasks', (req, res) => {
    res.json(tasks);
});

//Sorting the due date
app.get('/tasks/sort/:sortType', (req, res) => {
    const sortType = req.params.sortType;
    let sortedTasks;
    switch (sortType) {
        case 'dueDate':
            sortedTasks = tasks.sort((a, b) => a.dueDate.localeCompare(b.dueDate));
            break;
        case 'category':
            sortedTasks = tasks.sort((a, b) => a.category.localeCompare(b.category));
            break;
        case 'completion':
            sortedTasks = tasks.sort((a, b) => a.completed - b.completed);
            break;
        default:
            sortedTasks = tasks;
    }
    res.json(sortedTasks);
});

//Displaying the priority of task using id
app.patch('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
        const { priority } = req.body;
        task.priority = priority;
        res.json(task.priority);
    }
})

//Task authentication
app.get('/tasks/:id', (req, res) => {
    const taskId = parseInt(req.params.id);
    const task = tasks.find((t) => t.id === taskId);
    if (task) {
        res.json(task);
    }
});

//Listening to task
app.listen(port, () => {
    console.log(`Task server running on port ${port}`);
});
