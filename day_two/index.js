const express = require("express");
const bodyParser = require('body-parser');

console.log('what dir', __dirname)

const students = [
    {
        name: 'Susansa',
        gender: 'female',
        country: 'Finland'
    },
    {
        name: 'Jaya',
        gender: 'Male',
        country: 'Finland'
    }
    , {
        name: 'Shora',
        gender: 'male',
        country: 'Finland'
    }
]

const app = express();
const studentList = [];

app.use(bodyParser.urlencoded({ extended: false }));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/' + 'index.html')
});

app.get('/students', (req, res) => {
    res.json(students)
});
app.get('/add-student', (req, res) => {
    res.sendFile(__dirname + '/' + 'add-student.html')
})
app.post('/students-info', (req, res) => {
    let { firstName, lastName, email, message } = req.body;
    console.log(req.body)
    studentList.push({ firstName, lastName, email, message });
    console.log(studentList)
    const info = `<h3>${firstName} ${lastName}, Thank so for contacting us</h3><p> We will contact you soon.<p>`
    res.send(info)
})

app.listen(3000, () => {
    console.log('Server is running on port 3000....')
});
