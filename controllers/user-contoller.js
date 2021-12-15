const { User } = require('../models');
const { db } = require('../models/User');

const userController = {
    //GET all users

    getAllUser (req, res) {
        User.find({})
        .select('-__v')
        .then(dbUserData => res.json(dbUserData))
        .catch(err =>{
            console.log(err);
            res.sendStatus(400);
        });
    },

  
    //GET one user by id
    getUserById({ params }, res) {
        User.findOne({ _id: params.id })
          .populate({
            path: 'friends',
            select: '-__v'
          })
          .populate({
            path: 'thoughts',
            select: '-__v'
          })
          .select('-__v')
          .then(dbUserData => res.json(dbUserData))
          .catch(err => {
            console.log(err);
            res.sendStatus(400);
          });
      },

    //CREATE User
    createUser ({ body }, res) {
      User.create(body)
      .then(dbUserData => res.json(dbUserData))
      .catch(err => res.status(400).json(err));
    },

    // UPDATE User by id
    updateUser({ params, body }, res) {
      User.findOneAndUpdate({ _id: params.id }, body, { new: true })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User not found with this id.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
    },

    //DELET user
    deleteUser({ params }, res) {
      User.findOneAndDelete({ _id: params.id })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User not found with this id.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
    },

    //ADD friend 
    addFriend({ params }, res) {
      User.findOne({ _id: params.userId }).then(user => {
        if (user.friends.includes(params.friendId)) {
          res.status(500).send('Friends alreay exist.')
        }
      });
      
      User.findOneAndUpdate({ _id: params.userId }, {
        $push: {
          friends: params.friendId
        }
      })
      .then(dbUserData => {
        if (!dbUserData) {
          res.status(404).json({ message: 'User not found with this id.' });
          return;
        }
        res.json(dbUserData);
      })
      .catch(err => res.status(400).json(err));
    },
  
    // DELETE friend
    deleteFriend({ params }, res) {
      User.findOneAndUpdate(
        { _id: params.userId},
        { $pull: { friends: params.friendId}},
        { new: true}
        )
        .then(dbUserData => {
          if (!dbUserData) {
            res.status(404).json({ message: 'User not found with this id.'});
            return;
          }
          res.json(dbUserData);
        })
        .catch(err => res.status(400).json(err));
      }
}
  
module.exports = userController;
  
  


