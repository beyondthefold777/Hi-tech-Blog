// user.js
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');

module.exports = (sequelize, DataTypes) => {

  class User extends Model {
   
    static associate(models) {
      // A User can have many Blogs, with the foreign key 'userId'
      User.hasMany(models.Blog, { foreignKey: 'userId' });
    }

    // Method to validate the password using bcrypt
    validPassword(password) {
      // Compare the provided password with the hashed password stored in the database
      return bcrypt.compareSync(password, this.password);
    }
  }

  // Initialize the User model with its attributes
  User.init({
    username: DataTypes.STRING, // Username of the user
    email: DataTypes.STRING, // Email of the user
    password: DataTypes.STRING // Password of the user (hashed)
  }, {
    sequelize, 
    modelName: 'User', 
    hooks: {
      // Hook that runs before a new user is created
      beforeCreate: async (user) => {
        if (user.password) {
          // Generate a salt and hash the password before saving it to the database
          const salt = await bcrypt.genSalt(10);
          user.password = await bcrypt.hash(user.password, salt);
        }
      }
    }
  });

  // Return the User model
  return User;
};
