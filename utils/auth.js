//withAuth makes it so that users can only access certain contents if they are logged in otherwise 
//if they are not it just moves onto the next command
const withAuth = (req, res, next) => {
    if (!req.session.loggedIn) {
       res.redirect('/login')
    } else {
      next();
    }
  };
  
  module.exports = withAuth;