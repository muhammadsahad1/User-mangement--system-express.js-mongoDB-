
const islogin = async(req,res,next)=>{

try{

  if(req.session.user_id)

  {  
  next()
  
  
}else{
  
  res.redirect('/')
}
}
catch(error){

  console.log(error.message);
}

} 

const islogout = async (req,res,next)=>{
  try{
     
    if(req.session.user_id){

      return res.redirect('/home')
     
    }
  next()
  }
  catch(error){
  
    console.log(error.message);
  }

}

module.exports = {

  islogin,
  islogout
  
}