const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const index = require('./routes/indexRoute');
const teacher = require('./routes/teacherRoute');
const student = require('./routes/studentRoute');
const subject = require('./routes/subjectRoute');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

app.use('/', index);
app.use('/teachers', teacher);
app.use('/students', student);
app.use('/subjects', subject);

app.listen(3000, () => {
  console.log('Hello from port: 3000');
});
