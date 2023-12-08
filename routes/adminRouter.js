
const express = require('express');
const config = require('../config/config');

const adminRouter = express();
const session = require('express-session');

adminRouter.use(session({secret:config.sessionsecret,resave:false,saveUninitialized:false}));

adminRouter.use(express.json());
adminRouter.use(express.urlencoded({extended:true}));



adminRouter.set('view engine','ejs');
adminRouter.set('views','./views/admin');

const adminController = require('../controllers/adminController');
const auth = require('../middleware/adminAuth')

adminRouter.get('/',auth.isLogout ,adminController.loadLogin)

adminRouter.post('/', adminController.loginVerify)
adminRouter.get('/home',auth.isLogin, adminController.loadDashboard)
adminRouter.get('/logout',auth.isLogin,adminController.adminlogout)


adminRouter.get('/new-user',auth.isLogin,adminController.newUserLoad)
adminRouter.post('/new-user',adminController.addUser)
adminRouter.get('/edit-user',auth.isLogin,adminController.editUserLoad)
adminRouter.post('/edit-user',adminController.updateUser)

adminRouter.get('/delet-user',adminController.deletUser)

adminRouter.get('*',(req,res)=>{
   
  res.redirect('/admin')

})


module.exports = adminRouter ;