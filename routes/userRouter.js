  const express = require("express");
  const user_route = express();
  const session = require('express-session')
  const userController = require('../controllers/userController');
  const config = require('../config/config')
  
    user_route.use(session({ secret: config.sessionsecret,resave:false,saveUninitialized:false }))




  const auth = require('../middleware/auth')
  
  user_route.set('view engine', 'ejs');
  user_route.set('views', './views/users')
  
  user_route.use(express.json())
  user_route.use(express.urlencoded({ extended: true }))
  

  user_route.get('/register',auth.islogout,  userController.loadRegister);
  user_route.post('/register', userController.insertUser);


  user_route.get('/',auth.islogout,  userController.loginLoad);
  user_route.get('/login', auth.islogout, userController.loginLoad);

  user_route.post('/login', userController.loginVerify);

  user_route.get('/home', auth.islogin, userController.loadHome)

  user_route.get('/logout',auth.islogin,userController.userLogout)





  module.exports = user_route;