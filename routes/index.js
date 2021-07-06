var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/xerox');
var collection = db.get('data');

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: 'Express'
  });
});

router.get('/dashboard', function (req, res, next) {
  res.render('dashboard');
});
// =====================================================registeration deatils inserting ================================================

router.post("/register", function (req, res) {
  collection.findOne({
    "Email": req.body.Email
  }, function (err, docs1) {
    if (err || (docs1 == null)) {
      req.body.Role = "user";
      collection.insert(req.body, function (error, docs) {
        if (error) {
          res.sendStatus(500)
        } else {
          res.sendStatus(200)
        }
      })
    } else {
      res.sendStatus(500)
    }
  })
})

// =====================================================================================================================================
//=============================================================login details============================================================

router.post('/login', function (req, res) {
  collection.findOne({
    "Email": req.body.Email,
    "Password": req.body.Password
  }, function (error, docs) {
    if (error || (docs == null)) {
      res.sendStatus(500)
    } else {
      res.sendStatus(200)
    }
  })
})

// =====================================================================================================================================



module.exports = router;