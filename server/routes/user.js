const express = require('express');
const bcrypt = require('bcrypt');
const _ = require('underscore')

const User = require('../models/user');

const app = express();

app.put('/user/:id', function (req, res) {
    let id = req.params.id;
    let body = _.pick(req.body, ['nombre', 'email', 'img', 'role', 'estado']);
    User.findByIdAndUpdate(id, body, {new: true, runValidators: true}, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            user: userDB
        });
    })
})
app.delete('/user/:id', function (req, res) {
    let id = req.params.id;

    User.findByIdAndUpdate(id, {state:false}, {new: true}, (err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            user: userDB
        });
    })

})

app.post('/user', (req, res) => {
    console.log("hola!", req.body.name);
    let body = req.body;

    let user = new User({
        name: body.name,
        email: body.email,
        password: bcrypt.hashSync(body.password, 10),
        role: body.role,
    });

    user.save((err, userDB) => {
        if (err) {
            return res.status(400).json({
                ok: false,
                err
            });
        }
        res.json({
            ok: true,
            user: userDB
        });
    });
});

app.get('/user', function (req, res) {

    let from = req.query.from || 0;
    from = Number(from);
    let per = req.query.per || 5;
    per = Number(per);

    User.find({state:true}, 'nombre email role') //el segundo argumento es de los campos que quiero retornar, vacio para traer todo
        .skip(from) //el salto de registros
        .limit(per) //el limite de registros
        .exec((err, users) => {
            if (err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
// dentro de la condición del count, se debe indicar el filtro ex:(google:true)
            User.count({state:true}, (err, count) => {
                res.json({
                    ok: true,
                    users,
                    count,
                });
            })


        })
})

app.get('/', function (req, res) {
    res.json('Hello World')
})

module.exports = app;