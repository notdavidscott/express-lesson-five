var express = require('express');
var router = express.Router();
const sqlite = require('sqlite3').verbose();
const models = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/artists', function(req, res, next) {
  models.artists.findAll({
//below is example of setting parameters on search
    // where: {
    //   [Op.and]: {
    //   ArtistId: {
    //     [Op.gt]: 55
    //   }, 
    //   Name: {
    //     [Op.like]: 'G%'
    //   }
    // }
  // }
  }).then(artistsFound => {
    res.render('artists', {
      artists: artistsFound
    }); 
  });
});

//you would use this below code if you wanted to data to be available in JSON format for a front end app
    // router.get('/artists', function(req, res, next) {
    //   models.artists.findAll({}).then(artistAsPlainObject => {
    //     const mappedArtists = artistAsPlainObject.map(artist => ({
    //       ArtistId: artist.ArtistId,
    //       Name: artist.Name
    //     }));
    //     res.send(JSON.stringify(mappedArtists));
    //   });
    // });



router.post('/artists', function(req, res) {
  models.artists
    .findOrCreate({
      where: {
        Name: req.body.name,
        DateFormed: req.body.dateFormed
      }
    }).spread(function(result, created) {
      if (created) {
        res.redirect('/artists');
      } else {
        res.send('This artist already exists!');
      }
    });
});


router.get('/specificArtist', function(req, res, next) {
  models.artists      
    .find({
      where: {
        ArtistId: 8
      }
    }).then(artist => {
      res.render('specificArtist', {
        artist: artist    
      
      });
    });
    
});

router.get('/artists/:id', function(req, res, next) {
  let artistId = parseInt(req.params.id);
  models.artists.find({
    where: {
      ArtistId: artistId
    }
  }).then(artist => {
    res.render('specificArtist', {
      artist: artist
    });
  });
});

module.exports = router;
