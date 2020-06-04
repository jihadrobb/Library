const { User, Book, Author } = require('../models');
const bcrypt = require('bcrypt');
class Controller {
    static add(req, res){
        res.render('user/register', {alert: req.query.alert});
    }
    static insert(req, res){
        User.findOne({ where: { username: req.body.username }})
          .then(data => {
              if(data){
                  res.redirect('/user/register?alert=Username is taken');
              } else {
                  return User.create({
                    username: req.body.username,
                    password: req.body.password,
                    email: req.body.email,
                    phone_number: req.body.phone_number
                });
              }
          })
          .then(data => {
            //   res.send(data);
              res.redirect('/?alert=Register success')
          })
          .catch(err => res.send(err));
    }
    static loginForm(req, res){
        res.render('user/login', {alert: req.query.alert});
    }
    static login(req, res){
        User.findOne({ where: { username: req.body.username }})
          .then(data => {
            if(!data){
                res.redirect('/users/login?alert=Wrong username!')
            } else {
                if(bcrypt.compareSync(req.body.password, data.password)){
                    req.session.username = req.body.username;
                    res.redirect(`/users/${req.body.username}`);
                } else {
                    res.redirect('/users/login?alert=Wrong password!')
                }
            }
          })
          .catch(err => res.send(err));
    }
    static logout(req, res){
        req.session.destroy(err => {
            if(err){
                res.send(err);
            } else {
                res.redirect('/?alert=Successfully logged out');
            }
        })
    }
    static showHistory(req, res){
        User.findOne({
            where: {username: req.params.username},
            include: [Book]
        })
          .then(data => {
            //   res.send(data);
              res.render('user/history', { data });
          })
          .catch(err => res.send(err));
    }
    static borrow(req, res){

    }
    static returnForm(req, res){

    }
    static return(req, res){
        
    }
}
module.exports = Controller;