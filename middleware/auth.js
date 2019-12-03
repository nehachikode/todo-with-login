const jwt = require('jsonwebtoken');
const TOKEN_SECRET = process.env.TOKEN_SECRET || "sunshine!";
const User = require('../models/user');

module.exports = async function (req, res, next) {

    let token = req.headers['authorization'];

    if (!token) {
        // send 401 if a token is not provided
        return res.status(401).send({ message: 'Missing access token!', data: null, err: null });
    }

    let date = Math.round(new Date().getTime() / 1000);
    // decode token and attach userId to the request
    let data = jwt.decode(token, TOKEN_SECRET);

    try {
        if (data.exp > date) {
            User.findOne({
                where: {
                    email: {
                        $eq: data.sub
                    }
                }
            }).then(user => {
                if (user) {
                    req.email = {
                        email: user.email,
                    };

                    req.userId = user.id;
                    req.userName = user.name;
                    req.contact_no = user.contact_no;

                    next();
                } else {
                    //user not exist
                    res.status(401).send({ message: 'Invalid user!', data: null, err: null });
                }
            }).catch(err => {
                console.log('autherr', err)
                res.status(500).send({ message: 'Something went wrong!', data: null, err: err });
            });
        } else {
            res.status(401).send({ message: 'Token expired!', data: null, err: null });
        }
    } catch (error) {
        console.log('autherror', error)
        res.status(500).send({ message: 'Something went wrong!', data: null, err: error });
    }
};