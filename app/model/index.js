const path = require("path");

// Load ORM
const Sequelize = require("sequelize");

const url = process.env.DATABASE_URL || "sqlite:db.sqlite";

const sequelize = new Sequelize(url);// Import the definition of the Escape Room Table from escapeRoom.js


// Session
sequelize.import(path.join(__dirname, "session"));

// Import the definition of the Virus Table from virus.js
const Virus = sequelize.import(path.join(__dirname, "virus"));

// Import the definition of the Trial Table from trial.js
const Trial = sequelize.import(path.join(__dirname, "trial"));


// Relation between models

Trial.belongsTo(Virus);
Virus.hasMany(Trial, {"onDelete": "CASCADE",
  "hooks": true});



module.exports = sequelize;