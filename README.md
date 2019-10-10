# Task-Manger-React-Hooks
Task manger to create edit delete task using express.js and mongodb as server and react in the client side


##Index

+ [Demo](#demo)
+ [Features](#features)
+ [Installation](#installation)

## Demo<a name="demo"></a>
Check [Demo](https://immense-coast-59384.herokuapp.com/)


## Features<a name="features"></a>
+ Uses Express as the application Framework.
+ Manages jwt Token [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package.
+ Authenticates via username and password [jsonwebtoken](https://github.com/auth0/node-jsonwebtoken) package..
+ Passwords are hashed using [bcryptjs]https://github.com/dcodeIO/bcrypt.js package.
+ Uses [MongoDB](https://github.com/mongodb/mongo), [Mongoose](https://github.com/Automattic/mongoose) and [MongoLab(mLab)](https://mlab.com/) for storing and querying data.
+ upload Avatar using [multer](https://github.com/expressjs/multer)
+ send email using sendgrid services and its [sendgrid](https://github.com/sendgrid/sendgrid-nodejs).
+ using react in the client side


## Installation<a name="installation"></a>
### Running Locally
Make sure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) installed.

1. Clone or Download the repository

	```
	$ git git@github.com:seif1000/Task-Manger-React-Hooks.git
	$ cd Task-Manger-React-Hooks
	```
2. Install Dependencies

	```
	$ npm install 
  
	```
 3. install client side Dependecies
 	```
	$ npm client-install
  
	```
 

4. Start the application

	```
	$ npm run dev
	```
Your app should now be running on [localhost:3000](http://localhost:3000/).
