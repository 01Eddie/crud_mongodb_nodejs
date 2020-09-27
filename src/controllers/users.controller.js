const usersCtrl= {};

const passport = require('passport')

const User= require('../models/User')

usersCtrl.renderSignUpForm= (req, res) => {
    res.render('users/signup')
}
usersCtrl.signup = async(req, res) => {
    //res.send('signup')
    //console.log(req.body)
    //res.send('Received')
    const errors = [];
    const {name, email, password, confirm_password} = req.body
    if (password != confirm_password) {
        //req.flash('error_msg')
        errors.push({text: 'Passwords do not match'})
    } if (password.length < 4) {
        errors.push({text:'PAssword must be at least 4 characters.'})
    } if (errors.length > 0) {
        res.render('users/signup', {
            errors,
            name,
            email,
            password,
            confirm_password
        })
    }else{
        //res.send('signup successfully');
        const emailUser = await User.findOne({email:email})
        if (emailUser) {
            req.flash('error_msg', 'The email is already in use');
            req.redirect('/users/signup')
        } else {
            const newUser = new User({name, email, password});
            newUser.password = await newUser.encryptPassword(password)
            await newUser.save();
            req.flash('success_msg','You are registered')
            res.redirect('/users/signin');
        }
    }
};

usersCtrl.renderSigninForm = (req, res)=>{
    res.render('users/signin')
}
 
//OTRO METODO MUY IMPORTANTE Y ALTERNATIVO ES EL MAS FACIL DE HACER para lel logeo
usersCtrl.signin = passport.authenticate('local', {
    failureRedirect: '/users/signin',
    successRedirect: '/notes',
    failureFlash: true
})

usersCtrl.logout = (req, res) => {
    req.logout();
    req.flash('success_msg', 'You are logged out now.')
    res.redirect('/users/signin');
}

module.exports = usersCtrl;