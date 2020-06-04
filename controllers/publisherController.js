const {Book, Author, Publisher} = require('../models')

class Controller {
    static show(req, res) {
        Publisher.findAll()
        // .then(data => res.send(data))
        .then(data => res.render('publisher/listPublisher', {data}))
        .catch(err => res.send(err))
    }

    static books(req, res) {
        let idData = req.params.id
        Book.findAll({
            include: [Publisher, Author],
            where: {PublisherId: idData}
        })
        // .then(data => res.send(data))
        .then(data => res.render('publisher/listPublisherBook', {data}))
        .catch(err => res.send(err))
    }
}

module.exports = Controller