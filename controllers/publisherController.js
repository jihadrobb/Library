const {Book, Author, Publisher} = require('../models')

class Controller {
    static show(req, res) {
        Publisher.findAll({
            order: [
                ['id']
            ]
        })
        // .then(data => res.send(data))
        .then(data => res.render('publisher/listPublisher', {data, username: req.session.username}))
        .catch(err => res.send(err))
    }

    static books(req, res) {
        let idData = req.params.id
        Book.findAll({
            include: [Publisher, Author],
            where: {PublisherId: idData},
            order: [
                ['id']
            ]
        })
        // .then(data => res.send(data))
        .then(data => res.render('publisher/listPublisherBook', {data, username: req.session.username}))
        .catch(err => res.send(err))
    }
}

module.exports = Controller