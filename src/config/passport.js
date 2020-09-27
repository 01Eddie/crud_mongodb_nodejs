const passport=require('passport')
const LocalStrategy=require('passport-local').Strategy

const User=require('../models/User')
//Esto es lo mismo que module.exports 
passport.use(new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password'
}, async (email, password, done) => {

    //Confirmar si coincide el correo del usuario //Match Email's user
    const user = await User.findOne({email})
    if (!user) {
        return done(null, false, { message: 'Not user found'})
    } else {
        //Match password User
        const match = await user.matchPassword(password)
        if (match) {
            return done(null, user)
        } else {
            return done(null, false,{ message: 'Incorrect Password'})
        }
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id, (err,user) => {
        done(err, user)
    })
})
;