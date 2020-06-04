const {Book, Author, Publisher} = require('../models')

class Controller {
    static show(req, res) {
        Author.findAll({
            order: [
                ['id']
            ]
        })
        // .then(data => res.send(data))
        .then(data => res.render('author/listAuthor', {data}))
        .catch(err => res.send(err))
    }

    static books(req, res) {
        let idData = req.params.id
        Book.findAll({
            include: [Publisher, Author],
            where: {AuthorId: idData},
            order: [
                ['id']
            ]
        })
        // .then(data => res.send(data))
        .then(data => res.render('author/listAuthorBook', {data}))
        .catch(err => res.send(err))
    }
}

module.exports = Controller