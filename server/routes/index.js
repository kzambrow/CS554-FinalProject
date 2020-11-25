const registerRoutes = require("./register");
const loginRoutes = require("./login");
const logoutRoutes = require("./logout");
const profileRoutes = require("./profile");
const postRoutes = require("./post");

const constructorMethod = (app) => {

  const logRequestDetail = (req, res, next) => {
    
    console.log(`${req.method} ${req.originalUrl}`)

    next();
  }
  app.use("/register", registerRoutes);
  app.use("/login", loginRoutes);
  app.use("/logout", logoutRoutes);
  app.use("/profile", profileRoutes);
  app.use("/post", postRoutes);
//   app.use(logRequestDetail);

//   app.use('/api/property', propertyRoutes);
//   app.use('/api/user', userRoutes);
  
  app.use('*', (req, res) => {
    res.status(404).json({error: 'Not found'});
  });
};

module.exports = constructorMethod;