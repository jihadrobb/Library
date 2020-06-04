const {Book, Author, Publisher} = require('../models')

class Controller {
    static show(req, res) {
        Book.findAll({
            include: [Author, Publisher]
        })
        // .then(data => res.send(data)
        .then(data => res.render('books/listBook', {data}))
        .catch(err => res.send(err))
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
            res.render('books/formBook', {authorData, publisherData, bookData, alert})
            // res.send(authorData)
            // res.send(publisherData)
        })
        .catch(err => res.send(err))
    }
    
    static insert(req, res) {
        let {title, genre, released_year, AuthorId, PublisherId} = req.body
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
            res.render('books/formBook', {authorData, publisherData, bookData, alert})
            // res.send(authorData)
            // res.send(publisherData)
            // res.send(bookData)
        })
        .catch(err => res.send(err))
    }
    
    static update(req, res) {
        let idData = req.params.id
        let {title, genre, released_year, AuthorId, PublisherId} = req.body
        Book.create({
            title, genre, released_year, AuthorId, PublisherId
        }, {
            where: {id: idData}
        })
        .then(data => res.redirect('/books'))
        .catch(err => res.send(err))
        // .catch(err => res.redirect(`/books/edit/${idData}?alert=${err.errors[0].message}`))
    }
    
    static delete(req, res) {
        let idData = req.params.id
        Book.destroy({
            where: {id: idData}
        })
        .then(data => res.redirect('/books'))
        .catch(err => res.send(err))
    }
}

module.exports = Controller