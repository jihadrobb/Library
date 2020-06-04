const { User, Book, User_Book, Author } = require('../models');
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
            where: {username: req.params.username}
        })
          .then(data => {
              return User_Book.findAll({
                  where: { UserId: data.id},
                  include: [Book]
              });
          })
          .then(data => {
                // res.send(data);
                res.render('user/history', { data, username: req.params.username });
          })
          .catch(err => res.send(err));
    }
    static borrow(req, res){
        let user;
        User.findOne({ where: { username: req.params.username }})
          .then(data => {
              user = data;
              return User_Book.create({
                  UserId: user.id,
                  BookId: req.params.BookId
              })
          })
          .then(data => {
              res.redirect(`/users/${user.username}`);
          })
          .catch(err => res.send(err));
    }
    static returnForm(req, res){
        let datas;
        User_Book.findOne({ 
            where: { id: req.params.id},
            include: [User]
        })
          .then(data => {
              datas = data;
            //   res.send(data);
              return Book.findOne({
                  where: { id: data.BookId },
                  include: [Author]
              })
            })
            .then(data2 => {
                res.render('user/returnBook', { datas, data2, alert: req.query.alert });
                // res.send(datas);
          })
          .catch(err => res.send(err));
        }
        static return(req, res){
            User_Book.update(
                {
                    rating: req.body.rating,
                    review: req.body.review,
                    return_date: new Date()
                },
                {
                    where: { id: req.params.id }
                }
            )
              .then(data => {
                  res.redirect(`/users/${req.params.username}`);
              })
              .catch(err => res.send(err));
    }
}
module.exports = Controller;