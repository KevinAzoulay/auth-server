const User = require("../Models/UsersModel.js");

const getAllUsers = () => {
  return new Promise((resolve, reject) => {
    User.find({}, function (err, data) {
      if (err) {
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

const getUserbyID = (id) => 
{
    return new Promise((resolve,reject) => {
        User.findById(id)
        .then(data => resolve(data))
        .catch(err => { reject(err)})
    })
}

const UpdateUser = (id,userObj) => 
{
    return new Promise((resolve,reject) => {
        User.findByIdAndUpdate(id, userObj, {new: true}, (err) => 
        {
            if(err) { reject(err)}
            else { resolve('updated')}
        })
 
       
    })
}
const addUser = (Userobj) => {
  return new Promise((resolve, reject) => {
    let NewUser = new User({
      Username: Userobj.Username,
      Email: Userobj.Email,
      Adress: Userobj.Adress,
      Street: Userobj.Street,
      Zipcode: Userobj.Zipcode,
      Task: Userobj.Task,
      Posts: Userobj.Posts,
      hash: Userobj.hash,
      salt: Userobj.salt,
    });

    NewUser.save((err) => {
      if (err) {
        reject(err);
      } else {
        resolve("New User Added");
      }
    });
  });
};

const deleteUser = (id) => {
  return new Promise((resolve, reject) => {
    User.findByIdAndDelete(id, function (err) {
      if (err) {
        reject(err);
      } else {
        resolve("User is deleted");
      }
    });
  });
};

module.exports = { getAllUsers, getUserbyID, UpdateUser, addUser, deleteUser };
