const { Schema, model } = require('mongoose');
const moment = require('moment');

const UserSchema = new Schema(
    {
      username: {
        type: String,
        unique: true,
        required: 'Username is required',
        trim: true
      },
      email: {
        type: String,
        required: 'Email is required',
        unique: true,
         // use REGEX to validate email
         match: [/.+@.+\..+/]
      },
      thoughts: [
        {
          type: Schema.Types.ObjectId,
          ref: 'Thought'
        }
      ],
      friends: [
        {
          type: Schema.Types.ObjectId,
          ref: 'User'
        }
      ]
    },
    {
      toJSON: {
        virtual: true,
        getters: true
      },
      id: false
    }
  );


const User = model('User', UserSchema);

UserSchema.virtual('friendCount').get(function () {
  return this.friends.length
});

module.exports = User;