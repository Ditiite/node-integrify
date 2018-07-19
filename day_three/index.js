const express = require('express');
const bodyParser = require('body-parser');
const chalk = require('chalk');
const path = require('path');

const port = process.env.PORT || 8000;
const app = express();

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, '/views')))
app.set('view engin', 'ejs');

const students = [
    {
        _id: 1,
        name: 'Jaya',
        age: 22,
        country: 'Nepal'
    },
    {
        _id: 2,
        name: 'Didi',
        age: 34,
        country: 'England'
    },
    {
        _id: 3,
        name: 'Marite',
        age: 32,
        country: 'Latvia'
    }
]

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/views/index.ejs'));
})

app.get('/students/:id', (req, res) => {
    const id = Number(req.params.id);
    let flag = false; //To check if the result was found or no

    for (let i = 0; i < students.length; i++) {
        if (students[i]._id === id) {
            res.json(students[i])
            flag = true; // When find the is the set it to true
            break;
        }
    }

    if (!flag) {
        res.send(`Student n. ${id} was not found.`);
    }
});

app.post("/add-student", (req, res) => {
    console.log(req.body);
    students.push(req.body);
    res.send("New student was added.");
})

app.delete('/students/:id', (req, res) => {
    const id = Number(req.params.id);
    let flag = false; //To check if the result was found or no

    for (let i = 0; i < students.length; i++) {
        if (students[i]._id === id) {
            students.splice(i, 1)
            //res.json(students[i])
            res.json('The item is removed')
            flag = true; // When find the is the set it to true
            break;
        }
    }

    if (!flag) {
        res.send(`Student n. ${id} was not found.`);
    }
})

app.listen(port, () => {
    console.log(`Hello from third day with node.js ${chalk.magenta(port)}`);
})


