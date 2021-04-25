const express = require('express');
const session = require('express-session');
const cookieParser = require('cookie-parser');
const helmet = require('helmet');
const morgan = require('morgan');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo');
const userRoute = require('./routes/userRoutes');
const shapeRoute = require('./routes/shapeRoutes');

const NODE_ENV = 'dev';
const SESS_NAME ='user';
const SESS_SECRET ='hi';
const SESS_LIFETIME = 1000 *60 *60;

const db = 'mongodb+srv://suva:suva@cluster1.6mbz1.mongodb.net/app?retryWrites=true&w=majority';

mongoose.connect(db,{
    useNewUrlParser:true,
    useCreateIndex:true,
    useFindAndModify:false,
    useUnifiedTopology:true
}).then( () =>{console.log('DB connection successful')});

const sessionAuth = (req, res, next) =>{
  const user = req.session.user;
  if(!user)
  {
    res.status(401).send("Please log into your user");
  }else next();
}


var app = express();
app.use(helmet());
app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cookieParser());
app.use(session(
  {
    name:SESS_NAME,
    secret:SESS_SECRET,
    store: MongoStore.create(
      {
        mongoUrl:db,
        collection:'sessions',
        ttl:parseInt(SESS_LIFETIME/1000),
      }),
    resave:false,
    cookie:{
      sameSite:true,
      secure:process.env.NODE_ENV === 'production',
      maxAge:parseInt(SESS_LIFETIME),
    },
  }
));
app.use(morgan('combined'));
app.use('/user',userRoute);
app.use('/shapes',sessionAuth,shapeRoute);
// app.get('/*',(req,res) => {
//     console.log(req.query.t)
//     res.send('<p> hi2 </p>');
// });

const port = process.env.PORT || 3000;
app.listen(port, () =>{
  console.log(`Server started... Listening on port ${port}`)
});

app.get('/',(req,res) => {
    res.send('<p> hi2 </p>');
});

module.exports = app;

