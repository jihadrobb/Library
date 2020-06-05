const { User, Book, User_Book, Author, Admin } = require('../models');
const bcrypt = require('bcrypt');
const isAdmin = require('../helpers/isAdmin');
class Controller {
    static add(req, res){
        res.render('user/register', {alert: req.query.alert, username: req.session.username});
    }
    static insert(req, res){
        User.findOne({ where: { username: req.body.username }})
          .then(data => {
              if(data){
                  res.redirect('/users/register?alert=Username is taken');
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
        res.render('user/login', {alert: req.query.alert, username: req.session.username});
    }
    static login(req, res){
        User.findOne({ where: { username: req.body.username }})
          .then(data => {
            if(!data){
                res.redirect('/users/login?alert=Wrong username!')
            } else {
                if(bcrypt.compareSync(req.body.password, data.password)){
                    req.session.username = req.body.username;
                    if(isAdmin(data)) req.session.admin = true;
                    res.redirect('/');
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
        let data_user;
        User.findOne({
            where: {username: req.params.username}
        })
          .then(data => {
              data_user = data;
              return User_Book.findAll({
                  where: { UserId: data.id},
                  include: [Book],
                  order: [
                      ['id']
                  ]
              });
          })
          .then(data => {
                // res.send(data[0].Book);
                res.render('user/history', { data, data_user, username: req.params.username, isAdmin });
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
            res.render('user/returnBook', { datas, data2, alert: req.query.alert, username: req.session.username });
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