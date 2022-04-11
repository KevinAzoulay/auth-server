const express = require('express');
const cors = require('cors');
const path = require('path');
const passport = require('passport');
const UserRouter = require('./Routers/Usersrouter')
const app = express();

require('dotenv').config();
require('./config/UsersDB.JS');
require('./Models/UsersModel');
require('./Config/passport')(passport);


app.use(passport.initialize());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());

// Where Angular builds to - In the ./angular/angular.json file, you will find this configuration
// at the property: projects.angular.architect.build.options.outputPath
// When you run `ng build`, the output will go to the ./public directory

app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/users', UserRouter);
app.listen(8000);