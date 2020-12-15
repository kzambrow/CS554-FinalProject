const postRoutes = require("./posts");
const userRoutes = require("./users");
const imageRoutes = require('./images');
var cors = require('cors');
// const logoutRoutes = require("./logout");
// const profileRoutes = require("./profile");

const constructorMethod = (app) => {

  const logRequestDetail = (req, res, next) => {
    
    console.log(`${req.method} ${req.originalUrl}`)

    next();
  }
//   app.use("/register", registerRoutes);
//   app.use("/login", loginRoutes);
//   app.use("/logout", logoutRoutes);
  app.use(cors());
  app.use("/user", userRoutes);
  app.use("/post", postRoutes);
  app.use("/images", imageRoutes);
  app.use(logRequestDetail);

//   app.use('/api/property', propertyRoutes);
//   app.use('/api/user', userRoutes);
  
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;