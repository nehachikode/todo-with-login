const Notes = require('../models/notes');

module.exports = {

    list: (req, res, next) => {
        Notes
            .find()
            .select('_id title')
            .exec()
            .then(result => {
                let resp = {
                    msg: 'Notes!',
                    count: result.length,
                    products: result.map(res => {
                        return {
                            _id: res._id,
                            title: res.title
                        }
                    })
                }
                res.status(200).send(resp);
            })
            .catch(err => {
                console.log(err)
                res.status(500).json({
                    error: err
                })
            });
    },

    getDescription: (req, res, next) => {
        const id = req.params.id;

        Notes
            .findById(id)
            .exec()
            .then(result => {
                if (result) {
                    res.status(200).json({
                        msg: 'Note info!',
                        data: result
                    });
                } else {
                    res.status(200).json({
                        msg: 'No products found!',
                        data: {}
                    });
                }
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            });
    },

    add: (req, res, next) => {

        const note = new Notes({
            title: req.body.title,
            description: req.body.description
        });

        note
            .save()
            .then(result => {
                res.status(201).json({
                    msg: 'Note added!',
                    data: note
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            });
    },

    update: (req, res, next) => {
        const updateOps = {};

        if (req.body.title) {
            updateOps.title = req.body.title;
        }

        if (req.body.description) {
            updateOps.description = req.body.description;
        }

        Notes
            .update(
                { _id: req.params.id },
                { $set: updateOps }
            )
            .exec()
            .then(result => {
                res.status(200).json({
                    msg: 'Note updated!',
                    data: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            });
    },

    delete: (req, res, next) => {
        const id = req.params.id;

        Notes
            .deleteOne({
                _id: id
            })
            .exec()
            .then(result => {
                res.status(200).json({
                    msg: 'Note deleted!',
                    data: result
                });
            })
            .catch(err => {
                res.status(500).json({
                    error: err
                })
            });
    }

}