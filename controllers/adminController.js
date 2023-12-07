const User = require('../models/userModel')
const bcrypt = require('bcrypt')

const securePassword = async (password) => {


  try {
    const securepass = await bcrypt.hash(password, 10);
    return securepass;

  }
  catch (error) {

    console.log(error.message);
  }
}

const loadLogin = async (req, res) => {

  try {

    res.render('login')
  }

  catch (error) {
    console.log(error.message);
  }
}
// loginverify

const loginVerify = async (req, res) => {

  try {

    const email = req.body.email
    const password = req.body.Password
    const userData = await User.findOne({

      email: email

    })

    if (userData) {
      const passwordMatch = await bcrypt.compare(password, userData.password)
      if (passwordMatch) {

        if (userData.is_admin === 0) {

          res.render('login', { message: 'sorry! your are not admin.' })


        } else {
          req.session.user_id = userData._id
          res.redirect('/admin/home')


        }
      } else {

        res.render('login', { message: 'enter valid password' })

      }



    } else {

      res.render('login', { notadminmsg: 'enter valid entry' })
    }


  }
  catch (error) {

    console.log(error.message);
  }
}

// load dashboard

const loadDashboard = async (req, res) => {

  try {

    const userData = await User.find({ is_admin: 0 })
    res.render('home', { users: userData })

  } catch (error) {

    console.log(error.message);
  }

}

const adminlogout = async (req, res) => {

  try {
    req.session.destroy();
    res.render('login', { log: "logout successfully" })

  }
  catch (error) {
    console.log(error.message);
  }
}


// add new user

const newUserLoad = async (req, res) => {
  try {

    res.render('new-user')

  }
  catch (error) {

    console.log(error.message);

  }

}

const addUser = async (req, res) => {

  try {

    const spassword = await securePassword(req.body.password)
    const user = new User({

      name: req.body.name,
      email: req.body.email,
      mobile: req.body.mobile,
      password: spassword,
      is_admin: 0


    })

    const userData = user.save();
    if (userData) {
      res.render('new-user', { message: "success" })

    } else {
      res.render('new-user', { message: "something went wrong. try again" })
    }

  }
  catch (error) {

    console.log(error.message);
  }
}

// edit user

const editUserLoad = async (req, res) => {

try{ 
   const id = req.query.id;
  const userData = await User.findById({_id:id})
if(userData ){

  res.render('edit-user',{user:userData});

}else{

  res.redirect('/admin/home')
}

}catch(error){
console.log(error.message);

}

}

const updateUser = async (req,res)=>{
try{

const userData = await User.findByIdAndUpdate({_id:req.body.id},
  {$set:{name:req.body.name,
        email:req.body.email,
        mobile:req.body.mobile}}) 

        res.redirect('/admin/home')

}
catch(error){
  console.log(error.message);
}
}

const deletUser = async (req,res)=>{

  try{

    const id = req.query.id
   const userData = await User.deleteOne({_id:id})
   res.redirect('/admin/home')
  }catch(error){
console.log(error.message);
  }
}

module.exports = {
  loadLogin,
  loginVerify,
  loadDashboard,
  adminlogout,
  newUserLoad,
  addUser,
  editUserLoad,
  updateUser,
  deletUser


}