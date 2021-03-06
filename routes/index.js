var express = require('express');
var router = express.Router();
var monk = require('monk');
var db = monk('localhost:27017/xerox');
var collection = db.get('login_credentials');
var collection1 = db.get('employee_info');
var collection2 = db.get('Complaints');


/* GET login page. */
router.get('/', function (req, res, next) {
  res.render('login', {
    title: 'Express'
  });
});

/* GET dashboard page. */
router.get('/dashboard', function (req, res, next) {
  if (req.session && req.session.user) {
    res.locals.user = req.session.user
    res.render('dashboard');
  } else {
    req.session.reset();
    res.redirect("/")
  }
});

/* GET statistics page. */
router.get('/dataentry', function (req, res, next) {
  if (req.session && req.session.user) {
    console.log(req.session.user)
    res.render('dataentry');
  } else {
    req.session.reset();
    res.redirect("/");
  }
});

/* GET tablelist page. */
router.get('/table', function (req, res, next) {
  if (req.session && req.session.user) {
    console.log(req.session.user)
    res.render('table');
  } else {
    req.session.reset();
    res.redirect("/");
  }
});

/* complaint page*/
router.get('/complaints', function (req, res, next) {
  if (req.session && req.session.user) {
    res.render("complaints");
  } else {
    req.session.reset();
    res.redirect("/");
  }
})

/*contact page*/
router.get('/contact', function (req, res, next) {
  if (req.session && req.session.user) {
    res.render("contact");
  } else {
    req.session.reset();
    res.redirect("/");
  }
})

// ================================================================ logout ============================================================
router.get('/logout', function (req, res, next) {
  req.session.reset();
  res.redirect("/");
})

// ================================================================ //logout ============================================================

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
      req.session.user = docs
      res.sendStatus(200)
    }
  })
})

// ========================================================== //login details==========================================================

// ========================================================== Insert Tablelist ========================================================
router.post("/inform", function (req, res) {
  if (req.session && req.session.user) {
    req.body.user = req.session.user.Username;
    req.body.Role = "user";
    collection1.insert(req.body, function (error, docs) {
      if (error) {
        res.sendStatus(500)
      } else {
        console.log(docs)
        res.sendStatus(200)
      }
    })
  }
})

// ========================================================== //Insert Tablelist ======================================================

// ========================================================== Fetch tablelist==========================================================
router.get('/tablelist', function (req, res) {
  if (req.session && req.session.user) {
    if (req.session.user.role = "user") {
      collection1.find({
        "user": req.session.user.Username
      }, function (error, docs) {
        if (error) {
          res.sendStatus(500)
        } else {
          res.send(docs)
        }
      })
    } else {
      collection1.find({}, function (error, docs) {
        if (error) {
          res.sendStatus(500)
        } else {
          console.log(docs)
          res.send(docs)
        }
      })
    }
  }
})

// ========================================================== //Fetch tablelist =====================================================

//=========================================================== //counting ============================================================
router.get('/countdata', function (req, res) {
  if (req.session && req.session.user) {
    collection1.find({
      "Single_Side_Pages": ""
    }, function (error, docs) {
      if (error) {
        res.sendStatus(500)
      } else {
        // d.push(docs)
        console.log(docs)
        res.send(docs)
      }
    })
  }
})

//=========================================================== //counting ============================================================

//=========================================================== complaint ============================================================

router.post("/issue", function (req, res) {
  // if (req.session && req.session.user) {
    // req.body.user = req.session.user.Username;
    
    collection2.insert(req.body, function (error, docs) {
      if (error) {
        res.sendStatus(500)
      } else {
        console.log(docs)
        res.sendStatus(200)
      }
    })
  // }
})

module.exports = router;