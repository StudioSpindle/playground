'use strict';

var express = require("express");
var router = express.Router();
var Question = require('./models').Question;

// when qID is present this callback function will get executed
router.param("qID", function(req, res, next, id) {
  Question.findById(id, function(err, doc){
    if (err) return next(err);
    if (!doc) {
      err = new Error(`Question not Found ${req.qID}`);
      err.status = 404;
      return next(err);
    }
    req.question = doc;
    return next();
  });
});

router.param("aID", function(req, res, next, id) {
  req.answer = req.question.answers.id(id);
  if (!req.answer) {
    err = new Error("Answer not found");
    err.status = 404;
    return next(err);
  }
  return next();
});

// GET /questions
// Route for questions collection
router.get("/", function(req, res) {

  // example of using a callback in the find method of Mongoose
  // Question.find({}, null, {sort: {createdAt: -1}}, function(err, questions){
  //   if (err) return next(err);
  //   res.json(questions);
  // });

  // example with Mongoose's query builder
  Question.find({})
      .sort({ createdAt : -1 })
      .exec( function(err, questions) {
        // .exec executes Mongoose query builder instead of a callback
        if (err) return next(err);
        res.json(questions);
      });
});

// POST /questions
// Route for creating questions
router.post("/", function(req, res) {
  var question = new Question(req.body);
  question.save(function(err, question){
    if(err) return next(err);
    res.status(201); // successfully created
    res.json(question);
  });
});

// GET /questions/:qID
// Route for questions collection
router.get("/:qID", function(req, res, next) {
  res.json(req.question);
});

// GET /questions/:qID/answers
// Route for questions collection
router.get("/:qID/answers", function(req, res, next) {
  res.json(req.question);
});

// POST /questions/:qID/answers
// Route for creating an answer
router.post("/:qID/answers", function(req, res, next) {
  req.question.answers.push(req.body);
  req.question.save(function(err, question) {
    if (err) return next(err);
    res.status(201); // successfully created
    res.json(question);
  });
});

// PUT /questions/:qID/answers/:aID
// Edit a specific answer
router.put("/:qID/answers/:aID", function(req, res) {
  req.answer.update(req.body, function(err, result){
    if(err) return next(err);
    res.json(result);
  });
});

// DELETE /questions/:qID/answers/:aID
// Edit a specific answer
router.delete("/:qID/answers/:aID", function(req, res) {
  req.answer.remove(function(err) {
    req.question.save(function(err, question){
      if(err) return next(err);
      res.json(question);
    });
  });
});

// POST /questions/:qID/answers/:aID/vote-up
// POST /questions/:qID/answers/:aID/vote-down
// Edit a specific answer
router.post("/:qID/answers/:aID/vote-:dir",
  function(req, res, next) {
    if (req.params.dir.search(/^(up|down)$/) === -1) {
      var err = new Error("Not Found");
      err.status = 404;
      next(err);
    } else {
      req.vote = req.params.dir;
      next();
    }
  },
  function(req, res, next) {
    req.answer.vote(req.vote, function(err, question) {
      if(err) return next(err);
      res.json(question);
    });
});

module.exports = router;
