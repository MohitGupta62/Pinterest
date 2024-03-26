var express = require('express');
var router = express.Router();
const userModel = require("./users");
const postModel = require("./post");
const passport = require('passport');
const localStrategy = require("passport-local");
passport.use(new localStrategy(userModel.authenticate()));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render("feed")
});

router.get('/feed', function(req, res, next) {
  res.render("feed")
});

router.get('/profile', isLoggedIn, function(req, res, next) {
  res.send("profile");
});

router.post('/register', function(req, res, next) {
  const { username, email, fullname } = req.body;
  const userData = new userModel({ username, email, fullname });

  userModel.register(userData, req.body.password)
  .then(function(){
    passport.authenticate("local")(req, res, function(){
      res.redirect("/profile")
    })
  })
});

// router.get('/login',passport.authenticate('local',{
// successRedirect:'/profile',
// failureRedirect:'/',
// }),function(req,res,next){})

router.get('/logout',function(req,res,next){
req.logout(function(err){
if(err){return next(err);}
res.redirect('/')
 });
});

function isLoggedIn(req, res, next){
  if(req.isAuthenticated()) return next();
  res.redirect("/")
}


router.get('/sign', function(req, res, next) {
  
});



// router.get('/alluserposts', async function(req, res, next) {
//   let user = await userModel.findOne({_id: "65a2c0c95a62c18d1a315b91"})
//   .populate('posts') //populate user ka id nahi, bakli user ka post dikha deta hai id ke sath
//   res.send(user)
// });

// router.get('/createuser', async function(req, res, next) {
//   let createduser = await userModel.create({
//     username: "mohit",
//     password: "mohit",
//     posts: [],
//     email: "mohit@male.com",
//     fullname: "Mohit Gupta",
//   });

//   res.send(createduser);
// });

// router.get('/createpost', async function(req, res, next) {
//   let createdpost = await postModel.create({
//     postText: "hello ekaur",
//     user: "65a2c0c95a62c18d1a315b91",
//   });
//   let user = await userModel.findOne({_id: "65a2c0c95a62c18d1a315b91"});
//   user.posts.push(createdpost._id);
//   await user.save();
//   res.send("done")
// });

module.exports = router;
