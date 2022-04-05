const express = require('express');
const userModel = require('./userModel/userModel')


const app = express();
app.use(express.json());
app.listen(5000, () => {
    console.log('listining');
})


const signupRouter = express.Router();
const loginRouter= express.Router();

app.use('/signup', signupRouter);
app.use('/login' , loginRouter);

signupRouter
    .route('/')
    .post(signupUser)

loginRouter
  .route('/')
  .post(loginUser)

async function signupUser(req, res) {
  
  try{
    let user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword
    }
    let userObj = await userModel.create(user);
    console.log(userObj);
    res.json({
        message: userObj
    })
  }catch(err){
    res.status(500);
    res.json({
        message : err.message
    })
   console.log(err);
  }

}



async function loginUser(req, res) {
    console.log("work");
  try {
      let data = req.body;
      if (data.email) {
          let user = await userModel.findOne({ email: data.email });
          if (user) {
              if (user.password === data.password) {
                  // let uid = user["_id"];
                  // let token = jwt.sign({payload:uid},JWT_KEY);
                  // res.cookie("login" ,token)
                  res.json({
                      message:"Logged in"
                  })
              } else {
                  res.send("Wrong password ")
              }
          } else {
              res.send("User not found")
          }
      } else {
          res.send("Empty Field")
      }

  } catch (error) {
      res.send(error.message)
      res.status(500);
  }
}