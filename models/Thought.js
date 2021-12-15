const { Schema, model, Types } = require('mongoose');
const moment = require('moment');

//Reactions schema
const ReactionSchema = new Schema(
    {
      reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
      },
      reactionBody: {
        type: String,
        required: true,
        maxlength: [280, "Thought must be between 1 and 280 characters."]
      },
      username: {
        type: String,
        required: "Username required."
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      }
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      }
    }
  );

  //Thoughts schema 
const ThoughtSchema = new Schema(
    {
      thoughtText: {
        type: String,
        required: true,
        minlength: 1,
        maxlength: [280, "Thought must be between 1 and 280 characters."]
      },
      createdAt: {
        type: Date,
        default: Date.now,
        get: (createdAtVal) => moment(createdAtVal).format('MMM DD, YYYY [at] hh:mm a')
      },
     username: {
       type: String,
       required: 'Username is required'
     },
     reactions: [ReactionSchema]
    },
    {
      toJSON: {
        virtuals: true,
        getters: true
      },
      id: false
    }
  );
 
//get count of reactions
ThoughtSchema.virtual('reactionsCount').get(function() {
  return this.reactions.length;
});


const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;