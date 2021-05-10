const {Model} = require('sequelize');

// Definition of the Trial model:

module.exports = (sequelize, DataTypes) => {

    class Trial extends Model {}

    Trial.init({
      /**
       * FAILED || SUCCESS
       */
      "status": {
        "type": DataTypes.STRING,
      },
      "name": {
        "type": DataTypes.STRING,
      }
    }, {
      sequelize
    });

    return Trial;
};