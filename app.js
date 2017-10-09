const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const session = require('express-session')
const tools = require('./helper/tools')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine', 'ejs');
let path = require('path')
let login = require('./routs/login')
let signup = require('./routs/signup')
let index = require('./routs/index')
let user = require('./routs/user')
let teacher = require('./routs/teacher')
let student = require('./routs/student')
let subject = require('./routs/subject')
app.use(session({
  secret:'secret',
  cookies:{}
}))
app.use('/static',express.static(__dirname + '/asset'));
app.use('/signup', signup);
app.use('/login', login);
app.use('/', tools.isLogin, index)
app.use('/users', tools.isLogin, user)
app.use('/teachers', tools.isLogin, teacher)
app.use('/students', tools.isLogin, student)
app.use('/subjects', tools.isLogin, subject)
app.listen(process.env.PORT||3000,()=>{
  console.log('Listening Port 3000')
});
