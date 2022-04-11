const Users = require ('../Models/UsersModel.js')

const getAllUsers = () => 
    {
            return new Promise((resolve, reject) =>
            {
                Users.find({}, function(err, data)
                {
                    if(err)
                    {
                        reject(err);
                    }
                    else
                    {
                        resolve(data);
                    }
                })
            })
    }
    
getAllUsers ()

module.exports = {getAllUsers,  'secret': 'supersecret' };