'use strict';

var mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/sandbox", {useNewUrlParser: true});

var db = mongoose.connection;

db.on("error", function(err) {
   console.error(`connection error: ${err}`)
});

db.once("open", function() {
  console.log("db connection  succesful");
  // All database communication goes  here

  var Schema = mongoose.Schema;
  var AnimalSchema = new Schema({
    type: { type: String, default: "Goldfish" },
    color: { type: String, default: "golden" },
    size: String,
    mass: { type: Number, default: 0.007 },
    name: { type: String, default: "Angela" }
  });

  AnimalSchema.pre("save", function(next){
    if(this.mass >= 100) {
      this.size = "big";
    } else if (this.mass >= 5 && this.mass < 100) {
      this.size = "medium";
    } else {
      this.size = "small";
    }
    next();
  });

  // Example of static method
  AnimalSchema.statics.findSize = function(size, callback) {
    // this == Animal
    return this.find({size: size}, callback);
  };

  // Example of instance method
  AnimalSchema.methods.findSameColor = function(callback) {
    // this == document
    return this.model("Animal").find({color: this.color}, callback);
  };

  var Animal = mongoose.model("Animal", AnimalSchema);

  var elephant = new Animal({
    type: "elephant",
    color: "grey",
    mass: 6000,
    name: "Lawrence"
  });

  var animal = new Animal({}); // defaults to Goldfish

  var whale = new Animal({
    type: "whale",
    mass: 190500,
    name: "moby"
  });

  var animalData = [
    {
      type: "mouse",
      color: "grey",
      mass: 0.035,
      name: "Marvin"
    },{
      type: "nutria",
      color: "brown",
      mass: 6.35,
      name: "Gretchen"
    },{
      type: "wolf",
      color: "grey",
      mass: 45,
      name: "Iris"
    },
    elephant,
    animal,
    whale
  ];

  // remove all documents prior to saving new ones
  Animal.deleteMany({}, function(err){
    if (err) console.error(`Save failed ${err}`);

    // save documents in database
    Animal.create(animalData, function(err, animals) {
      // log to console to test
      Animal.findOne({type: "elephant"}, function(err, animals) {
        if (err) console.error(`Save failed ${err}`);
        elephant.findSameColor(function(err, animals){
          if (err) console.error(`Save failed ${err}`);
          animals.forEach(function(animal){
            console.log(`${animal.name} the ${animal.color} ${animal.type} is a ${animal.size} sized animal.`);
          });
          db.close(function() {
            console.log("db connection closed");
          });
        });
      });
    });

  });
});
