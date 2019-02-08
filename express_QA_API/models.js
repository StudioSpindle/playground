'use strict';

var mongoose = require("mongoose");

var Schema = mongoose.Schema;

var sortAnswers = function(a, b) {
  //- negative number = a before b
  //0 no change
  //+ positive number = a after b

  // when the number of votes match (a.votes === b.votes)
  // then place the the most recent updated answers first
  if(a.votes === b.votes) {
    return b.votes - a.votes;
  }

  return b.votes - a.votes;
};

var AnswerSchema = new Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now },
  votes: {  type: Number, default: 0 }
});

var QuestionSchema = new Schema({
  text: String,
  createdAt: { type: Date, default: Date.now },
  answers: [AnswerSchema]
});

QuestionSchema.pre("save", function(next){
  this.answers.sort(sortAnswers);
  next();
});

// var Question = mongoose.model("Question", QuestionsSchema);
var Question = mongoose.model("Question", QuestionSchema);

module.exports.Question = Question;
