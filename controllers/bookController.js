const {Book, Author, Publisher} = require('../models')
const {Op} = require('sequelize')

class Controller {
    static search(req, res) {
        let search = req.query.search
        Book.findAll({
            include: [Author, Publisher],
            where: {
                title: {
                    [Op.iLike]: `%${search}%`
                }
            }
        })
        .then(data => res.render('books/listBook', {data, username: req.session.username}))
        .catch(err => res.render('error', {err}))
    }

    static show(req, res) {
        if (req.query.search) {
            Controller.search(req, res)
        } else {
            Book.findAll({
                include: [Author, Publisher],
                order: [
                    ['id']
                ]
            })
            // .then(data => res.send(data))
            .then(data => res.render('books/listBook', {data, username: req.session.username}))
            .catch(err => res.render('error', {err}))
        }
    }

    static add(req, res) {
        let authorData, publisherData, bookData
        let alert = req.query.alert
        Author.findAll()
        .then(author => {
            authorData = author
            return Publisher.findAll()
        })
        .then(publisher => {
            publisherData = publisher
            res.render('books/formBook', {authorData, publisherData, bookData, alert, username: req.session.username})
            // res.send(authorData)
            // res.send(publisherData)
        })
        .catch(err => res.render('error', {err}))
    }
    
    static insert(req, res) {
        let {title, genre, released_year, AuthorId, PublisherId} = req.body
        if (genre) {
            genre = `{${genre}}`
        }
        Book.create({title, genre, released_year, AuthorId, PublisherId})
        .then(data => res.redirect('/books'))
        // .catch(err => res.send(err))
        .catch(err => res.redirect(`/books/add?alert=${err.errors[0].message}`))
    }
    
    static edit(req, res) {
        let authorData, publisherData, bookData
        let alert = req.query.alert
        let idData = req.params.id
        Book.findByPk(idData)
        .then(book => {
            bookData = book
            return Author.findAll()
        })
        .then(author => {
            authorData = author
            return Publisher.findAll()
        })
        .then(publisher => {
            publisherData = publisher
            res.render('books/formBook', {authorData, publisherData, bookData, alert, username: req.session.username})
            // res.send(authorData)
            // res.send(publisherData)
            // res.send(bookData)
        })
        .catch(err => res.render('error', {err}))
    }
    
    static update(req, res) {
        let idData = req.params.id
        let {title, genre, released_year, AuthorId, PublisherId} = req.body
        if (genre) {
            genre = `{${genre}}`
        }
        Book.update({
            title, genre, released_year, AuthorId, PublisherId
        }, {
            where: {id: idData}
        })
        .then(data => res.redirect('/books'))
        // .catch(err => res.send(err))
        .catch(err => res.redirect(`/books/edit/${idData}?alert=${err.errors[0].message}`))
    }
    
    static delete(req, res) {
        let idData = req.params.id
        Book.destroy({
            where: {id: idData}
        })
        .then(data => res.redirect('/books'))
        .catch(err => res.render('error', {err}))
    }
}

module.exports = Controller