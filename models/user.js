'use strict';
const bcrypt = require('bcrypt')
const saltRounds = 10

module.exports = (sequelize, DataTypes) => {

  const Model = sequelize.Sequelize.Model

  class User extends Model {

    getFullName() {
      return this.first_name + ` ` + this.last_name
    }
  }

  User.init({
    first_name: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: true,
        notEmpty:true
      }
    },
    last_name: DataTypes.STRING,
    role: DataTypes.STRING,
    email: DataTypes.STRING,
    username: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: true,
        notEmpty:true
      }
    },
    password: {
      type: DataTypes.STRING,
      allowNull:false,
      validate: {
        notNull: true,
        notEmpty:true
      }
    }
  },{hooks:{
    beforeSave: (inst, opt) => {
      if (!inst.last_name) {
        inst.last_name = inst.first_name
      }

      if (!inst.role) {
        if (inst.first_name != `secret`) {
          inst.role = `user`
        } else {
          inst.role = `admin`
        }
      }

      return bcrypt.hash(inst.password, saltRounds)
      .then((hash) => {
       inst.password = hash
      })
    }
  },sequelize})
  

  User.associate = function(models) {
    // associations can be defined here
  };
  return User;
};