const User = require('../models/userModel')
const bcrypt = require('bcrypt')




const securePassword = async (password) => {
  try {

    const passwordHash = bcrypt.hash(password, 10)
    return passwordHash

  }
  catch (error) {
    
    console.log(error.message);
  }


}
// for  user registration

  const loadRegister = async (req, res) => {
    try {

      res.render('registration')
    }
    catch (error) {

      console.log(error.message);

    }

  }

// for datain

const insertUser = async (req, res) => {

  try {

    const spassword = await securePassword(req.body.password);
    const user = new User({
      name:req.body.name,
      email:req.body.email,
      mobile:req.body.mobile,
      password:spassword,
      is_admin: 0

    });


    const userData = await user.save();

    if (userData) {
      
      req.session.user = userData.name;

      res.render('registration', { regmsg: "success" })
    }
    else {

      res.render('registration', { regnotmsg: "your registration has been failed. Try again" })
    }


  } catch (error) {
    console.log(error.message);
  }

}
// User login
const loginLoad = async (req, res) => {

  try {

    

    res.render('login')

  }
  catch (error) {

    console.log(error.message);

  }
}
// login verify

const loginVerify = async (req,res) =>{

  try {

    const email = req.body.email;
    
    const password = req.body.password;

    const userData = await User.findOne({ email: email })


    if (userData) {

      const passwordMatch = await bcrypt.compare(password, userData.password)

      if (passwordMatch) {
           req.session.user_id = userData._id
           res.redirect('/home')


      } else {

        res.render('login', { msglog: "Password is incorrect" })
        
      }

    } else {


      res.render('login', { msgnotreg: "user not register" })
    }
  }

  catch (error) {

    console.log(error.message);

  }

}
// loadhome

const loadHome = async (req, res) => {
  try {
    if(req.session.user_id){
      const user =  await User.findById({_id:req.session.user_id})
      res.render('home',{user:user})
    }else{
      res.redirect('/')
    }
          
    
  }
  catch (error) {

    console.log(error.message);
  }
}

const userLogout = async (req,res)=>{

try{
    req.session.destroy();
        // res.redirect('/');
        res.render('login',{logout:"Logout Successfully"})
}
catch(error){
console.log(error.message);

}
}

module.exports = {

  loadRegister,
  insertUser,
  loginLoad,
  loginVerify,
  loadHome,
  userLogout

}