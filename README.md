# auth-server
Node Js Web API with auth using JWT and passport

This project is part of the last stuff I learned in JS.

To use it you need to :
1) Run mongod in the background (localhost, 27017)
2) Create a DB named UserDB
3) The-Server/Models/UserBL is where all the Crud function are
4) The Login / Register strategy are inside the route located at ./Routes/Usersroutes
      It use Config/Passport that use lib/utils to generate JWT and Crypto to hash and salt the password.
      
Client Side is coming soon
  
