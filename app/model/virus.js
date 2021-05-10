const {Model} = require('sequelize');

// Definition of the TriVirusal model:

module.exports = (sequelize, DataTypes) => {

    class Virus extends Model {}

    Virus.init({
      "genus": {
        "type": DataTypes.STRING,
      },
      "species": {
        "type": DataTypes.STRING,
      },
      "name": {
        "type": DataTypes.STRING,
      },
      "abbreviation": {
        "type": DataTypes.STRING,
      },
      "designation": {
        "type": DataTypes.STRING,
      },
    }, {
      "tableName": "virus",
      "freezeTableName": true,
      sequelize
    });

    return Virus;
};