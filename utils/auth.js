const withAuth = (req, res, next) => {
  console.log(req)
// let results = (!req.session.loggedIn) 
//     ? res.redirect('/login')
//     : next();
//     console.log(results)
    if (!req.session.loggedIn) {
      console.log('going to login page')
       res.redirect('/login')
    } else {
      console.log('going forward')
      next();
    }
  };
  
  module.exports = withAuth;