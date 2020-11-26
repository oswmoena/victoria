const express = require('express');

const Team = require('../models/team');

const app = express();

app.post('/team',(req, res) => {
    let body = req.body;

    let team = new Team({
        name: body.name,
        goalsFor: body.goalsFor,
        goalsAgainst: body.goalsAgainst,
        img: body.img,
        points: body.points,
    });

    team.save((err, teamDB) => {
       if (err){
           return res.status(400).json({
               ok: false,
               err
           });
       }
       res.json({
           ok:true,
           user: teamDB,
       })
    });

    }
);

app.get('/teams', (req, res)=> {
    let from = req.query.from || 0;
    from = Number(from);
    let per = req.query.per || 5;
    per = Number(per);

    Team.find({state:true}, 'name goalsFor goalsAgainst points img')
        .skip(from)
        .limit(per)
        .sort('-points')
        .exec((err,teams) => {
            if(err) {
                return res.status(400).json({
                    ok: false,
                    err
                });
            }
            Team.count({state:true}, (err, count)=> {
                res.json({
                    ok: true,
                    teams,
                    count,
                })
            })
        })

});


module.exports = app;