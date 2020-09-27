//Esto es para proteger el link con el inicio o cierre de sesion
const helpers = {};

helpers.isAuthenticated = (req, res, next)=> {
    if (req.isAuthenticated()) {
        return next();
    }
    
    req.flash('error_msg', 'Not authorized');
    res.redirect('/users/signin');
}

module.exports = helpers;